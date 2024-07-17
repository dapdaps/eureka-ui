export default [
  {
    inputs: [
      { internalType: 'address', name: 'asset', type: 'address' },
      { internalType: 'uint256', name: 'depositAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'minRec', type: 'uint256' },
      { internalType: 'address', name: 'referral', type: 'address' },
    ],
    name: 'depositAsset',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'asset', type: 'address' },
      { internalType: 'uint256', name: 'mLRTamount', type: 'uint256' },
    ],
    name: 'userQueuingForWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_user', type: 'address' },
      { internalType: 'address[]', name: '_assets', type: 'address[]' },
    ],
    name: 'getUserQueuedWithdraw',
    outputs: [
      { internalType: 'uint256[]', name: 'queuedAmounts', type: 'uint256[]' },
      { internalType: 'uint256[]', name: 'claimableAmounts', type: 'uint256[]' },
      { internalType: 'uint256[]', name: 'claimedAmounts', type: 'uint256[]' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address[]', name: 'assets', type: 'address[]' }],
    name: 'userWithdrawAsset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'address[]', name: 'assets', type: 'address[]' },
    ],
    name: 'getUserWithdrawalSchedules',
    outputs: [
      { internalType: 'uint256[][]', name: 'queuedLstAmounts', type: 'uint256[][]' },
      { internalType: 'uint256[][]', name: 'endTimes', type: 'uint256[][]' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'asset', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'getMLRTAmountToMint',
    outputs: [
      { internalType: 'uint256', name: 'mLRTAmountToMint', type: 'uint256' },
      { internalType: 'address', name: 'mLRTReceipt', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
