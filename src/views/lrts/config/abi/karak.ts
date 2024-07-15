export default [
  {
    inputs: [
      { internalType: 'contract IVault', name: 'vault', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'minSharesOut', type: 'uint256' },
    ],
    name: 'deposit',
    outputs: [{ internalType: 'uint256', name: 'shares', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'contract IVault[]', name: 'vaults', type: 'address[]' },
          { internalType: 'uint256[]', name: 'shares', type: 'uint256[]' },
          { internalType: 'address', name: 'withdrawer', type: 'address' },
        ],
        internalType: 'struct Withdraw.WithdrawRequest[]',
        name: 'withdrawalRequests',
        type: 'tuple[]',
      },
    ],
    name: 'startWithdraw',
    outputs: [
      { internalType: 'bytes32[]', name: 'withdrawalRoots', type: 'bytes32[]' },
      {
        components: [
          { internalType: 'address', name: 'staker', type: 'address' },
          { internalType: 'address', name: 'delegatedTo', type: 'address' },
          { internalType: 'uint256', name: 'nonce', type: 'uint256' },
          { internalType: 'uint256', name: 'start', type: 'uint256' },
          {
            components: [
              { internalType: 'contract IVault[]', name: 'vaults', type: 'address[]' },
              { internalType: 'uint256[]', name: 'shares', type: 'uint256[]' },
              { internalType: 'address', name: 'withdrawer', type: 'address' },
            ],
            internalType: 'struct Withdraw.WithdrawRequest',
            name: 'request',
            type: 'tuple',
          },
        ],
        internalType: 'struct Withdraw.QueuedWithdrawal[]',
        name: 'withdrawConfigs',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'staker', type: 'address' },
          { internalType: 'address', name: 'delegatedTo', type: 'address' },
          { internalType: 'uint256', name: 'nonce', type: 'uint256' },
          { internalType: 'uint256', name: 'start', type: 'uint256' },
          {
            components: [
              { internalType: 'contract IVault[]', name: 'vaults', type: 'address[]' },
              { internalType: 'uint256[]', name: 'shares', type: 'uint256[]' },
              { internalType: 'address', name: 'withdrawer', type: 'address' },
            ],
            internalType: 'struct Withdraw.WithdrawRequest',
            name: 'request',
            type: 'tuple',
          },
        ],
        internalType: 'struct Withdraw.QueuedWithdrawal[]',
        name: 'startedWithdrawals',
        type: 'tuple[]',
      },
    ],
    name: 'finishWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'assets', type: 'uint256' }],
    name: 'convertToShares',
    outputs: [{ internalType: 'uint256', name: 'shares', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'shares', type: 'uint256' }],
    name: 'convertToAssets',
    outputs: [{ internalType: 'uint256', name: 'assets', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'staker', type: 'address' }],
    name: 'fetchQueuedWithdrawals',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'staker', type: 'address' },
          { internalType: 'address', name: 'delegatedTo', type: 'address' },
          { internalType: 'uint256', name: 'nonce', type: 'uint256' },
          { internalType: 'uint256', name: 'start', type: 'uint256' },
          {
            components: [
              { internalType: 'contract IVault[]', name: 'vaults', type: 'address[]' },
              { internalType: 'uint256[]', name: 'shares', type: 'uint256[]' },
              { internalType: 'address', name: 'withdrawer', type: 'address' },
            ],
            internalType: 'struct Withdraw.WithdrawRequest',
            name: 'request',
            type: 'tuple',
          },
        ],
        internalType: 'struct Withdraw.QueuedWithdrawal[]',
        name: 'queuedWithdrawals',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'staker', type: 'address' }],
    name: 'getDeposits',
    outputs: [
      { internalType: 'contract IVault[]', name: 'vaults', type: 'address[]' },
      { internalType: 'contract IERC20[]', name: 'tokens', type: 'address[]' },
      { internalType: 'uint256[]', name: 'assets', type: 'uint256[]' },
      { internalType: 'uint256[]', name: 'shares', type: 'uint256[]' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
