import type { Token } from '@/types';

const CHAIN_ID = 1101;
export const polygonZkevm: { [key: string]: Token } = {
  eth: {
    chainId: CHAIN_ID,
    name: 'ETH',
    symbol: 'ETH',
    icon: '/assets/tokens/eth.png',
    decimals: 18,
    isNative: true,
    address: 'native'
  },
  mai: {
    chainId: CHAIN_ID,
    address: '0x27a4BF80C2d63E42437258533dac7eAFF9881bdB',
    name: 'Mai Stablecoin',
    symbol: 'MAI',
    icon: '/assets/tokens/mai.png',
    decimals: 18
  },
  usdc: {
    chainId: CHAIN_ID,
    address: '0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035',
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin',
    icon: '/assets/tokens/usdc.png'
  },
  weth: {
    chainId: CHAIN_ID,
    address: '0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    icon: '/assets/tokens/weth.png'
  },
  reth: {
    chainId: CHAIN_ID,
    address: '0xb23c20efce6e24acca0cef9b7b7aa196b84ec942',
    decimals: 18,
    symbol: 'rETH',
    name: 'Rocket Pool ETH ',
    icon: '/assets/tokens/reth.png'
  },
  wbtc: {
    chainId: CHAIN_ID,
    address: '0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1',
    decimals: 8,
    symbol: 'WBTC',
    name: 'Wrapped BTC',
    icon: '/assets/tokens/wbtc.png'
  },
  matic: {
    chainId: CHAIN_ID,
    address: '0xa2036f0538221a77a3937f1379699f44945018d0',
    decimals: 18,
    symbol: 'MATIC',
    name: 'Matic Token',
    icon: '/assets/tokens/matic.webp'
  },
  usdt: {
    chainId: CHAIN_ID,
    address: '0x1E4a5963aBFD975d8c9021ce480b42188849D41d',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
    icon: '/assets/tokens/usdt.png'
  },
  dai: {
    chainId: CHAIN_ID,
    address: '0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4',
    decimals: 18,
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    icon: '/assets/tokens/dai.png'
  },
  'usdc.e': {
    chainId: CHAIN_ID,
    address: '0x37eaa0ef3549a5bb7d431be78a3d99bd360d19e5',
    decimals: 6,
    symbol: 'USDC.e',
    name: 'Bridged USDC',
    icon: '/assets/tokens/usdc.png'
  },
  dai2: {
    chainId: CHAIN_ID,
    address: '0x744c5860ba161b5316f7e80d9ec415e2727e5bd5',
    decimals: 18,
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    icon: '/assets/tokens/dai.png'
  },
  gyd: {
    chainId: CHAIN_ID,
    address: '0xca5d8f8a8d49439357d3cf46ca2e720702f132b8',
    decimals: 18,
    symbol: 'GYD',
    name: 'Gyroscope',
    icon: '/assets/tokens/gyd.png'
  },
  aura: {
    chainId: CHAIN_ID,
    address: '0x1509706a6c66ca549ff0cb464de88231ddbe213b',
    name: 'AURA',
    decimals: 18,
    symbol: 'AURA',
    icon: '/assets/tokens/aura.png'
  },
  // wsteth: {
  //   chainId: CHAIN_ID,
  //   address: '0x5d8cff95d7a57c0bf50b30b43c7cc0d52825d4a9',
  //   name: 'Wrapped liquid staked Ether 2.0',
  //   decimals: 18,
  //   symbol: 'wstETH',
  //   icon: '/assets/tokens/wsteth.png',
  // },
  rseth: {
    chainId: CHAIN_ID,
    address: '0x8c7d118b5c47a5bcbd47cc51789558b98dad17c5',
    decimals: 18,
    symbol: 'rsETH',
    name: 'rsETH',
    icon: '/assets/tokens/rseth.svg'
  },
  bal: {
    chainId: CHAIN_ID,
    address: '0x120ef59b80774f02211563834d8e3b72cb1649d6',
    decimals: 18,
    symbol: 'BAL',
    name: 'Balancer',
    icon: '/assets/tokens/bal.png'
  },
  ankreth: {
    chainId: CHAIN_ID,
    address: '0x12d8ce035c5de3ce39b1fdd4c1d5a745eaba3b8c',
    decimals: 18,
    symbol: 'ankrETH',
    name: 'Ankr Staked ETH',
    icon: '/assets/tokens/ankrETH.png'
  },

  cake: {
    chainId: CHAIN_ID,
    address: '0x0D1E753a25eBda689453309112904807625bEFBe',
    decimals: 18,
    symbol: 'Cake',
    name: 'PancakeSwap Token',
    icon: '/assets/tokens/cake.svg'
  },

  wsteth: {
    chainId: CHAIN_ID,
    address: '0xbf6De60Ccd9D22a5820A658fbE9fc87975EA204f',
    decimals: 18,
    symbol: 'wstETH',
    name: 'Wrapped liquid staked Ether 2.0',
    icon: '/assets/tokens/wsteth.png'
  },

  link: {
    chainId: CHAIN_ID,
    address: '0x4B16e4752711A7ABEc32799C976F3CeFc0111f2B',
    decimals: 18,
    symbol: 'LINK',
    name: 'ChainLink Token',
    icon: '/assets/tokens/link.png'
  },

  quick: {
    chainId: CHAIN_ID,
    address: '0x68286607A1d43602d880D349187c3c48c0fD05E6',
    decimals: 18,
    symbol: 'QUICK',
    name: 'QuickSwap',
    icon: '/assets/tokens/quick.png'
  },

  grai: {
    chainId: CHAIN_ID,
    address: '0xCA68ad4EE5c96871EC6C6dac2F714a8437A3Fe66',
    decimals: 18,
    symbol: 'GRAI',
    name: 'Gravita Debt Token',
    icon: '/assets/tokens/grai.svg'
  }
};
