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
  0: '235, 244, 121',
};

const chainCofig = {
  8453: {
    chainId: 8453,
    chainName: 'Base',
    icon: 'https://assets.dapdap.net/images/bafkreif24bmxzparik2t2nkog6km5diuwcysvxdv2j5ygzkzwm3pxs573a.svg',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://developer-access-mainnet.base.org', 'https://base.llamarpc.com', 'https://base-pokt.nodies.app'],
    blockExplorers: 'https://basescan.org',
  },
  5000: {
    chainId: 5000,
    chainName: 'Mantle',
    icon: 'https://assets.dapdap.net/images/bafkreicmbhykgsvj4rdujduh2fujbsrgp3mkqpqlw2weyuxdfqpwtka6la.svg',
    nativeCurrency: { name: 'MNT', symbol: 'MNT', decimals: 18 },
    rpcUrls: ['https://mantle-mainnet.public.blastapi.io', 'https://rpc.ankr.com/mantle', 'https://rpc.mantle.xyz'],
    blockExplorers: 'https://mantlescan.info',
  },

  1: {
    chainId: 1,
    chainName: 'Ethereum',
    icon: 'https://assets.dapdap.net/images/bafkreicjsbkvvcxahxjejkctwopcnmzbeskxhfrkg7lyawhkhzrxcmvgfy.svg',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://eth.llamarpc.com', 'https://rpc.ankr.com/eth', 'https://rpc.mevblocker.io'],
    blockExplorers: 'https://etherscan.io',
  },
  42161: {
    chainId: 42161,
    chainName: 'Arbitrum One',
    icon: 'https://assets.dapdap.net/images/bafkreiajyg2iof2wygtgromy6a2yfl2fqavfy235k7afc4frr7xnljvu2a.svg',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://arb1.arbitrum.io/rpc', 'https://arbitrum.llamarpc.com', 'https://arbitrum-one.publicnode.com'],
    blockExplorers: 'https://arbiscan.io',
  },
  43114: {
    chainId: 43114,
    chainName: 'Avalanche',
    icon: 'https://assets.dapdap.net/images/bafkreig47jh4spznafxdn2nemwt5uij7pgimfpbjrt5m4cwbi4dccfvvpe.svg',
    nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc', 'https://1rpc.io/avax/c', 'https://avalanche.drpc.org'],
    blockExplorers: 'https://snowtrace.io',
  },
  56: {
    chainId: 56,
    chainName: 'BNB Smart Chain',
    icon: 'https://assets.dapdap.net/images/bafkreibtexscwwgqupgb7anrseqdpogvt4cckyv4kavr7o3jgtcqzjkx5m.svg',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    rpcUrls: ['https://binance.llamarpc.com', 'https://bsc.blockpi.network/v1/rpc/public', 'https://bsc-rpc.publicnode.com'],
    blockExplorers: 'https://bscscan.com',
  },
  59144: {
    chainId: 59144,
    chainName: 'Linea',
    icon: 'https://assets.dapdap.net/images/bafkreib5v3jonanuknj5db5ysuhb6ubowv2pqnopyg3yraknfr3jn7el4u.svg',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://linea.blockpi.network/v1/rpc/public', 'https://1rpc.io/linea', 'https://rpc.linea.build'],
    blockExplorers: 'https://lineascan.build',
  },
  1088: {
    chainId: 1088,
    chainName: 'Metis',
    icon: 'https://assets.dapdap.net/images/bafkreifjzbjcownp4mlvkyai4yks55bdjevci7uj7i3nbc45sg65ulmtwu.svg',
    nativeCurrency: { name: 'METIS', symbol: 'METIS', decimals: 18 },
    rpcUrls: ['https://andromeda.metis.io/?owner=1088', 'https://metis-mainnet.public.blastapi.io', 'https://metis.api.onfinality.io/public'],
    blockExplorers: 'https://andromeda-explorer.metis.io',
  },
  10: {
    chainId: 10,
    chainName: 'Optimism',
    icon: 'https://assets.dapdap.net/images/bafkreidax5cwumzbzrttt7iswlzhdndtbzyiyrg6yy4jbtydm2ihvlpo6a.svg',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rpc.ankr.com/optimism', 'https://optimism.llamarpc.com', 'https://optimism-mainnet.public.blastapi.io'],
    blockExplorers: 'https://optimistic.etherscan.io',
  },
  137: {
    chainId: 137,
    chainName: 'Polygon PoS',
    icon: 'https://assets.dapdap.net/images/bafkreic6p22qh3ytwkpmv5hq6a3ppdq7xoyvnmeog3wbtugnao434q6d7a.svg',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: ['https://polygon-mainnet.public.blastapi.io', 'https://polygon.llamarpc.com', 'https://polygon-mainnet.rpcfast.com?api_key=xbhWBI1Wkguk8SNMu1bvvLurPGLXmgwYeC4S6g2H7WdwFigZSmPWVZRxrskEQwIf'],
    blockExplorers: 'https://polygonscan.com',
  },
  1101: {
    chainId: 1101,
    chainName: 'Polygon zkEVM',
    icon: 'https://assets.dapdap.net/images/bafkreie5b65e7cp7jtvhrwgibvoqpf7ekj4v7jgo2egjr3qmfsl3p4ulam.svg',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://zkevm-rpc.com', 'https://rpc.ankr.com/polygon_zkevm', 'https://rpc.ankr.com/polygon_zkevm'],
    blockExplorers: 'https://zkevm.polygonscan.com',
  },
  324: {
    chainId: 324,
    chainName: 'ZKsync Era',
    icon: 'https://assets.dapdap.net/images/bafkreibcq6agazqmv5euwf355v7x7hlinz3jkuins2bkfffdbp3jgbjj6u.svg',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.era.zksync.io', 'https://endpoints.omniatech.io/v1/zksync-era/mainnet/public', 'https://zksync.drpc.org'],
    blockExplorers: 'https://explorer.zksync.io/',
  },
  100: {
    chainId: 100,
    chainName: 'Gnosis',
    icon: 'https://assets.dapdap.net/images/bafkreiazsyndhevopspbjue3ztz5r5mypuzpa5gjragm3hdg6ey33rfheu.svg',
    nativeCurrency: { name: 'XDAI', symbol: 'XDAI', decimals: 18 },
    rpcUrls: ['https://rpc.ankr.com/gnosis', 'https://gnosis-pokt.nodies.app', 'https://gnosis.api.onfinality.io/public'],
    blockExplorers: 'https://gnosisscan.io/',
  },
  169: {
    chainId: 169,
    chainName: 'Manta Pacific',
    icon: 'https://ipfs.near.social/ipfs/bafkreib7p2gc7pd3qdvwusnny3c5s6sfupetbu4b77yigouxe2ne7ew2fq',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://1rpc.io/manta', 'https://manta-pacific-gascap.calderachain.xyz/http', 'https://pacific-rpc.manta.network/http'],
    blockExplorers: 'https://pacific-explorer.manta.network/',
  },
  534352: {
    chainId: 534352,
    chainName: 'Scroll',
    icon: 'https://s3.amazonaws.com/dapdap.prod/images/scroll.png',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rpc.scroll.io', 'https://rpc.ankr.com/scroll', 'https://scroll.blockpi.network/v1/rpc/public'],
    blockExplorers: 'https://scrollscan.com/',
  },
  81457: {
    chainId: 81457,
    chainName: 'Blast',
    icon: 'https://s3.amazonaws.com/dapdap.prod/images/blastchain.png',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rpc.blast.io', 'https://rpc.ankr.com/blast', 'https://blastl2-mainnet.public.blastapi.io'],
    blockExplorers: 'https://blastscan.io',
  },
  34443: {
    chainId: 34443,
    chainName: 'Mode',
    icon: '/images/chains/mode.png',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.mode.network', 'https://mode.drpc.org', 'https://1rpc.io/mode'],
    blockExplorers: 'https://modescan.io',
  },
  // 84532: {
  //   chainId: 84532,
  //   chainName: 'Base Sepolia',
  //   icon: 'https://assets.dapdap.net/images/bafkreif24bmxzparik2t2nkog6km5diuwcysvxdv2j5ygzkzwm3pxs573a.svg',
  //   nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  //   rpcUrls: ['https://base-sepolia.blockpi.network/v1/rpc/public', 'https://base-sepolia.blockpi.network/v1/rpc/public', 'https://base-sepolia.blockpi.network/v1/rpc/public'],
  //   blockExplorers: 'https://basescan.org',
  // },
  // 3776: {
  //   chainId: 3776,
  //   chainName: 'Astar zkEVM',
  //   icon: '/images/chains/astar_zkevm.png',
  //   nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  //   rpcUrls: ['https://rpc.startale.com/astar-zkevm'],
  //   blockExplorers: 'https://astar-zkevm.explorer.startale.com',
  // }
} as { [key: number]: Chain };

export default chainCofig;

export const L1ChainIds = [
  // Ethereum
  1,
  // binance
  56,
  // Polygon
  137,
  43114
];
