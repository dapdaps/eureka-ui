export const chains = [
  {
    chainId: 1,
    chainName: 'Ethereum',
    icon: 'https://assets.dapdap.net/images/bafkreicjsbkvvcxahxjejkctwopcnmzbeskxhfrkg7lyawhkhzrxcmvgfy.svg',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://eth.llamarpc.com'],
    blockExplorers: 'https://etherscan.io'
  },
  {
    chainId: 42161,
    chainName: 'Arbitrum',
    icon: 'https://assets.dapdap.net/images/bafkreiajyg2iof2wygtgromy6a2yfl2fqavfy235k7afc4frr7xnljvu2a.svg',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorers: 'https://arbiscan.io'
  },
  {
    chainId: 56,
    chainName: 'BNB',
    icon: 'https://assets.dapdap.net/images/bafkreibtexscwwgqupgb7anrseqdpogvt4cckyv4kavr7o3jgtcqzjkx5m.svg',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    rpcUrls: ['https://binance.llamarpc.com'],
    blockExplorers: 'https://bscscan.com'
  },
  {
    chainId: 8453,
    chainName: 'Base',
    icon: 'https://assets.dapdap.net/images/bafkreif24bmxzparik2t2nkog6km5diuwcysvxdv2j5ygzkzwm3pxs573a.svg',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://developer-access-mainnet.base.org'],
    blockExplorers: 'https://basescan.org'
  },
  {
    chainId: 81457,
    chainName: 'Blast',
    icon: 'https://s3.amazonaws.com/dapdap.main/images/blast.png',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rpc.blast.io'],
    blockExplorers: 'https://blastscan.io'
  },
  {
    chainId: 34443,
    chainName: 'Mode',
    icon: '/images/chains/mode.png',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.mode.network'],
    blockExplorers: 'https://modescan.io'
  },
  {
    chainId: 59144,
    chainName: 'Linea',
    icon: 'https://assets.dapdap.net/images/bafkreib5v3jonanuknj5db5ysuhb6ubowv2pqnopyg3yraknfr3jn7el4u.svg',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://linea.blockpi.network/v1/rpc/public'],
    blockExplorers: 'https://lineascan.build'
  }
];

export const tokens: any = {
  1: [
    {
      chainId: 1,
      name: 'ETH',
      symbol: 'ETH',
      icon: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
      decimals: 18,
      isNative: true,
      address: 'native'
    }
  ],
  42161: [
    {
      chainId: 42161,
      name: 'ETH',
      symbol: 'ETH',
      icon: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
      decimals: 18,
      isNative: true,
      address: 'native'
    }
  ],
  56: [
    {
      chainId: 56,
      name: 'ETH',
      symbol: 'ETH',
      icon: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
      decimals: 18,
      isNative: false,
      address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8'
    }
  ],
  59144: [
    {
      chainId: 59144,
      name: 'ETH',
      symbol: 'ETH',
      icon: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
      decimals: 18,
      isNative: true,
      address: 'native'
    }
  ],
  8453: [
    {
      chainId: 8453,
      name: 'ETH',
      symbol: 'ETH',
      icon: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
      decimals: 18,
      isNative: true,
      address: 'native'
    }
  ],
  81457: [
    {
      chainId: 81457,
      name: 'ETH',
      symbol: 'ETH',
      icon: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
      decimals: 18,
      isNative: true,
      address: 'native'
    }
  ],
  34443: [
    {
      chainId: 34443,
      name: 'ETH',
      symbol: 'ETH',
      icon: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
      decimals: 18,
      isNative: true,
      address: 'native'
    }
  ]
};
