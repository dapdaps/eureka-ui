// @ts-nocheck
import * as Accordion from '@radix-ui/react-accordion';
import * as Tabs from '@radix-ui/react-tabs';
import Big from 'big.js';
import { format } from 'date-fns';
import { ethers } from 'ethers';
import { memo, useEffect } from 'react';

import Button from '@/modules/components/Button';
import ChainWarningBox from '@/modules/components/ChainWarningBox';
import { useMultiState } from '@/modules/hooks';
import { asyncFetch } from '@/utils/http';

import Pool from './components/Pool';
import { EmptyWrap, GridContainer, GridContainer2, GridItem, HeadWrapper, PoolItem, TabsList, Wrapper } from './styles';
const POOLS = [
  {
    poolName: 'Locked ATH',
    tokenAddress: '0xa4ee142e34d0676edc2b760dd0016003d99a4cec',
    StakingAddress: '0xD481eD22a20708839aeB7f1d07E1d01cbc526184', // Locking
    poolType: 'Locking', // Locking MasterChief Staking
    tvl: 0
  },
  {
    poolName: 'HUM-xHUM',
    tokenAddress: '0x31cfdA26D5841d92333D8F9B3acbd5efEedb39c1',
    StakingAddress: '0x652a63c4df14e29080Ab058d6f151aBa61F86c10', //Staking
    poolType: 'MasterChief', // Locking MasterChief Staking
    tvl: 0
  }
];

