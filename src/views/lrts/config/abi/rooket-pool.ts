const rETH_ABI = [
    {
      inputs: [],
      name: 'getExchangeRate',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
      ],
      name: 'allowance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_ethAmount',
          type: 'uint256',
        },
      ],
      name: 'getRethValue',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      "inputs": [
        { "internalType": "uint256", "name": "_rethAmount", "type": "uint256" }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_rethAmount',
          type: 'uint256',
        },
      ],
      name: 'getEthValue',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];
const STAKE_ABI = [
{
    inputs: [
    { internalType: "uint256", name: "_uniswapPortion", type: "uint256" },
    { internalType: "uint256", name: "_balancerPortion", type: "uint256" },
    { internalType: "uint256", name: "_minTokensOut", type: "uint256" },
    { internalType: "uint256", name: "_idealTokensOut", type: "uint256" },
    ],
    name: "swapTo",
    outputs: [],
    stateMutability: "payable",
    type: "function",
},
]
const BALANCER_ABI = [
{
    "inputs": [
        {
            "components": [
                {
                    "internalType": "bytes32",
                    "name": "poolId",
                    "type": "bytes32"
                },
                {
                    "internalType": "enum IVault.SwapKind",
                    "name": "kind",
                    "type": "uint8"
                },
                {
                    "internalType": "contract IAsset",
                    "name": "assetIn",
                    "type": "address"
                },
                {
                    "internalType": "contract IAsset",
                    "name": "assetOut",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "userData",
                    "type": "bytes"
                }
            ],
            "internalType": "struct IVault.SingleSwap",
            "name": "singleSwap",
            "type": "tuple"
        },
        {
            "components": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "fromInternalBalance",
                    "type": "bool"
                },
                {
                    "internalType": "address payable",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "toInternalBalance",
                    "type": "bool"
                }
            ],
            "internalType": "struct IVault.FundManagement",
            "name": "funds",
            "type": "tuple"
        }
    ],
    "name": "querySwap",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
},
]


export  {
    rETH_ABI,
    STAKE_ABI,
    BALANCER_ABI,
}