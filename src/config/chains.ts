import type { Chain } from '@/types';

//TODO: need wrap token address
//TODO: need all chains live on dapdap

export const colors: { [key: number]: string } = {
  8453: '0, 56, 255',
  5000: '65, 109, 109',
  1: '',
  42161: '25, 70, 137',
  43114: '142, 3, 3',
  56: '151, 110, 6',
  59144: '',
  1088: '',
  10: '169, 51, 51',
  137: '67, 25, 137',
  1101: '169, 84, 255',
  324: '87, 53, 181',
  100: '10, 71, 23',
  0: '235, 244, 121'
};

const chainCofig = {
  8453: {
    chainId: 8453,
    chainName: 'Base',
    icon: '/assets/images/base.png',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
      icon: '/assets/tokens/eth.png'
    },
    rpcUrls: ['https://developer-access-mainnet.base.org', 'https://base.llamarpc.com', 'https://base-pokt.nodies.app'],
    blockExplorers: 'https://basescan.org'
  },
  5000: {
    chainId: 5000,
    chainName: 'Mantle',
    icon: '/assets/images/mantle.png',
    nativeCurrency: {
      name: 'MNT',
      symbol: 'MNT',
      decimals: 18,
      icon: '/assets/tokens/mnt.png'
    },
    rpcUrls: ['https://mantle-mainnet.public.blastapi.io', 'https://rpc.ankr.com/mantle', 'https://rpc.mantle.xyz'],
    blockExplorers: 'https://mantlescan.info'
  },

  1: {
    chainId: 1,
    chainName: 'Ethereum',
    icon: '/assets/images/bafkreicjsbkvvcxahxjejkctwopcnmzbeskxhfrkg7lyawhkhzrxcmvgfy.svg',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
      icon: '/assets/tokens/eth.png'
    },
    rpcUrls: ['https://rpc.ankr.com/eth', 'https://eth.llamarpc.com', 'https://rpc.mevblocker.io'],
    blockExplorers: 'https://etherscan.io'
  },
  42161: {
    chainId: 42161,
    chainName: 'Arbitrum One',
    icon: '/assets/images/arbitrum.png',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
      icon: '/assets/tokens/eth.png'
    },
    rpcUrls: ['https://arb1.arbitrum.io/rpc', 'https://arbitrum.llamarpc.com', 'https://arbitrum-one.publicnode.com'],
    blockExplorers: 'https://arbiscan.io'
  },
  43114: {
    chainId: 43114,
    chainName: 'Avalanche',
    icon: '/assets/images/avalanche.png',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
      icon: '/assets/images/bafkreiaxodsgromeeaihu44fazsxdopkrqvinqzhyfxvx5mrbcmduqdfpq.svg'
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc', 'https://1rpc.io/avax/c', 'https://avalanche.drpc.org'],
    blockExplorers: 'https://snowtrace.io'
  },
  56: {
    chainId: 56,
    chainName: 'BNB Smart Chain',
    icon: '/assets/images/bsc.png',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
      icon: '/assets/tokens/bnb.png'
    },
    rpcUrls: [
      'https://bscrpc.com',
      'https://binance.llamarpc.com',
      'https://bsc.blockpi.network/v1/rpc/public',
      'https://bsc-rpc.publicnode.com'
    ],
    blockExplorers: 'https://bscscan.com'
  },
  59144: {
    chainId: 59144,
    chainName: 'Linea',
    icon: '/assets/images/linea-chainicon.png',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
      icon: '/assets/tokens/eth.png'
    },
    rpcUrls: ['https://linea.blockpi.network/v1/rpc/public', 'https://1rpc.io/linea', 'https://rpc.linea.build'],
    blockExplorers: 'https://lineascan.build'
  },
  1088: {
    chainId: 1088,
    chainName: 'Metis',
    icon: '/assets/images/metis.png',
    nativeCurrency: {
      name: 'METIS',
      symbol: 'METIS',
      decimals: 18,
      icon: '/assets/tokens/metis.webp'
    },
    rpcUrls: [
      'https://andromeda.metis.io/?owner=1088',
      'https://metis-mainnet.public.blastapi.io',
      'https://metis.api.onfinality.io/public'
    ],
    blockExplorers: 'https://andromeda-explorer.metis.io'
  },
  10: {
    chainId: 10,
    chainName: 'Optimism',
    icon: '/assets/images/optimism.png',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
      icon: '/assets/tokens/eth.png'
    },
    rpcUrls: [
      'https://rpc.ankr.com/optimism',
      'https://optimism.llamarpc.com',
      'https://optimism-mainnet.public.blastapi.io'
    ],
    blockExplorers: 'https://optimistic.etherscan.io'
  },
  137: {
    chainId: 137,
    chainName: 'Polygon PoS',
    icon: '/assets/images/polygon.png',
    nativeCurrency: {
      name: 'POL',
      symbol: 'POL',
      decimals: 18,
      icon: '/assets/tokens/matic.webp'
    },
    rpcUrls: [
      'https://polygon-mainnet.public.blastapi.io',
      'https://polygon.llamarpc.com',
      'https://polygon-mainnet.rpcfast.com?api_key=xbhWBI1Wkguk8SNMu1bvvLurPGLXmgwYeC4S6g2H7WdwFigZSmPWVZRxrskEQwIf'
    ],
    blockExplorers: 'https://polygonscan.com'
  },
  1101: {
    chainId: 1101,
    chainName: 'Polygon zkEVM',
    icon: '/assets/images/polygon-zkevm-chainicon.png',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
      icon: '/assets/tokens/eth.png'
    },
    rpcUrls: ['https://zkevm-rpc.com', 'https://rpc.ankr.com/polygon_zkevm', 'https://rpc.ankr.com/polygon_zkevm'],
    blockExplorers: 'https://zkevm.polygonscan.com'
  },
  324: {
    chainId: 324,
    chainName: 'ZKsync Era',
    icon: '/assets/images/zksync.png',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
      icon: '/assets/tokens/eth.png'
    },
    rpcUrls: [
      'https://mainnet.era.zksync.io',
      'https://endpoints.omniatech.io/v1/zksync-era/mainnet/public',
      'https://zksync.drpc.org'
    ],
    blockExplorers: 'https://explorer.zksync.io/'
  },
  100: {
    chainId: 100,
    chainName: 'Gnosis',
    icon: '/assets/images/gnosis.png',
    nativeCurrency: {
      name: 'XDAI',
      symbol: 'XDAI',
      decimals: 18,
      icon: '/assets/tokens/xdai.png'
    },
    rpcUrls: [
      'https://rpc.ankr.com/gnosis',
      'https://gnosis-pokt.nodies.app',
      'https://gnosis.api.onfinality.io/public'
    ],
    blockExplorers: 'https://gnosisscan.io/'
  },
  169: {
    chainId: 169,
    chainName: 'Manta Pacific',
    icon: '/assets/images/manta-chainicon.png',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
      icon: '/assets/tokens/eth.png'
    },
    rpcUrls: [
      'https://1rpc.io/manta',
      'https://manta-pacific-gascap.calderachain.xyz/http',
      'https://pacific-rpc.manta.network/http'
    ],
    blockExplorers: 'https://pacific-explorer.manta.network/'
  },
  534352: {
    chainId: 534352,
    chainName: 'Scroll',
    icon: '/assets/images/scroll-chainicon.png',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18, icon: '/assets/tokens/eth.png' },
    rpcUrls: ['https://rpc.scroll.io', 'https://rpc.ankr.com/scroll', 'https://scroll.blockpi.network/v1/rpc/public'],
    blockExplorers: 'https://scrollscan.com/'
  },
  81457: {
    chainId: 81457,
    chainName: 'Blast',
    icon: '/assets/images/blast-chainicon.png',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18, icon: '/assets/tokens/eth.png' },
    rpcUrls: ['https://rpc.blast.io', 'https://rpc.ankr.com/blast', 'https://blastl2-mainnet.public.blastapi.io'],
    blockExplorers: 'https://blastscan.io'
  },
  34443: {
    chainId: 34443,
    chainName: 'Mode',
    icon: '/assets/images/mode.png',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
      icon: '/assets/tokens/eth.png'
    },
    rpcUrls: ['https://mainnet.mode.network', 'https://mode.drpc.org', 'https://1rpc.io/mode'],
    blockExplorers: 'https://modescan.io'
  },
  80084: {
    chainId: 80084,
    chainName: 'Berachain bArtio',
    icon: '',
    nativeCurrency: { name: 'BERA', symbol: 'BERA', decimals: 18 },
    rpcUrls: ['https://bartio.rpc.berachain.com/'],
    blockExplorers: 'https://bartio.beratrail.io'
  }
  // 84532: {
  //   chainId: 84532,
  //   chainName: 'Base Sepolia',
  //   icon: '/assets/images/base.png',
  //   nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  //   rpcUrls: ['https://base-sepolia.blockpi.network/v1/rpc/public', 'https://base-sepolia.blockpi.network/v1/rpc/public', 'https://base-sepolia.blockpi.network/v1/rpc/public'],
  //   blockExplorers: 'https://basescan.org',
  // }
} as { [key: number]: Chain };

export default chainCofig;

export const L1ChainIds = [
  // Ethereum
  1,
  // binance
  56,
  // Polygon
  137, 43114
];