const LockingABI = [
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'contract IERC20'
      }
    ],
    name: 'ATH',
    inputs: []
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'addToUnlock',
    inputs: [
      {
        type: 'uint256',
        name: 'amount',
        internalType: 'uint256'
      },
      {
        type: 'uint256',
        name: 'slotIndex',
        internalType: 'uint256'
      }
    ]
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256'
      }
    ],
    name: 'allowance',
    inputs: [
      {
        type: 'address',
        name: 'owner',
        internalType: 'address'
      },
      {
        type: 'address',
        name: 'spender',
        internalType: 'address'
      }
    ]
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool'
      }
    ],
    name: 'approve',
    inputs: [
      {
        type: 'address',
        name: 'spender',
        internalType: 'address'
      },
      {
        type: 'uint256',
        name: 'amount',
        internalType: 'uint256'
      }
    ]
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256'
      }
    ],
    name: 'balanceOf',
    inputs: [
      {
        type: 'address',
        name: 'account',
        internalType: 'address'
      }
    ]
  },

  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'cancelUnlock',
    inputs: [
      {
        type: 'uint256',
        name: 'slotIndex',
        internalType: 'uint256'
      }
    ]
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [
      {
        type: 'address[]',
        name: 'rewardTokens',
        internalType: 'address[]'
      },
      {
        type: 'uint256[]',
        name: 'earnedRewards',
        internalType: 'uint256[]'
      }
    ],
    name: 'claim',
    inputs: []
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [
      {
        type: 'address[]',
        name: 'rewardTokens',
        internalType: 'address[]'
      },
      {
        type: 'uint256[]',
        name: 'earnedRewards',
        internalType: 'uint256[]'
      }
    ],
    name: 'claimFor',
    inputs: [
      {
        type: 'address',
        name: '_for',
        internalType: 'address'
      }
    ]
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      {
        type: 'uint8',
        name: '',
        internalType: 'uint8'
      }
    ],
    name: 'decimals',
    inputs: []
  },

  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'deposit',
    inputs: [
      {
        type: 'uint256',
        name: '_amount',
        internalType: 'uint256'
      }
    ]
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'depositFor',
    inputs: [
      {
        type: 'address',
        name: '_for',
        internalType: 'address'
      },
      {
        type: 'uint256',
        name: '_amount',
        internalType: 'uint256'
      }
    ]
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      {
        type: 'tuple[]',
        name: 'slots',
        internalType: 'struct LockerV2.UserUnlocking[]',
        components: [
          {
            type: 'uint256'
          },
          {
            type: 'uint256'
          },
          {
            type: 'uint256'
          },
          {
            type: 'uint256'
          },
          {
            type: 'uint256'
          },
          {
            type: 'uint256'
          }
        ]
      }
    ],
    name: 'getAllUserUnlocking',
    inputs: [
      {
        type: 'address',
        name: '_user',
        internalType: 'address'
      }
    ]
  },

  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      {
        type: 'uint256',
        name: 'rewardPercentage',
        internalType: 'uint256'
      }
    ],
    name: 'getUserRewardPercentage',
    inputs: [
      {
        type: 'address',
        name: '_user',
        internalType: 'address'
      }
    ]
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256'
      }
    ],
    name: 'getUserSlotLength',
    inputs: [
      {
        type: 'address',
        name: '_user',
        internalType: 'address'
      }
    ]
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256'
      }
    ],
    name: 'getUserTotalDeposit',
    inputs: [
      {
        type: 'address',
        name: '_user',
        internalType: 'address'
      }
    ]
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'contract IBaseRewardPoolLocker'
      }
    ],
    name: 'rewarder',
    inputs: []
  },

  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'stakeInMasterChief',
    inputs: []
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address'
      }
    ],
    name: 'stakingToken',
    inputs: []
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'startUnlock',
    inputs: [
      {
        type: 'uint256',
        name: 'strategyIndex',
        internalType: 'uint256'
      },
      {
        type: 'uint256',
        name: 'amount',
        internalType: 'uint256'
      },
      {
        type: 'uint256',
        name: 'slotIndex',
        internalType: 'uint256'
      }
    ]
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      {
        type: 'string',
        name: '',
        internalType: 'string'
      }
    ],
    name: 'symbol',
    inputs: []
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256'
      }
    ],
    name: 'totalLocked',
    inputs: []
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256'
      }
    ],
    name: 'totalSupply',
    inputs: []
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256'
      }
    ],
    name: 'totalUnlocking',
    inputs: []
  },

  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      {
        type: 'uint256',
        name: 'unlockTime',
        internalType: 'uint256'
      },
      {
        type: 'uint256',
        name: 'forfeitPercent',
        internalType: 'uint256'
      },
      {
        type: 'uint256',
        name: 'rewardPercent',
        internalType: 'uint256'
      },
      {
        type: 'uint256',
        name: 'instantUnstakePercent',
        internalType: 'uint256'
      },
      {
        type: 'bool',
        name: 'isLinear',
        internalType: 'bool'
      },
      {
        type: 'bool',
        name: 'isActive',
        internalType: 'bool'
      }
    ],
    name: 'unlockingStrategies',
    inputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256'
      }
    ]
  },

  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256'
      }
    ],
    name: 'userUnlocking',
    inputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address'
      }
    ]
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      {
        type: 'uint256',
        name: 'startTime',
        internalType: 'uint256'
      },
      {
        type: 'uint256',
        name: 'endTime',
        internalType: 'uint256'
      },
      {
        type: 'uint256',
        name: 'amount',
        internalType: 'uint256'
      },
      {
        type: 'uint256',
        name: 'unlockingStrategy',
        internalType: 'uint256'
      },
      {
        type: 'uint256',
        name: 'alreadyUnstaked',
        internalType: 'uint256'
      },
      {
        type: 'uint256',
        name: 'alreadyWithdrawn',
        internalType: 'uint256'
      }
    ],
    name: 'userUnlockings',
    inputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address'
      },
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256'
      }
    ]
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      {
        type: 'address',
        name: 'owner',
        indexed: true
      },
      {
        type: 'address',
        name: 'spender',
        indexed: true
      },
      {
        type: 'uint256',
        name: 'value',
        indexed: false
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Claim',
    inputs: [
      {
        type: 'address',
        name: 'user',
        indexed: true
      },
      {
        type: 'uint256',
        name: 'timestamp',
        indexed: true
      }
    ],
    anonymous: false
  },

  {
    type: 'event',
    name: 'ResetSlot',
    inputs: [
      {
        type: 'address',
        name: 'user',
        indexed: true
      },
      {
        type: 'uint256',
        name: 'timestamp',
        indexed: true
      },
      {
        type: 'uint256',
        name: 'amount',
        indexed: false
      },
      {
        type: 'uint256',
        name: 'slotIndex',
        indexed: false
      }
    ],
    anonymous: false
  },

  {
    type: 'event',
    name: 'Unlock',
    inputs: [
      {
        type: 'address',
        name: 'user',
        indexed: true
      },
      {
        type: 'uint256',
        name: 'timestamp',
        indexed: true
      },
      {
        type: 'uint256',
        name: 'amount',
        indexed: false
      }
    ],
    anonymous: false
  }
];
const LPABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount1',
        type: 'uint256'
      }
    ],
    name: 'Claim',
    type: 'event'
  },

  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },

  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function'
  },

  {
    inputs: [],
    name: 'reserve0',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },

  {
    inputs: [],
    name: 'reserve1',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },

  {
    inputs: [],
    name: 'token0',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'token1',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'tokens',
    outputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
];
const initList = POOLS.map((item) => ({ ...item, stakedAmount: 0, APR: '' }));
export default memo(function AthenaFinance(props) {
  const {
    toast,
    account,
    provider,
    curChain,
    onSwitchChain,
    switchingChain,
    chainId,
    isChainSupported,
    multicallAddress,
    multicall,
    dexConfig
  } = props;

  const TOKENS = {
    '0xa4ee142e34d0676edc2b760dd0016003d99a4cec': {
      address: '0xa4ee142e34d0676edc2b760dd0016003d99a4cec',
      chainId,
      name: 'ATH',
      symbol: 'ATH',
      icon: 'https://www.athenafinance.io/assets/tokens/LATH.svg',
      decimals: 18,
      tokenId: ''
    },
    '0x31cfdA26D5841d92333D8F9B3acbd5efEedb39c1': {
      address: '0x31cfdA26D5841d92333D8F9B3acbd5efEedb39c1',
      chainId,
      name: 'vAMM-HUM/xHUM',
      symbol: 'vAMM-HUM/xHUM',
      icon: 'https://www.athenafinance.io/assets/tokens/HUMxHUM.svg',
      decimals: 18
    },
    '0x4febd4ea737a0ae94dd56e754e9b7a83e1c459e9': {
      address: '0x4febd4ea737a0ae94dd56e754e9b7a83e1c459e9',
      chainId,
      name: 'xHUM',
      symbol: 'xHUM',
      icon: 'https://www.athenafinance.io/assets/tokens/HUMxHUM.svg',
      decimals: 18
    }
  };

  const [state, updateState] = useMultiState({
    currentTab: 'TAB_POOL',
    account: '', // current wallet address
    poolsList: initList, //
    slotLength: 0,
    myPoolsList: [],
    curIndex: undefined,
    tokenPrices: '',
    lockingTotalSupply: 0,
    athLockerApr: ''
  });
  // const account = Ethers.send("eth_requestAccounts", [])[0];

  function multiCallV2(abi, calls, options, onSuccess, onError) {
    // for metis 1088
    const MULTICALL_ADDRESS = '0xc39aBB6c4451089dE48Cffb013c39d3110530e5C';
    const MULTICALL_ABI = [
      {
        inputs: [
          { internalType: 'bool', name: 'requireSuccess', type: 'bool' },
          {
            components: [
              { internalType: 'address', name: 'target', type: 'address' },
              { internalType: 'bytes', name: 'callData', type: 'bytes' }
            ],
            internalType: 'struct Multicall2.Call[]',
            name: 'calls',
            type: 'tuple[]'
          }
        ],
        name: 'tryAggregate',
        outputs: [
          {
            components: [
              { internalType: 'bool', name: 'success', type: 'bool' },
              { internalType: 'bytes', name: 'returnData', type: 'bytes' }
            ],
            internalType: 'struct Multicall2.Result[]',
            name: 'returnData',
            type: 'tuple[]'
          }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ];
    const MulticallContract = new ethers.Contract(MULTICALL_ADDRESS, MULTICALL_ABI, provider.getSigner());

    const { requireSuccess, ...overrides } = options || {};
    const itf = new ethers.utils.Interface(abi);
    const calldata = calls.map((call) => ({
      target: call.address.toLowerCase(),
      callData: itf.encodeFunctionData(call.name, call.params)
    }));
    MulticallContract.callStatic
      .tryAggregate(requireSuccess || true, calldata, overrides)
      .then((res) => {
        onSuccess(
          res.map((call, i) => {
            const [result, data] = call;
            return result && data !== '0x' ? itf.decodeFunctionResult(calls[i].name, data) : null;
          })
        );
      })
      .catch((err) => {
        onError?.(err);
      });
  }

  function calcStakedAmount() {
    const temp = [...state.poolsList];
    const { totalDeposit, unlocking } = temp[0];
    if (!isNaN(Number(totalDeposit)) && !isNaN(Number(unlocking))) {
      temp[0].stakedAmount = `${Big(totalDeposit).minus(Big(unlocking))}`;
    } else {
      temp[0].stakedAmount = '-';
    }
    updateState({
      poolsList: temp
      // fresh: state.fresh + 1,
    });
  }

  function initPoolList() {
    console.log('=====state.poolsList', state.poolsList);
    for (const item of state.poolsList) {
      if (item.poolType === 'Locking') {
        const temp = [...state.poolsList];
        getMultiLocking(item);
        // Locking

        getLockingClaim(item).then((array) => {
          if (array?.length) {
            fetchDexPrice('metis', array[0].join()).then((token_prices) => {
              const _rewards = array[0].reduce((total, addr, index) => {
                const _amount = ethers.utils.formatUnits(array[1][index]);
                const _price = token_prices[addr.toLowerCase()];
                return Big(_amount || 0)
                  .times(Big(_price || 0))
                  .plus(total)
                  .toFixed();
              }, 0);

              temp[0].rewardAmount = Big(_rewards).toFixed(2);
              updateState({
                poolsList: temp
                // fresh: state.fresh + 1,
              });
            });
          }
        });
      }
      if (item.poolType === 'MasterChief') {
        getMultiLP(item);
        getMultiMasterChief(item);
      }
    }
  }

  function fetchDexPrice(network, addresses) {
    return asyncFetch(`https://api.geckoterminal.com/api/v2/simple/networks/${network}/token_price/${addresses}`, {
      headers: {
        Accept: 'application/json;version=20230302'
      }
    })
      .then((res) => {
        return res.data.attributes.token_prices;
      })
      .catch((error) => {
        console.log('fetchDexPrice_error', error);
      });
  }

  function getLockingClaim(pool) {
    const myContract = new ethers.Contract(
      pool.StakingAddress,
      [
        {
          type: 'function',
          stateMutability: 'nonpayable',
          outputs: [
            {
              type: 'address[]',
              name: 'rewardTokens',
              internalType: 'address[]'
            },
            {
              type: 'uint256[]',
              name: 'earnedRewards',
              internalType: 'uint256[]'
            }
          ],
          name: 'claimFor',
          inputs: [
            {
              type: 'address',
              name: '_for',
              internalType: 'address'
            }
          ]
        }
      ],
      provider.getSigner()
    );

    return myContract.callStatic
      .claimFor(account)
      .then((res) => {
        console.info(
          res,
          res[0].join(),
          res[1].map((item) => item.toString())
        );
        return res;
      })
      .catch((err) => {
        console.info('getClaim_error:', err);
      });
  }

  function getMultiMasterChief(pool) {
    const fns = ['userInfo', 'depositInfo'];
    const calls = fns.map((fn) => {
      return {
        address: pool.StakingAddress,
        name: fn,
        params: [pool.tokenAddress, account]
      };
    });

    multiCallV2(
      [
        {
          type: 'function',
          stateMutability: 'view',
          outputs: [
            {
              type: 'uint256',
              name: 'amount',
              internalType: 'uint256'
            },
            {
              type: 'uint256',
              name: 'rewardDebt',
              internalType: 'uint256'
            },
            {
              type: 'uint256',
              name: 'available',
              internalType: 'uint256'
            }
          ],
          name: 'userInfo',
          inputs: [
            {
              type: 'address',
              name: '',
              internalType: 'address'
            },
            {
              type: 'address',
              name: '',
              internalType: 'address'
            }
          ]
        },
        {
          type: 'function',
          stateMutability: 'view',
          outputs: [
            {
              type: 'uint256',
              name: 'availableAmount',
              internalType: 'uint256'
            }
          ],
          name: 'depositInfo',
          inputs: [
            {
              type: 'address',
              name: '_lp',
              internalType: 'address'
            },
            {
              type: 'address',
              name: '_user',
              internalType: 'address'
            }
          ]
        }
      ],
      calls,
      {},
      (res) => {
        console.log('getMultiMasterChief res:', res);
        const temp = [...state.poolsList];

        const stakedAmount = Big(ethers.utils.formatUnits(res[1][0])).toFixed();
        const reward = ethers.utils.formatUnits(res[0][1]);
        const athPrice = state.tokenPrices[state.poolsList[0].tokenAddress];
        const rewardAmount = Big(reward).times(Big(athPrice ? athPrice : 0));

        temp[1].stakedAmount = stakedAmount;
        temp[1].rewardAmount = rewardAmount.toFixed(2);

        updateState({
          poolsList: temp
        });
      },
      (err) => {
        console.log('getMultiMasterChief_error', err);
      }
    );
  }

  function getTokenPrices() {
    const tokenAddresses = state.poolsList
      .filter((item) => item.poolType === 'Locking')
      .map((item) => item.tokenAddress)
      .join();
    fetchDexPrice('metis', tokenAddresses).then((prices) => {
      updateState({
        tokenPrices: prices
      });
    });
  }

  function getMultiLocking(pool) {
    const fns = ['getUserTotalDeposit', 'userUnlocking', 'getUserSlotLength', 'totalSupply', 'getAllUserUnlocking'];
    const calls = fns.map((fn) => {
      if (fn === 'totalSupply') {
        return {
          address: pool.StakingAddress,
          name: fn
        };
      }
      return {
        address: pool.StakingAddress,
        name: fn,
        params: [account]
      };
    });

    multiCallV2(
      LockingABI,
      calls,
      {},
      (res) => {
        console.log('getMultiLocking res:', res);
        const temp = [...state.poolsList];
        temp[0].totalDeposit = Big(ethers.utils.formatUnits(res[0][0])).toFixed(2);
        temp[0].unlocking = Big(ethers.utils.formatUnits(res[1][0])).toFixed(2);

        const slotLength = res[2][0].toString();
        const totalSupply = res[3][0];

        const list = res[4][0].map((item) =>
          item.map((number, index) => {
            switch (index) {
              case 0:
              case 1:
                return number;
              case 2:
                return Big(ethers.utils.formatUnits(number)).toFixed(2);
              default:
                return number;
            }
          })
        );
        const _myPoolsList = list
          .map((item, index) => {
            item.push(index);
            return item;
          })
          .filter((item) => {
            return item[2].toString() !== '0.00';
          });

        console.log('====_myPoolsList', _myPoolsList);
        updateState({
          lockingTotalSupply: totalSupply,
          poolsList: temp,
          slotLength,
          myPoolsList: _myPoolsList
        });
        calcStakedAmount();
      },
      (err) => {
        console.log('getLockingInfo_error', err);
      }
    );
  }

  function getMultiLP(pool) {
    const fns = ['reserve0', 'reserve1', 'totalSupply', 'balanceOf', 'token0', 'token1'];
    const calls = fns.map((fn) => {
      if (fn === 'balanceOf') {
        return {
          address: pool.tokenAddress,
          name: fn,
          params: [pool.StakingAddress]
        };
      } else {
        return {
          address: pool.tokenAddress,
          name: fn
        };
      }
    });

    multiCallV2(
      LPABI,
      calls,
      {},
      (res) => {
        console.log('==res', res);
        const reserve0 = ethers.utils.formatUnits(res[0][0]);
        const reserve1 = ethers.utils.formatUnits(res[1][0]);
        const totalSupply = ethers.utils.formatUnits(res[2][0]);
        const balanceOf = ethers.utils.formatUnits(res[3][0]);
        const tokenAddresses = res.slice(4);

        fetchDexPrice('metis', tokenAddresses).then((prices) => {
          const pricesArray = Object.values(prices);

          const LPPrice = Big(reserve0)
            .times(pricesArray[0])
            .plus(Big(reserve1).times(pricesArray[1] ? pricesArray[1] : 0))
            .div(Big(totalSupply));

          const tvl = LPPrice.times(Big(balanceOf)).toFixed(2);
          const temp = [...state.poolsList];
          temp[1].tvl = tvl;
          temp[1].LPPrice = LPPrice.toFixed();
          updateState({
            poolsList: temp
          });
        });
      },
      (err) => {
        console.log('getMultiLP_error', err);
      }
    );
  }

  function getAPR() {
    const APR_ABI = [
      {
        type: 'function',
        stateMutability: 'view',
        outputs: [
          {
            type: 'uint256',
            name: 'APR',
            internalType: 'uint256'
          }
        ],
        name: 'getATHAPRForLocker',
        inputs: []
      },
      {
        type: 'function',
        stateMutability: 'view',
        outputs: [
          {
            type: 'uint256[]',
            name: 'APRs',
            internalType: 'uint256[]'
          },
          {
            type: 'address[]',
            name: 'rewardTokens',
            internalType: 'address[]'
          }
        ],
        name: 'getMultipleAPRforLockerlsInAdditionalReward',
        inputs: [
          {
            type: 'uint256',
            name: 'feeAmount',
            internalType: 'uint256'
          },
          {
            type: 'address[]',
            name: 'lps',
            internalType: 'address[]'
          },
          {
            type: 'address[]',
            name: 'inputRewardTokens',
            internalType: 'address[]'
          }
        ]
      },
      {
        type: 'function',
        stateMutability: 'view',
        outputs: [
          {
            type: 'uint256',
            name: 'APR',
            internalType: 'uint256'
          }
        ],
        name: 'getXHUMAPRForLocker',
        inputs: [
          {
            type: 'uint256',
            name: 'feeAmount',
            internalType: 'uint256'
          }
        ]
      },
      {
        type: 'function',
        stateMutability: 'view',
        outputs: [
          {
            type: 'uint256',
            name: 'APR',
            internalType: 'uint256'
          }
        ],
        name: 'getATHAprForPool',
        inputs: [
          {
            type: 'address',
            name: 'pool',
            internalType: 'address'
          }
        ]
      }
    ];

    const feeAmount = 600;
    const lps = [
      '0xa35ad1b31059a652c2bad1114604845469b86692',
      '0x619f235808d57d277c2c485af26a5a726ff7606b',
      '0x9c531f76b974fe0b7f545ba4c0623dd2fea3ef26',
      '0x919395161dd538aa0fb065a8eac878b18d07fbcd',
      '0x3eaa426861a283f0e46b6411aeb3c3608b090e0e',
      '0x8a19e755610aecb3c55bde4ecfb9185ef0267400',
      '0x0cad02c4c6fb7c0d403af74ba9ada3bf40df6478',
      '0xd5a0760d55ad46b6a1c46d28725e4c117312a7ad',
      '0x9f51f0d7f500343e969d28010c7eb0db1bcaaef9',
      '0x9e3f3be65fec3731197aff816489eb1eb6e6b830'
    ];
    const inputRewardTokens = ['0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000'];

    const APR_ADDRESS = '0x0dBDb8e33c66125d990abE4E4898e43781Bd5FEB';
    const calls = [
      {
        address: APR_ADDRESS,
        name: 'getATHAPRForLocker'
      },
      {
        address: APR_ADDRESS,
        name: 'getMultipleAPRforLockerlsInAdditionalReward',
        params: [feeAmount, lps, inputRewardTokens]
      },
      {
        address: APR_ADDRESS,
        name: 'getXHUMAPRForLocker',
        params: [feeAmount]
      },
      {
        address: APR_ADDRESS,
        name: 'getATHAprForPool',
        params: ['0x31cfdA26D5841d92333D8F9B3acbd5efEedb39c1']
      }
    ];

    multiCallV2(
      APR_ABI,
      calls,
      {},
      (res) => {
        const [[athAmount], [[metisAmount], [addr]], [xhumAmount], [humAmount]] = res;

        const athApr = Big(ethers.utils.formatUnits(athAmount, 8)).toFixed(2);
        const metisApr = Big(ethers.utils.formatUnits(metisAmount, 8)).toFixed(2);
        const xhumApr = Big(ethers.utils.formatUnits(xhumAmount, 8)).toFixed(2);

        const humApr = Big(ethers.utils.formatUnits(humAmount, 8)).toFixed(2);
        const athLockerApr = Big(athApr).plus(metisApr).plus(xhumApr).toFixed(2);

        const temp = [...state.poolsList];
        temp[0].APR = athLockerApr;
        temp[1].APR = humApr;
        updateState({
          poolsList: temp
        });
      },
      (err) => {
        console.log('getMultiLP_error', err);
      }
    );
  }

  const handleChangeTabs = (value) => {
    updateState({
      currentTab: value
    });
  };

  function handleReLock(_, index) {
    // updateState({
    //   unstaking: true,
    // });

    const myContract = new ethers.Contract(POOLS[0].StakingAddress, LockingABI, provider.getSigner());
    myContract
      .startUnlock(0, 0, index)
      .then((tx) => {
        console.log('tx: ', tx);
        tx.wait()
          .then((res) => {
            const { status, transactionHash } = res;
            console.info('tx_res: ', res);
            if (status === 1) {
              toast.success?.({
                title: 'Transaction Successful!',
                text: `transactionHash ${transactionHash}`
              });
            } else {
              toast.fail?.({
                title: 'Transaction Failed!',
                text: `transactionHash ${transactionHash}`
              });
            }
          })
          .finally(() => {
            // updateState({
            //   unstaking: false,
            // });
          });
      })
      .catch((err) => {
        // updateState({
        //   unstaking: false,
        // });
        console.log('handleReLock_error:', err);
      });
  }
  function handleUnLock(index) {
    console.log('====index', index);
    updateState({
      curIndex: index
    });

    const myContract = new ethers.Contract(
      POOLS[0].StakingAddress,
      [
        {
          type: 'function',
          stateMutability: 'nonpayable',
          outputs: [],
          name: 'unlock',
          inputs: [
            {
              type: 'uint256',
              name: 'slotIndex',
              internalType: 'uint256'
            }
          ]
        }
      ],
      provider.getSigner()
    );
    myContract
      .unlock(index, {
        gasLimit: 5000000
      })
      .then((tx) => {
        console.log('tx: ', tx);
        tx.wait()
          .then((res) => {
            const { status, transactionHash } = res;
            console.info('tx_res: ', res);
            if (status === 1) {
              toast.success?.({
                title: 'Transaction Successful!',
                text: `transactionHash ${transactionHash}`
              });
            } else {
              toast.fail?.({
                title: 'Transaction Failed!',
                text: `transactionHash ${transactionHash}`
              });
            }
          })
          .finally(() => {
            updateState({
              curIndex: undefined
            });
          });
      })
      .catch((err) => {
        updateState({
          curIndex: undefined
        });
        console.log('handleUnLock_error:', err);
      });
  }
  useEffect(() => {
    updateState({ account });
    if (account) {
      initPoolList();
      getAPR();
    }
  }, [account]);

  useEffect(() => {
    getTokenPrices();
  }, []);

  // calc tvl for locking
  useEffect(() => {
    const lockingPrice = state.tokenPrices[POOLS[0].tokenAddress];
    if (!lockingPrice || !state.lockingTotalSupply) return;

    const lockingTVL = Big(lockingPrice)
      .times(Big(ethers.utils.formatUnits(state.lockingTotalSupply)))
      .toFixed(2);
    const temp = [...state.poolsList];
    temp[0].tvl = lockingTVL;
    updateState({
      poolsList: temp
    });
  }, [state.tokenPrices, state.lockingTotalSupply]);
  return (
    <Wrapper>
      <Tabs.Root value={state.currentTab} onValueChange={handleChangeTabs}>
        <TabsList>
          <Tabs.Trigger value="TAB_POOL" asChild>
            <div className={`tab-head-item ${state.currentTab === 'TAB_POOL' ? 'active' : ''}`}>All Pools</div>
          </Tabs.Trigger>
          <Tabs.Trigger value="TAB_ASSETS" asChild>
            <div className={`tab-head-item ${state.currentTab === 'TAB_ASSETS' ? 'active' : ''}`}>Unlock requests</div>
          </Tabs.Trigger>
        </TabsList>
        <Tabs.Content value="TAB_POOL">
          <GridContainer className="grid-pool-head">
            <GridItem>Pool</GridItem>
            <GridItem>APR</GridItem>
            <GridItem>TVL</GridItem>
            <GridItem>You Staked</GridItem>
            <GridItem>Your rewards</GridItem>
          </GridContainer>
          <Accordion.Root type="single" collapsible>
            {state.poolsList.map((item, index) => (
              <PoolItem key={index}>
                <Pool
                  key={item.poolName}
                  {...{
                    ...props,
                    data: item,
                    account: state.account,
                    TOKENS,
                    LockingABI,
                    slotLength: state.slotLength,
                    tokenPrices: state.tokenPrices,
                    startUnlockIndex: state.myPoolsList?.length
                  }}
                />
              </PoolItem>
            ))}
          </Accordion.Root>
        </Tabs.Content>
        <Tabs.Content value="TAB_ASSETS">
          {state.myPoolsList.length ? (
            <GridContainer2 className="grid-pool-head">
              <GridItem>Start date</GridItem>
              <GridItem>Amount</GridItem>
              <GridItem>End date</GridItem>
              <GridItem>Status</GridItem>
              <GridItem className="action-item-head">Action</GridItem>
            </GridContainer2>
          ) : null}
          <HeadWrapper>
            {state.myPoolsList.length ? (
              state.myPoolsList?.map((item, index) => (
                <PoolItem key={index}>
                  <GridContainer2 className="pool-head">
                    <GridItem>
                      <div className="title-primary">
                        <span>{format(Big(item[0]).toFixed(0) * 1000, 'yyyy/MM/dd')}</span>
                      </div>
                    </GridItem>
                    <GridItem>
                      <div className="title-secondary">{item[2]}</div>
                      {/* <div className="title-sub">{item[1]}</div> */}
                    </GridItem>
                    <GridItem>
                      <div className="title-secondary">{format(Big(item[1]).toFixed(0) * 1000, 'yyyy/MM/dd')}</div>
                    </GridItem>
                    <GridItem>
                      {Big(new Date().getTime()).gt(Big(item[1]).times(1000)) ? (
                        <div className="title-secondary green">Ready</div>
                      ) : (
                        <div className="title-secondary">In progress</div>
                      )}
                    </GridItem>
                    <GridItem className="action-item">
                      {Big(new Date().getTime()).gt(Big(item[1]).times(1000)) ? (
                        <Button
                          {...{
                            text: 'WITHDRAW',
                            type: 'green',
                            style: { width: 118 },
                            loading: index === state.curIndex ? true : false,
                            disabled: state.curIndex > -1 && index !== state.curIndex ? true : false,
                            onClick: () => {
                              handleUnLock(item[6]);
                            }
                          }}
                        />
                      ) : (
                        <Button
                          {...{
                            text: 'RE-LOCK',
                            type: 'green',
                            style: { width: 118 },
                            onClick: () => {
                              handleReLock(item, index);
                            }
                          }}
                        />
                      )}
                    </GridItem>
                  </GridContainer2>
                </PoolItem>
              ))
            ) : (
              <EmptyWrap>
                <div className="empty-title">No productive assets detected</div>
                <div className="empty-intro">
                  Head over to the pools list and make a deposit to start earning yield!
                </div>
              </EmptyWrap>
            )}
          </HeadWrapper>
        </Tabs.Content>
      </Tabs.Root>
      {!isChainSupported && (
        <ChainWarningBox
          chain={curChain}
          onSwitchChain={onSwitchChain}
          switchingChain={switchingChain}
          theme={dexConfig.theme}
        />
      )}
    </Wrapper>
  );
});
