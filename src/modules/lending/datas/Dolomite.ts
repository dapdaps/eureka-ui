import axios from 'axios';
import Big from 'big.js';
import { Contract, ethers, utils } from 'ethers';
import { useEffect } from 'react';

import { post } from '@/utils/http';

const ERC20_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
];

const MARGIN_ABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint64',
            name: 'marginRatioMax',
            type: 'uint64'
          },
          {
            internalType: 'uint64',
            name: 'liquidationSpreadMax',
            type: 'uint64'
          },
          {
            internalType: 'uint64',
            name: 'earningsRateMax',
            type: 'uint64'
          },
          {
            internalType: 'uint64',
            name: 'marginPremiumMax',
            type: 'uint64'
          },
          {
            internalType: 'uint64',
            name: 'liquidationSpreadPremiumMax',
            type: 'uint64'
          },
          {
            internalType: 'uint96',
            name: 'interestRateMax',
            type: 'uint96'
          },
          {
            internalType: 'uint128',
            name: 'minBorrowedValueMax',
            type: 'uint128'
          }
        ],
        internalType: 'struct Storage.RiskLimits',
        name: 'riskLimits',
        type: 'tuple'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: 'marginRatio',
        type: 'tuple'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: 'liquidationSpread',
        type: 'tuple'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: 'earningsRate',
        type: 'tuple'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Monetary.Value',
        name: 'minBorrowedValue',
        type: 'tuple'
      },
      {
        internalType: 'uint256',
        name: 'accountMaxNumberOfMarketsWithBalances',
        type: 'uint256'
      },
      {
        internalType: 'contract IOracleSentinel',
        name: 'oracleSentinel',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'callbackGasLimit',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'trusted',
        type: 'bool'
      }
    ],
    name: 'LogOperatorSet',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    constant: true,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'number',
            type: 'uint256'
          }
        ],
        internalType: 'struct Account.Info',
        name: 'account',
        type: 'tuple'
      }
    ],
    name: 'getAccountBalances',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]'
      },
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]'
      },
      {
        components: [
          {
            internalType: 'bool',
            name: 'sign',
            type: 'bool'
          },
          {
            internalType: 'uint128',
            name: 'value',
            type: 'uint128'
          }
        ],
        internalType: 'struct Types.Par[]',
        name: '',
        type: 'tuple[]'
      },
      {
        components: [
          {
            internalType: 'bool',
            name: 'sign',
            type: 'bool'
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Types.Wei[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'number',
            type: 'uint256'
          }
        ],
        internalType: 'struct Account.Info',
        name: 'account',
        type: 'tuple'
      },
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256'
      }
    ],
    name: 'getAccountMarketWithBalanceAtIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'number',
            type: 'uint256'
          }
        ],
        internalType: 'struct Account.Info',
        name: 'account',
        type: 'tuple'
      }
    ],
    name: 'getAccountMarketsWithBalances',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getAccountMaxNumberOfMarketsWithBalances',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'number',
            type: 'uint256'
          }
        ],
        internalType: 'struct Account.Info',
        name: 'account',
        type: 'tuple'
      }
    ],
    name: 'getAccountNumberOfMarketsWithBalances',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'number',
            type: 'uint256'
          }
        ],
        internalType: 'struct Account.Info',
        name: 'account',
        type: 'tuple'
      }
    ],
    name: 'getAccountNumberOfMarketsWithDebt',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'number',
            type: 'uint256'
          }
        ],
        internalType: 'struct Account.Info',
        name: 'account',
        type: 'tuple'
      },
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getAccountPar',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'sign',
            type: 'bool'
          },
          {
            internalType: 'uint128',
            name: 'value',
            type: 'uint128'
          }
        ],
        internalType: 'struct Types.Par',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'number',
            type: 'uint256'
          }
        ],
        internalType: 'struct Account.Info',
        name: 'account',
        type: 'tuple'
      }
    ],
    name: 'getAccountRiskOverrideByAccount',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: 'marginRatioOverride',
        type: 'tuple'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: 'liquidationSpreadOverride',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: 'accountOwner',
        type: 'address'
      }
    ],
    name: 'getAccountRiskOverrideSetterByAccountOwner',
    outputs: [
      {
        internalType: 'contract IAccountRiskOverrideSetter',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'number',
            type: 'uint256'
          }
        ],
        internalType: 'struct Account.Info',
        name: 'account',
        type: 'tuple'
      }
    ],
    name: 'getAccountStatus',
    outputs: [
      {
        internalType: 'enum Account.Status',
        name: '',
        type: 'uint8'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'number',
            type: 'uint256'
          }
        ],
        internalType: 'struct Account.Info',
        name: 'account',
        type: 'tuple'
      }
    ],
    name: 'getAccountValues',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Monetary.Value',
        name: '',
        type: 'tuple'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Monetary.Value',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'number',
            type: 'uint256'
          }
        ],
        internalType: 'struct Account.Info',
        name: 'account',
        type: 'tuple'
      },
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getAccountWei',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'sign',
            type: 'bool'
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Types.Wei',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'number',
            type: 'uint256'
          }
        ],
        internalType: 'struct Account.Info',
        name: 'account',
        type: 'tuple'
      }
    ],
    name: 'getAdjustedAccountValues',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Monetary.Value',
        name: '',
        type: 'tuple'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Monetary.Value',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getCallbackGasLimit',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getDefaultAccountRiskOverrideSetter',
    outputs: [
      {
        internalType: 'contract IAccountRiskOverrideSetter',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getEarningsRate',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: 'autoTrader',
        type: 'address'
      }
    ],
    name: 'getIsAutoTraderSpecial',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getIsBorrowAllowed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address'
      }
    ],
    name: 'getIsGlobalOperator',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getIsLiquidationAllowed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address'
      }
    ],
    name: 'getIsLocalOperator',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getLiquidationSpread',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'number',
            type: 'uint256'
          }
        ],
        internalType: 'struct Account.Info',
        name: 'account',
        type: 'tuple'
      },
      {
        internalType: 'uint256',
        name: 'heldMarketId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'owedMarketId',
        type: 'uint256'
      }
    ],
    name: 'getLiquidationSpreadForAccountAndPair',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'heldMarketId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'owedMarketId',
        type: 'uint256'
      }
    ],
    name: 'getLiquidationSpreadForPair',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'number',
            type: 'uint256'
          }
        ],
        internalType: 'struct Account.Info',
        name: 'account',
        type: 'tuple'
      }
    ],
    name: 'getLiquidationSpreadOverrideByAccount',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getMarginRatio',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'number',
            type: 'uint256'
          }
        ],
        internalType: 'struct Account.Info',
        name: 'account',
        type: 'tuple'
      }
    ],
    name: 'getMarginRatioForAccount',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'number',
            type: 'uint256'
          }
        ],
        internalType: 'struct Account.Info',
        name: 'account',
        type: 'tuple'
      }
    ],
    name: 'getMarginRatioOverrideByAccount',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getMarket',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'token',
            type: 'address'
          },
          {
            internalType: 'bool',
            name: 'isClosing',
            type: 'bool'
          },
          {
            components: [
              {
                internalType: 'uint128',
                name: 'borrow',
                type: 'uint128'
              },
              {
                internalType: 'uint128',
                name: 'supply',
                type: 'uint128'
              }
            ],
            internalType: 'struct Types.TotalPar',
            name: 'totalPar',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'uint112',
                name: 'borrow',
                type: 'uint112'
              },
              {
                internalType: 'uint112',
                name: 'supply',
                type: 'uint112'
              },
              {
                internalType: 'uint32',
                name: 'lastUpdate',
                type: 'uint32'
              }
            ],
            internalType: 'struct Interest.Index',
            name: 'index',
            type: 'tuple'
          },
          {
            internalType: 'contract IPriceOracle',
            name: 'priceOracle',
            type: 'address'
          },
          {
            internalType: 'contract IInterestSetter',
            name: 'interestSetter',
            type: 'address'
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256'
              }
            ],
            internalType: 'struct Decimal.D256',
            name: 'marginPremium',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256'
              }
            ],
            internalType: 'struct Decimal.D256',
            name: 'liquidationSpreadPremium',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'bool',
                name: 'sign',
                type: 'bool'
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256'
              }
            ],
            internalType: 'struct Types.Wei',
            name: 'maxSupplyWei',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'bool',
                name: 'sign',
                type: 'bool'
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256'
              }
            ],
            internalType: 'struct Types.Wei',
            name: 'maxBorrowWei',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256'
              }
            ],
            internalType: 'struct Decimal.D256',
            name: 'earningsRateOverride',
            type: 'tuple'
          }
        ],
        internalType: 'struct Storage.Market',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getMarketBorrowInterestRateApr',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Interest.Rate',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getMarketBorrowInterestRatePerSecond',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Interest.Rate',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getMarketCachedIndex',
    outputs: [
      {
        components: [
          {
            internalType: 'uint112',
            name: 'borrow',
            type: 'uint112'
          },
          {
            internalType: 'uint112',
            name: 'supply',
            type: 'uint112'
          },
          {
            internalType: 'uint32',
            name: 'lastUpdate',
            type: 'uint32'
          }
        ],
        internalType: 'struct Interest.Index',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getMarketCurrentIndex',
    outputs: [
      {
        components: [
          {
            internalType: 'uint112',
            name: 'borrow',
            type: 'uint112'
          },
          {
            internalType: 'uint112',
            name: 'supply',
            type: 'uint112'
          },
          {
            internalType: 'uint32',
            name: 'lastUpdate',
            type: 'uint32'
          }
        ],
        internalType: 'struct Interest.Index',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getMarketEarningsRateOverride',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address'
      }
    ],
    name: 'getMarketIdByTokenAddress',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getMarketInterestRate',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Interest.Rate',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getMarketInterestSetter',
    outputs: [
      {
        internalType: 'contract IInterestSetter',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getMarketIsClosing',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getMarketLiquidationSpreadPremium',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getMarketMarginPremium',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getMarketMaxBorrowWei',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'sign',
            type: 'bool'
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Types.Wei',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getMarketMaxSupplyWei',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'sign',
            type: 'bool'
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Types.Wei',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getMarketMaxWei',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'sign',
            type: 'bool'
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Types.Wei',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getMarketPrice',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Monetary.Price',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getMarketPriceOracle',
    outputs: [
      {
        internalType: 'contract IPriceOracle',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getMarketSpreadPremium',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getMarketSupplyInterestRateApr',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Interest.Rate',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getMarketTokenAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getMarketTotalPar',
    outputs: [
      {
        components: [
          {
            internalType: 'uint128',
            name: 'borrow',
            type: 'uint128'
          },
          {
            internalType: 'uint128',
            name: 'supply',
            type: 'uint128'
          }
        ],
        internalType: 'struct Types.TotalPar',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getMarketTotalWei',
    outputs: [
      {
        components: [
          {
            internalType: 'uint128',
            name: 'borrow',
            type: 'uint128'
          },
          {
            internalType: 'uint128',
            name: 'supply',
            type: 'uint128'
          }
        ],
        internalType: 'struct Types.TotalWei',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getMarketWithInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'token',
            type: 'address'
          },
          {
            internalType: 'bool',
            name: 'isClosing',
            type: 'bool'
          },
          {
            components: [
              {
                internalType: 'uint128',
                name: 'borrow',
                type: 'uint128'
              },
              {
                internalType: 'uint128',
                name: 'supply',
                type: 'uint128'
              }
            ],
            internalType: 'struct Types.TotalPar',
            name: 'totalPar',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'uint112',
                name: 'borrow',
                type: 'uint112'
              },
              {
                internalType: 'uint112',
                name: 'supply',
                type: 'uint112'
              },
              {
                internalType: 'uint32',
                name: 'lastUpdate',
                type: 'uint32'
              }
            ],
            internalType: 'struct Interest.Index',
            name: 'index',
            type: 'tuple'
          },
          {
            internalType: 'contract IPriceOracle',
            name: 'priceOracle',
            type: 'address'
          },
          {
            internalType: 'contract IInterestSetter',
            name: 'interestSetter',
            type: 'address'
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256'
              }
            ],
            internalType: 'struct Decimal.D256',
            name: 'marginPremium',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256'
              }
            ],
            internalType: 'struct Decimal.D256',
            name: 'liquidationSpreadPremium',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'bool',
                name: 'sign',
                type: 'bool'
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256'
              }
            ],
            internalType: 'struct Types.Wei',
            name: 'maxSupplyWei',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'bool',
                name: 'sign',
                type: 'bool'
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256'
              }
            ],
            internalType: 'struct Types.Wei',
            name: 'maxBorrowWei',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256'
              }
            ],
            internalType: 'struct Decimal.D256',
            name: 'earningsRateOverride',
            type: 'tuple'
          }
        ],
        internalType: 'struct Storage.Market',
        name: '',
        type: 'tuple'
      },
      {
        components: [
          {
            internalType: 'uint112',
            name: 'borrow',
            type: 'uint112'
          },
          {
            internalType: 'uint112',
            name: 'supply',
            type: 'uint112'
          },
          {
            internalType: 'uint32',
            name: 'lastUpdate',
            type: 'uint32'
          }
        ],
        internalType: 'struct Interest.Index',
        name: '',
        type: 'tuple'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Monetary.Price',
        name: '',
        type: 'tuple'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Interest.Rate',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getMinBorrowedValue',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Monetary.Value',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      }
    ],
    name: 'getNumExcessTokens',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'sign',
            type: 'bool'
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Types.Wei',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getNumMarkets',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getOracleSentinel',
    outputs: [
      {
        internalType: 'contract IOracleSentinel',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getRiskLimits',
    outputs: [
      {
        components: [
          {
            internalType: 'uint64',
            name: 'marginRatioMax',
            type: 'uint64'
          },
          {
            internalType: 'uint64',
            name: 'liquidationSpreadMax',
            type: 'uint64'
          },
          {
            internalType: 'uint64',
            name: 'earningsRateMax',
            type: 'uint64'
          },
          {
            internalType: 'uint64',
            name: 'marginPremiumMax',
            type: 'uint64'
          },
          {
            internalType: 'uint64',
            name: 'liquidationSpreadPremiumMax',
            type: 'uint64'
          },
          {
            internalType: 'uint96',
            name: 'interestRateMax',
            type: 'uint96'
          },
          {
            internalType: 'uint128',
            name: 'minBorrowedValueMax',
            type: 'uint128'
          }
        ],
        internalType: 'struct Storage.RiskLimits',
        name: '',
        type: 'tuple'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'isOwner',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'number',
            type: 'uint256'
          }
        ],
        internalType: 'struct Account.Info[]',
        name: 'accounts',
        type: 'tuple[]'
      },
      {
        components: [
          {
            internalType: 'enum Actions.ActionType',
            name: 'actionType',
            type: 'uint8'
          },
          {
            internalType: 'uint256',
            name: 'accountId',
            type: 'uint256'
          },
          {
            components: [
              {
                internalType: 'bool',
                name: 'sign',
                type: 'bool'
              },
              {
                internalType: 'enum Types.AssetDenomination',
                name: 'denomination',
                type: 'uint8'
              },
              {
                internalType: 'enum Types.AssetReference',
                name: 'ref',
                type: 'uint8'
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256'
              }
            ],
            internalType: 'struct Types.AssetAmount',
            name: 'amount',
            type: 'tuple'
          },
          {
            internalType: 'uint256',
            name: 'primaryMarketId',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'secondaryMarketId',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'otherAddress',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'otherAccountId',
            type: 'uint256'
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes'
          }
        ],
        internalType: 'struct Actions.ActionArgs[]',
        name: 'actions',
        type: 'tuple[]'
      }
    ],
    name: 'operate',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address'
      },
      {
        internalType: 'contract IPriceOracle',
        name: 'priceOracle',
        type: 'address'
      },
      {
        internalType: 'contract IInterestSetter',
        name: 'interestSetter',
        type: 'address'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: 'marginPremium',
        type: 'tuple'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: 'spreadPremium',
        type: 'tuple'
      },
      {
        internalType: 'uint256',
        name: 'maxSupplyWei',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'maxBorrowWei',
        type: 'uint256'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: 'earningsRateOverride',
        type: 'tuple'
      },
      {
        internalType: 'bool',
        name: 'isClosing',
        type: 'bool'
      }
    ],
    name: 'ownerAddMarket',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: 'accountMaxNumberOfMarketsWithBalances',
        type: 'uint256'
      }
    ],
    name: 'ownerSetAccountMaxNumberOfMarketsWithBalances',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'accountOwner',
        type: 'address'
      },
      {
        internalType: 'contract IAccountRiskOverrideSetter',
        name: 'accountRiskOverrideSetter',
        type: 'address'
      }
    ],
    name: 'ownerSetAccountRiskOverride',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'autoTrader',
        type: 'address'
      },
      {
        internalType: 'bool',
        name: 'special',
        type: 'bool'
      }
    ],
    name: 'ownerSetAutoTraderSpecial',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: 'callbackGasLimit',
        type: 'uint256'
      }
    ],
    name: 'ownerSetCallbackGasLimit',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'contract IAccountRiskOverrideSetter',
        name: 'accountRiskOverrideSetter',
        type: 'address'
      }
    ],
    name: 'ownerSetDefaultAccountRiskOverride',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: 'earningsRate',
        type: 'tuple'
      }
    ],
    name: 'ownerSetEarningsRate',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: 'earningsRateOverride',
        type: 'tuple'
      }
    ],
    name: 'ownerSetEarningsRateOverride',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool'
      }
    ],
    name: 'ownerSetGlobalOperator',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      },
      {
        internalType: 'contract IInterestSetter',
        name: 'interestSetter',
        type: 'address'
      }
    ],
    name: 'ownerSetInterestSetter',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: 'isClosing',
        type: 'bool'
      }
    ],
    name: 'ownerSetIsClosing',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: 'spread',
        type: 'tuple'
      }
    ],
    name: 'ownerSetLiquidationSpread',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: 'liquidationSpreadPremium',
        type: 'tuple'
      }
    ],
    name: 'ownerSetLiquidationSpreadPremium',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: 'marginPremium',
        type: 'tuple'
      }
    ],
    name: 'ownerSetMarginPremium',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Decimal.D256',
        name: 'ratio',
        type: 'tuple'
      }
    ],
    name: 'ownerSetMarginRatio',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'maxBorrowWei',
        type: 'uint256'
      }
    ],
    name: 'ownerSetMaxBorrowWei',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'maxSupplyWei',
        type: 'uint256'
      }
    ],
    name: 'ownerSetMaxSupplyWei',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256'
          }
        ],
        internalType: 'struct Monetary.Value',
        name: 'minBorrowedValue',
        type: 'tuple'
      }
    ],
    name: 'ownerSetMinBorrowedValue',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'contract IOracleSentinel',
        name: 'oracleSentinel',
        type: 'address'
      }
    ],
    name: 'ownerSetOracleSentinel',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      },
      {
        internalType: 'contract IPriceOracle',
        name: 'priceOracle',
        type: 'address'
      }
    ],
    name: 'ownerSetPriceOracle',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: 'marketId',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }
    ],
    name: 'ownerWithdrawExcessTokens',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      }
    ],
    name: 'ownerWithdrawUnsupportedTokens',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address'
          },
          {
            internalType: 'bool',
            name: 'trusted',
            type: 'bool'
          }
        ],
        internalType: 'struct Types.OperatorArg[]',
        name: 'args',
        type: 'tuple[]'
      }
    ],
    name: 'setOperators',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

