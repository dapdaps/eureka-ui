export default [
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'bool', name: '', type: 'bool' }
    ],
    name: 'getPair',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'tokenA', type: 'address' },
      { internalType: 'address', name: 'tokenB', type: 'address' },
      { internalType: 'bool', name: 'stable', type: 'bool' }
    ],
    name: 'createPair',
    outputs: [{ internalType: 'address', name: 'pair', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
