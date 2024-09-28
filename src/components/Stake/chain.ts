export const chains = [
  {
    chainId: 1,
    chainName: 'Ethereum',
    icon: '/assets/images/bafkreicjsbkvvcxahxjejkctwopcnmzbeskxhfrkg7lyawhkhzrxcmvgfy.svg',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://eth.llamarpc.com'],
    blockExplorers: 'https://etherscan.io'
  },
  {
    chainId: 42161,
    chainName: 'Arbitrum',
    icon: '/assets/images/arbitrum.png',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorers: 'https://arbiscan.io'
  },
  {
    chainId: 56,
    chainName: 'BNB',
    icon: '/assets/images/bsc.png',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    rpcUrls: ['https://binance.llamarpc.com'],
    blockExplorers: 'https://bscscan.com'
  },
  {
    chainId: 8453,
    chainName: 'Base',
    icon: '/assets/images/base.png',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://developer-access-mainnet.base.org'],
    blockExplorers: 'https://basescan.org'
  },
  {
    chainId: 81457,
    chainName: 'Blast',
    icon: '/assets/images/blast.png',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rpc.blast.io'],
    blockExplorers: 'https://blastscan.io'
  },
  {
    chainId: 34443,
    chainName: 'Mode',
    icon: '/assets/images/mode.png',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.mode.network'],
    blockExplorers: 'https://modescan.io'
  },
  {
    chainId: 59144,
    chainName: 'Linea',
    icon: '/assets/images/linea-chainicon.png',
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
      icon: '/assets/tokens/usdt.png',
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
      icon: '/assets/tokens/usdt.png',
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
      icon: '/assets/tokens/usdt.png',
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
      icon: '/assets/tokens/usdt.png',
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
      icon: '/assets/tokens/usdt.png',
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
      icon: '/assets/tokens/usdt.png',
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
      icon: '/assets/tokens/usdt.png',
      decimals: 18,
      isNative: true,
      address: 'native'
    }
  ]
};
