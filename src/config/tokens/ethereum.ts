import type { Token } from '@/types';

const CHAIN_ID = 1;
export const ethereum: { [key: string]: Token } = {
  eth: {
    chainId: CHAIN_ID,
    name: 'ETH',
    symbol: 'ETH',
    icon: '/assets/tokens/eth.png',
    decimals: 18,
    isNative: true,
    address: 'native'
  },
  usdc: {
    chainId: CHAIN_ID,
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    name: 'USDC',
    symbol: 'USDC',
    icon: '/assets/tokens/usdc.png',
    decimals: 6
  },
  weth: {
    chainId: CHAIN_ID,
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    icon: '/assets/tokens/weth.png'
  },
  usdt: {
    chainId: CHAIN_ID,
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    name: 'Tether USD',
    symbol: 'USDT',
    icon: '/assets/tokens/usdt.png',
    decimals: 6
  },
  usdd: {
    address: '0x0C10bF8FcB7Bf5412187A595ab97a3609160b5c6',
    chainId: CHAIN_ID,
    name: 'Decentralized USD',
    symbol: 'USDD',
    icon: '/assets/tokens/usdd.jpg',
    decimals: 18
  },
  dai: {
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    chainId: CHAIN_ID,
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    icon: '/assets/tokens/dai.png',
    decimals: 18
  },
  wbtc: {
    chainId: CHAIN_ID,
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    decimals: 8,
    symbol: 'WBTC',
    name: 'Wrapped BTC',
    icon: '/assets/tokens/wbtc.png'
  },
  frax: {
    address: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
    chainId: CHAIN_ID,
    name: 'Frax',
    symbol: 'FRAX',
    icon: '/assets/tokens/frax.webp',
    decimals: 18
  },
  susd: {
    address: '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51',
    chainId: CHAIN_ID,
    name: 'Synth sUSD',
    symbol: 'sUSD',
    icon: '/assets/tokens/susd.webp',
    decimals: 18
  },
  lusd: {
    address: '0x5f98805A4E8be255a32880FDeC7F6728C6568bA0',
    chainId: CHAIN_ID,
    name: 'LUSD Stablecoin',
    symbol: 'LUSD',
    icon: '/assets/tokens/lusd.png',
    decimals: 6
  },
  mai: {
    address: '0x8D6CeBD76f18E1558D4DB88138e2DeFB3909fAD6',
    chainId: CHAIN_ID,
    name: 'Mai Stablecoin',
    symbol: 'MAI',
    icon: '/assets/tokens/mai.png',
    decimals: 18
  },
  ezETH: {
    address: '0xbf5495Efe5DB9ce00f80364C8B423567e58d2110',
    chainId: CHAIN_ID,
    symbol: 'ezETH',
    decimals: 18,
    name: 'ezETH',
    icon: '/assets/tokens/ezeth.svg'
  },
  rsETH: {
    address: '0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7',
    chainId: CHAIN_ID,
    symbol: 'rsETH',
    decimals: 18,
    name: 'rsETH',
    icon: '/assets/tokens/rseth.svg'
  }
};
