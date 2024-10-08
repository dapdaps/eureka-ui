import type { Chain, Token } from '@/types';

export default {
  WETH: {
    chainId: 1,
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    icon: '/assets/tokens/weth.png'
  },
  USDC: {
    chainId: 1,
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    name: 'USDC',
    symbol: 'USDC',
    icon: '/assets/tokens/usdc.png',
    decimals: 6
  },
  USDT: {
    chainId: 1,
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    name: 'USDT',
    symbol: 'USDT',
    icon: '/assets/tokens/usdt.png',
    decimals: 6
  },
  DAI: {
    chainId: 1,
    address: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
    name: 'DAI',
    symbol: 'DAI',
    icon: '/assets/tokens/dai.png',
    decimals: 18
  }
} as {
  [key: string]: Token;
};