const apr2ApyDaily = (apr: string) => {
  const daysInYear = 365;
  const decimalAPR = new Big(apr);
  const apy = decimalAPR.div(daysInYear).plus(1).pow(daysInYear).minus(1);
  return apy.times(100).toFixed(2) + '%';
};

const minimumCollateralizationToLTV = (minCollateralization: string) => {
  return Big(1).div(Big(minCollateralization).plus(1)).toFixed(6);
};

const DolomiteData = (props: any) => {
  const {
    multicallAddress,
    marginAddress,
    graphApi,
    blockNumberApiQuery,
    positionListApiQuery,
    liquidationRatio,
    interestRatesApi,
    marketInfoApiQuery,
    allTokensApiQuery,
    allTotalParsApiQuery,
    pricesApi,
    account,
    update,
    name,
    onLoad,
    markets,
    multicall,
    provider,
    wrappedToken = {}
  } = props;

  useEffect(() => {
    if (!marginAddress || !update || !account) return;

    const _cTokensData: any = {};
    let _positionList: any = [];
    let count = 0;
    let oTokensLength = Object.values(markets).length;

    const formatedData = (key: any) => {
      console.log(`${name}-${key}`, count);
      if (count < 1) return;
      count = 0;

      let userTotalBorrowUsd = Big(0);
      let userTotalCollateralUsd = Big(0);
      let userTotalSupplyUsd = Big(0);

      const tokenList: any = Object.values(_cTokensData);
      tokenList.forEach((token: any) => {
        userTotalSupplyUsd = userTotalSupplyUsd.plus(token.yourLendsUSD);
        userTotalBorrowUsd = userTotalBorrowUsd.plus(token.currentTokenBorrowUsd);
        userTotalCollateralUsd = userTotalCollateralUsd.plus(token.currentTokenCollateralUsd);

        // borrowToken
        for (const _token of tokenList) {
          if (token.address === _token.address) {
            continue;
          }
          token.borrowToken.push(_token);
          token.borrowTokenPrice.push(_token.underlyingPrice);
        }
      });
      const nativeToken = _cTokensData['native'];
      _positionList.forEach((position: any) => {
        const baseLTV = Big(1).minus(Big(liquidationRatio).minus(1)).toString();
        let LTV = baseLTV;
        let totalBorrowedUsd = Big(0);
        let totalCollateralUsd = Big(0);
        // Tokens that have been borrowed from the current position cannot be added as collateral again
        const addCollateralTokens: any = [];
        // Tokens that have been added as collateral in the current position cannot be borrowed again
        const borrowTokens: any = [];
        // Only can remove tokens that have already been added as collateral
        const removeCollateralTokens: any = [];
        // Only can repay tokens that have already been borrowed
        const repayTokens: any = [];

        const { amounts = [] } = position;
        amounts.forEach((_amount: any) => {
          const { collateral, borrow, token } = _amount;
          const currentToken = _cTokensData[token.id.toLowerCase()];
          LTV = currentToken.maxLTV;
          _amount.collateralValue = Big(collateral || 0).toFixed(currentToken.decimals);
          _amount.collateralUsd = Big(collateral || 0)
            .times(currentToken.price)
            .toFixed(2);
          _amount.borrowValue = Big(borrow || 0).toFixed(currentToken.decimals, Big.roundUp);
          _amount.borrowUsd = Big(borrow || 0)
            .times(currentToken.price)
            .toFixed(2);

          totalBorrowedUsd = totalBorrowedUsd.plus(Big(borrow || 0).times(currentToken.price));
          totalCollateralUsd = totalCollateralUsd.plus(Big(collateral || 0).times(currentToken.price));

          if (collateral) {
            const removeCollateralToken = {
              ...currentToken,
              currentPositionCollateral: collateral,
              currentPositionCollateralValue: _amount.collateralValue,
              currentPositionCollateralUsd: _amount.collateralUsd
            };
            if (currentToken.address.toLowerCase() === wrappedToken?.address?.toLowerCase()) {
              if (nativeToken) {
                removeCollateralToken.symbol = nativeToken.symbol;
                removeCollateralToken.icon = nativeToken.icon;
                removeCollateralToken.name = nativeToken.name;
              }
            }
            removeCollateralTokens.push(removeCollateralToken);
          }
          if (borrow) {
            let _repayBalance = _amount.borrowValue;
            if (Big(borrow).gte(currentToken.balance)) {
              _repayBalance = currentToken.balance;
            }
            const repayToken = {
              ...currentToken,
              balance: _repayBalance,
              currentPositionBorrow: borrow,
              currentPositionBorrowValue: _amount.borrowValue,
              currentPositionBorrowUsd: _amount.borrowUsd
            };
            if (currentToken.address.toLowerCase() === wrappedToken?.address?.toLowerCase()) {
              if (nativeToken) {
                repayToken.symbol = nativeToken.symbol;
                repayToken.icon = nativeToken.icon;
                repayToken.name = nativeToken.name;
              }
            }
            repayTokens.push(repayToken);
          }
        });

        const latestHealth = 1.001;

        removeCollateralTokens.forEach((token: any) => {
          const removeValue = totalCollateralUsd
            .minus(totalBorrowedUsd.times(liquidationRatio).times(latestHealth))
            .div(token.price);

          if (removeValue.gte(token.currentPositionCollateral)) {
            token.balance = token.currentPositionCollateral.toFixed(token.decimals);
            return;
          }
          token.balance = removeValue.toFixed(token.decimals, Big.roundDown);
        });

        tokenList.forEach((token: any) => {
          if (token.isNative) {
            return;
          }
          if (!removeCollateralTokens.some((it: any) => it.address.toLowerCase() === token.address.toLowerCase())) {
            const borrowValue = totalCollateralUsd
              .div(latestHealth)
              .div(liquidationRatio)
              .minus(totalBorrowedUsd)
              .div(token.price);

            const borrowToken = {
              ...token,
              balance: borrowValue.toFixed(token.decimals, Big.roundDown)
            };
            if (token.address.toLowerCase() === wrappedToken?.address?.toLowerCase()) {
              if (nativeToken) {
                borrowToken.symbol = nativeToken.symbol;
                borrowToken.icon = nativeToken.icon;
                borrowToken.name = nativeToken.name;
              }
            }
            borrowTokens.push(borrowToken);
          }
          if (!repayTokens.some((it: any) => it.address.toLowerCase() === token.address.toLowerCase())) {
            const addCollateralToken = {
              ...token,
              balance: token.balance
            };
            if (token.address.toLowerCase() === wrappedToken?.address?.toLowerCase()) {
              if (nativeToken) {
                addCollateralToken.symbol = nativeToken.symbol;
                addCollateralToken.icon = nativeToken.icon;
                addCollateralToken.name = nativeToken.name;
              }
            }
            addCollateralTokens.push(addCollateralToken);
          }
        });

        position.baseLTV = baseLTV;
        position.totalBorrowedUsd = totalBorrowedUsd.toFixed(2);
        position.totalBorrowedUsdValue = totalBorrowedUsd;
        position.totalCollateralUsd = totalCollateralUsd.toFixed(2);
        position.totalCollateralUsdValue = totalCollateralUsd;
        if (totalBorrowedUsd.lte(0)) {
          position.healthFactor = '∞';
        } else {
          position.healthFactor = totalCollateralUsd
            .div(totalBorrowedUsd.times(liquidationRatio))
            .toFixed(2, Big.roundDown);
        }
        position.addCollateralTokens = addCollateralTokens;
        position.removeCollateralTokens = removeCollateralTokens;
        position.borrowTokens = borrowTokens;
        position.repayTokens = repayTokens;
      });

      onLoad({
        markets: _cTokensData,
        positionList: _positionList,
        userTotalBorrowUsd: userTotalBorrowUsd.toString(),
        userTotalCollateralUsd: userTotalCollateralUsd.toString(),
        userTotalSupplyUsd: userTotalSupplyUsd.toString()
      });
    };
    const getWalletBalance = () => {
      const result: any = {};
      return new Promise((resolve) => {
        let nativeOToken = '';
        const tokenList: any = Object.values(markets).filter((market: any) => {
          if (market.isNative) nativeOToken = market.address;
          return market.address && !market.isNative;
        });
        const calls = tokenList.map((token: any) => ({
          address: token.address,
          name: 'balanceOf',
          params: [account]
        }));
        multicall({
          abi: ERC20_ABI,
          calls,
          options: {},
          multicallAddress,
          provider: provider
        })
          .then((res: any) => {
            for (let i = 0, len = res.length; i < len; i++) {
              result[tokenList[i].address.toLowerCase()] =
                res[i] && res[i][0] ? ethers.utils.formatUnits(res[i][0]._hex, tokenList[i].decimals) : '0';
            }
            if (nativeOToken) {
              provider.getBalance(account).then((rawBalance: any) => {
                result[nativeOToken.toLowerCase()] = ethers.utils.formatUnits(rawBalance._hex, 18);
                resolve(result);
              });
            } else {
              resolve(result);
            }
          })
          .catch((err: any) => {
            console.log('getWalletBalance error', err);
            resolve(result);
          });
      });
    };
    const getDolomiteBalance = () => {
      const result: any = {};
      return new Promise((resolve) => {
        const tokenList: any = Object.values(markets);
        const calls = [
          {
            address: marginAddress,
            name: 'getAccountBalances',
            params: [{ owner: account, number: 0 }]
          }
        ];
        multicall({
          abi: MARGIN_ABI,
          calls,
          options: {},
          multicallAddress,
          provider: provider
        })
          .then((res: any) => {
            const [marketIds, addresses = [], principal, real] = res[0];
            addresses.forEach((address: string, index: number) => {
              const currToken = tokenList.find((token: any) => token.address.toLowerCase() === address.toLowerCase());
              if (address.toLowerCase() === wrappedToken?.address?.toLowerCase()) {
                result['native'] = ethers.utils.formatUnits(real[index].value?._hex || 0, currToken?.decimals || 18);
              }
              result[address.toLowerCase()] = ethers.utils.formatUnits(
                real[index].value?._hex || 0,
                currToken?.decimals || 18
              );
            });
            resolve(result);
          })
          .catch((err: any) => {
            console.log('getDepositBalance error', err);
            resolve(result);
          });
      });
    };
    const getMarketIdByTokenAddress = () => {
      const tokenMarketIds: any = {};
      return new Promise((resolve) => {
        const marketList: any = Object.values(markets).filter((market: any) => {
          if (market.marketId) {
            tokenMarketIds[market.address.toLowerCase()] = market.marketId;
            return false;
          }
          return true;
        });
        const calls = marketList.map((market: any) => {
          tokenMarketIds[market.address.toLowerCase()] = market.marketId;
          let marketAddress = market.address;
          if (market.isNative) {
            marketAddress = wrappedToken.address;
          }
          return {
            address: marginAddress,
            name: 'getMarketIdByTokenAddress',
            params: [marketAddress]
          };
        });
        multicall({
          abi: MARGIN_ABI,
          calls,
          options: {},
          multicallAddress,
          provider: provider
        })
          .then((res: any) => {
            console.log('getMarketIdByTokenAddress: %o', res);
            for (let i = 0; i < res.length; i++) {
              tokenMarketIds[marketList[i].address.toLowerCase()] = ethers.utils.formatUnits(
                res[i] ? res[i][0]._hex : '0',
                0
              );
            }
            resolve(tokenMarketIds);
          })
          .catch((err: any) => {
            console.log('getMarketIdByTokenAddress failure: %o', err);
            resolve(tokenMarketIds);
          });
      });
    };
    const getInterestRates = () => {
      const result: any = {};
      return new Promise((resolve) => {
        axios
          .get(interestRatesApi)
          .then((interestRatesRes) => {
            const { status, data } = interestRatesRes;
            if (status !== 200 || !data) {
              resolve(result);
              return;
            }
            data.interestRates.forEach((item: any) => {
              const { token } = item;
              result[token.tokenAddress.toLowerCase()] = item;
              if (token.tokenAddress.toLowerCase() === wrappedToken.address.toLowerCase()) {
                result['native'] = {
                  ...item,
                  token: {
                    marketId: token.marketId,
                    tokenAddress: markets['native'].address,
                    tokenName: markets['native'].name,
                    tokenSymbol: markets['native'].symbol
                  }
                };
              }
            });
            resolve(result);
          })
          .catch((err: any) => {
            console.log('getInterestRates failure: %o', err);
            resolve(result);
          });
      });
    };
    const getPositionList = () => {
      const result: any = [];
      return new Promise((resolve) => {
        const blockNumberParams = blockNumberApiQuery();
        post(graphApi, blockNumberParams)
          .then((blockNumberRes) => {
            const blockNumber = blockNumberRes?.data?._meta?.block?.number;
            if (!blockNumber) {
              console.log('getPositionList getBlockNumber failure: %o', blockNumberRes);
              resolve(result);
              return;
            }
            const positionListParams = positionListApiQuery({ walletAddress: account, blockNumber });
            post(graphApi, positionListParams)
              .then((positionListRes) => {
                const borrowPositions = positionListRes?.data?.borrowPositions;
                if (!borrowPositions) {
                  console.log('getPositionList failure: %o', positionListRes);
                  resolve(result);
                  return;
                }
                // format position list
                borrowPositions.forEach((position: any) => {
                  const { amounts = [], marginAccount, status, id } = position;
                  if (status !== 'OPEN') return;
                  result.push(position);
                });
                resolve(result);
              })
              .catch((err: any) => {
                console.log('getPositionList failure: %o', err);
                resolve(result);
              });
          })
          .catch((err: any) => {
            console.log('getPositionList getBlockNumber failure: %o', err);
            resolve(result);
          });
      });
    };
    const getCTokenData = (oToken: any) => {
      if (oTokensLength === 0) return;
      const calls = [
        // {
        //   address: marginAddress,
        //   name: 'getMarketWithInfo',
        //   params: [oToken.marketId]
        // },
        // {
        //   address: marginAddress,
        //   name: 'getMarketSupplyInterestRateApr',
        //   params: [oToken.marketId]
        // },
        // {
        //   address: marginAddress,
        //   name: 'getMarketBorrowInterestRateApr',
        //   params: [oToken.marketId]
        // },
        {
          address: marginAddress,
          name: 'getLiquidationSpread',
          params: []
        },
        {
          address: marginAddress,
          name: 'getMarginRatio',
          params: []
        },
        {
          address: marginAddress,
          name: 'getMarketCurrentIndex',
          params: [oToken.marketId]
        }
      ];
      multicall({
        abi: MARGIN_ABI,
        calls,
        options: {},
        multicallAddress,
        provider: provider
      })
        .then((res: any) => {
          console.log('%s getCTokenData Res: %o, oToken: %o', oToken.symbol, res, oToken);

          const MarginRatio = ethers.utils.formatUnits(res[1][0]?.value?._hex || 0, 18);
          const LTV = minimumCollateralizationToLTV(MarginRatio);

          const LiquidationPenalty = ethers.utils.formatUnits(res[0][0]?.value?._hex || 0, 18);

          const MarketSupplyInterestRateApr = oToken.interestRates.supplyInterestRate;
          const supplyApy = apr2ApyDaily(MarketSupplyInterestRateApr);

          const MarketBorrowInterestRateApr = oToken.interestRates.borrowInterestRate;
          const borrowApy = apr2ApyDaily(MarketBorrowInterestRateApr);

          let [marketBorrowIndex, marketSupplyIndex] = res[2][0];
          marketBorrowIndex = ethers.utils.formatUnits(marketBorrowIndex.toString(), 18);
          marketSupplyIndex = ethers.utils.formatUnits(marketSupplyIndex.toString(), 18);

          const monetaryPrice = oToken.price || '0';
          const totalParBorrow = Big(oToken.borrowPar || '0')
            .times(marketBorrowIndex)
            .toString();
          const totalParSupply = Big(oToken.supplyPar || '0')
            .times(marketSupplyIndex)
            .toString();

          console.log('totalParBorrow: %o', totalParBorrow);
          console.log('totalParSupply: %o', totalParSupply);
          console.log('marketBorrowIndex: %o', marketBorrowIndex);
          console.log('marketSupplyIndex: %o', marketSupplyIndex);

          let currentTokenBorrow = Big(0);
          let currentTokenCollateral = Big(0);
          _positionList.forEach((position: any) => {
            const { amounts = [] } = position;
            amounts.forEach((_amount: any) => {
              const { amountPar, amountWei, token: _token } = _amount;
              if (_token.id.toLowerCase() === oToken.address.toLowerCase()) {
                // Collateral
                if (Big(amountPar).gte(0)) {
                  _amount.collateral = Big(amountPar).times(marketSupplyIndex);
                  currentTokenCollateral = currentTokenCollateral.plus(_amount.collateral);
                }
                // Borrow
                else {
                  _amount.borrow = Big(amountPar).abs().times(marketBorrowIndex);
                  currentTokenBorrow = currentTokenBorrow.plus(_amount.borrow);
                }
              }
            });
          });
          const currentTokenBorrowUsd = currentTokenBorrow.times(monetaryPrice);
          const currentTokenCollateralUsd = currentTokenCollateral.times(monetaryPrice);

          _cTokensData[oToken.address.toLowerCase()] = {
            ...oToken,
            borrowInterest: marketBorrowIndex,
            supplyInterest: marketSupplyIndex,
            marketId: oToken.marketId,
            dapp: name,
            Utilization: Big(totalParBorrow).div(totalParSupply).times(100).toFixed(2, 0) + '%',
            address: oToken.address,
            borrowAPR: Big(MarketBorrowInterestRateApr).times(100).toFixed(2) + '%',
            borrowAPY: borrowApy,
            borrowToken: [],
            borrowTokenPrice: [],
            exchangeRate: '1',
            lendAPR: Big(MarketSupplyInterestRateApr).times(100).toFixed(2) + '%',
            lendAPY: supplyApy,
            liquidationFee: LiquidationPenalty,
            maxLTV: LTV,
            loanToValue: Big(LTV).times(100).toString(),
            name: oToken.symbol,
            totalBorrowUsd: Big(totalParBorrow).times(monetaryPrice).toString(),
            totalBorrowed: totalParBorrow,
            totalSupplied: totalParSupply,
            totalSupplyUsd: Big(totalParSupply).times(monetaryPrice).toString(),
            underlyingPrice: monetaryPrice,
            price: monetaryPrice,
            underlyingToken: oToken.underlyingToken,
            userUnderlyingBalance: oToken.walletBalance,
            currentTokenBorrow,
            yourBorrow: currentTokenBorrow.toFixed(6, 0),
            yourBorrowShares: 0,
            currentTokenBorrowUsd,
            yourBorrowUSD: currentTokenBorrowUsd.toFixed(2),
            currentTokenCollateral,
            yourCollateral: currentTokenCollateral.toFixed(6, 0),
            currentTokenCollateralUsd,
            yourCollateralUSD: currentTokenCollateralUsd.toFixed(2),
            yourLends: oToken.dolomiteBalance || '',
            yourLendsUSD: Big(oToken.dolomiteBalance || 0)
              .times(monetaryPrice)
              .toString(),
            balance: oToken.dolomiteBalance || '0'
          };

          console.log('_cTokensData: %o', _cTokensData);

          oTokensLength--;
          if (oTokensLength === 0) {
            count++;
            formatedData('oTokens data');
          }
        })
        .catch((err: any) => {
          console.log('error-getCTokenData', err);
        });
    };
    const getCTokensData = async () => {
      const [
        tokenBalances,
        dolomiteBalance,
        positionList,
        interestRates,
        marketInfo,
        marketTokenInfo,
        totalPars,
        prices
      ]: any = await Promise.all([
        getWalletBalance(),
        getDolomiteBalance(),
        getPositionList(),
        getInterestRates(),
        getMarketInfo(),
        getMarketTokenInfo(),
        getTotalPars(),
        getPrices()
      ]);
      _positionList = positionList;
      Object.values(markets).forEach((market: any) => {
        let _address = market.address.toLowerCase();
        if (market.isNative && wrappedToken) {
          _address = wrappedToken.address.toLowerCase();
        }
        const _obj = {
          ...market,
          walletBalance: tokenBalances[market.address.toLowerCase()],
          dolomiteBalance: dolomiteBalance[_address],
          interestRates: interestRates[_address],
          price: prices[_address],
          borrowPar: totalPars[_address]?.borrowPar || '0',
          supplyPar: totalPars[_address]?.supplyPar || '0',
          marketId: marketTokenInfo[_address]?.marketId,
          isBorrowingDisabled: marketInfo[_address]?.isBorrowingDisabled,
          liquidationRewardPremium: marketInfo[_address]?.liquidationRewardPremium,
          marginPremium: marketInfo[_address]?.marginPremium,
          oracle: marketInfo[_address]?.oracle,
          supplyMaxWei: marketInfo[_address]?.supplyMaxWei
        };

        getCTokenData(_obj);
      });
    };
    const getMarketInfo = async () => {
      const result: any = {};
      const blockNumberParams = blockNumberApiQuery();
      return new Promise((resolve) => {
        post(graphApi, blockNumberParams)
          .then((blockNumberRes) => {
            const blockNumber = blockNumberRes?.data?._meta?.block?.number;
            if (!blockNumber) {
              console.log('getMarketInfo getBlockNumber failure: %o', blockNumberRes);
              resolve(result);
              return;
            }
            const marketInfoParams = marketInfoApiQuery({ blockNumber });
            post(graphApi, marketInfoParams)
              .then((marketInfoRes) => {
                const marketRiskInfos = marketInfoRes?.data?.marketRiskInfos;
                if (!marketRiskInfos) {
                  console.log('getMarketInfo failure: %o', marketInfoRes);
                  resolve(result);
                  return;
                }
                marketRiskInfos.forEach((info: any) => {
                  result[info.token.id] = info;
                });
                resolve(result);
              })
              .catch((err: any) => {
                console.log('getMarketInfo failure: %o', err);
                resolve(result);
              });
          })
          .catch((err: any) => {
            console.log('getMarketInfo getBlockNumber failure: %o', err);
            resolve(result);
          });
      });
    };
    const getMarketTokenInfo = async () => {
      const result: any = {};
      const blockNumberParams = blockNumberApiQuery();
      return new Promise((resolve) => {
        post(graphApi, blockNumberParams)
          .then((blockNumberRes) => {
            const blockNumber = blockNumberRes?.data?._meta?.block?.number;
            if (!blockNumber) {
              console.log('getMarketTokenInfo getBlockNumber failure: %o', blockNumberRes);
              resolve(result);
              return;
            }
            const marketInfoParams = allTokensApiQuery({ blockNumber });
            post(graphApi, marketInfoParams)
              .then((marketInfoRes) => {
                const tokens = marketInfoRes?.data?.tokens;
                if (!tokens) {
                  console.log('getMarketTokenInfo failure: %o', marketInfoRes);
                  resolve(result);
                  return;
                }
                tokens.forEach((info: any) => {
                  result[info.id] = info;
                });
                resolve(result);
              })
              .catch((err: any) => {
                console.log('getMarketTokenInfo failure: %o', err);
                resolve(result);
              });
          })
          .catch((err: any) => {
            console.log('getMarketTokenInfo getBlockNumber failure: %o', err);
            resolve(result);
          });
      });
    };
    const getTotalPars = async () => {
      const result: any = {};
      const blockNumberParams = blockNumberApiQuery();
      return new Promise((resolve) => {
        post(graphApi, blockNumberParams)
          .then((blockNumberRes) => {
            const blockNumber = blockNumberRes?.data?._meta?.block?.number;
            if (!blockNumber) {
              console.log('getTotalPars getBlockNumber failure: %o', blockNumberRes);
              resolve(result);
              return;
            }
            const totalParsParams = allTotalParsApiQuery({ blockNumber });
            post(graphApi, totalParsParams)
              .then((totalParsRes) => {
                const totalPars = totalParsRes?.data?.totalPars;
                if (!totalPars) {
                  console.log('getTotalPars failure: %o', totalParsRes);
                  resolve(result);
                  return;
                }
                totalPars.forEach((info: any) => {
                  result[info.id] = info;
                });
                resolve(result);
              })
              .catch((err: any) => {
                console.log('getTotalPars failure: %o', err);
                resolve(result);
              });
          })
          .catch((err: any) => {
            console.log('getTotalPars getBlockNumber failure: %o', err);
            resolve(result);
          });
      });
    };
    const getPrices = async () => {
      return new Promise((resolve) => {
        axios
          .get(pricesApi)
          .then((res: any) => {
            const prices = res?.data?.prices ?? {};
            resolve(prices);
          })
          .catch((err: any) => {
            console.log('getPrices failure: %o', err);
            resolve({});
          });
      });
    };

    getCTokensData();
  }, [update, account, provider]);

  return null;
};

export default DolomiteData;
