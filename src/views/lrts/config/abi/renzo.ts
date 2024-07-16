export default [
  {
    inputs: [
      { internalType: 'contract IERC20', name: '_token', type: 'address' },
      { internalType: 'uint256', name: '_balance', type: 'uint256' },
    ],
    name: 'lookupTokenValue',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'calculateTVLs',
    outputs: [
      { internalType: 'uint256[][]', name: '', type: 'uint256[][]' },
      { internalType: 'uint256[]', name: '', type: 'uint256[]' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_currentValueInProtocol', type: 'uint256' },
      { internalType: 'uint256', name: '_newValueAdded', type: 'uint256' },
      { internalType: 'uint256', name: '_existingEzETHSupply', type: 'uint256' },
    ],
    name: 'calculateMintAmount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_ezETHBeingBurned', type: 'uint256' },
      { internalType: 'uint256', name: '_existingEzETHSupply', type: 'uint256' },
      { internalType: 'uint256', name: '_currentValueInProtocol', type: 'uint256' },
    ],
    name: 'calculateRedeemAmount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: '_collateralToken', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { inputs: [], name: 'depositETH', outputs: [], stateMutability: 'payable', type: 'function' },
  {
    inputs: [
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'address', name: '_assetOut', type: 'address' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'withdrawRequestIndex', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'coolDownPeriod',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getOutstandingWithdrawRequests',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];
