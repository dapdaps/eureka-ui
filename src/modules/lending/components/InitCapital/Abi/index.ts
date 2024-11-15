export const OTOKEN_ABI = [
  {
    inputs: [],
    name: 'totalAssets',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalDebt',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getSupplyRate_e18',
    outputs: [
      {
        internalType: 'uint256',
        name: 'supplyRate_e18',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getBorrowRate_e18',
    outputs: [
      {
        internalType: 'uint256',
        name: 'borrowRate_e18',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_shares',
        type: 'uint256'
      }
    ],
    name: 'toAmt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amt',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_shares',
        type: 'uint256'
      }
    ],
    name: 'debtShareToAmtStored',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amt',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amt',
        type: 'uint256'
      }
    ],
    name: 'debtAmtToShareStored',
    outputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amt',
        type: 'uint256'
      }
    ],
    name: 'toShares',
    outputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];

export const ERC20_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];

export const POS_MANAGER_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_viewer',
        type: 'address'
      }
    ],
    name: 'getViewerPosIdsLength',
    outputs: [
      {
        internalType: 'uint256',
        name: 'length',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_viewer',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_index',
        type: 'uint256'
      }
    ],
    name: 'getViewerPosIdsAt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'posId',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_posId',
        type: 'uint256'
      }
    ],
    name: 'getPosCollInfo',
    outputs: [
      {
        internalType: 'address[]',
        name: 'pools',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: 'amts',
        type: 'uint256[]'
      },
      {
        internalType: 'address[]',
        name: 'wLps',
        type: 'address[]'
      },
      {
        internalType: 'uint256[][]',
        name: 'ids',
        type: 'uint256[][]'
      },
      {
        internalType: 'uint256[][]',
        name: 'wLpAmts',
        type: 'uint256[][]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_posId',
        type: 'uint256'
      }
    ],
    name: 'getPosBorrInfo',
    outputs: [
      {
        internalType: 'address[]',
        name: 'pools',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: 'debtShares',
        type: 'uint256[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];

export const INIT_ORACLE_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address'
      }
    ],
    name: 'getPrice_e36',
    outputs: [
      {
        internalType: 'uint256',
        name: 'price_e36',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];
