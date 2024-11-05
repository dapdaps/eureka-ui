import type { Token } from '@/types';

const CHAIN_ID = 324;
export const zkSync: { [key: string]: Token } = {
  eth: {
    chainId: CHAIN_ID,
    address: 'native',
    isNative: true,
    decimals: 18,
    symbol: 'ETH',
    name: 'ETH',
    icon: '/assets/tokens/eth.png'
  },
  wbtc: {
    chainId: CHAIN_ID,
    address: '0xBBeB516fb02a01611cBBE0453Fe3c580D7281011',
    decimals: 8,
    symbol: 'WBTC',
    name: 'Wrapped BTC',
    icon: '/assets/tokens/wbtc.png'
  },

  vc: {
    chainId: CHAIN_ID,
    address: '0x85D84c774CF8e9fF85342684b0E795Df72A24908',
    decimals: 18,
    symbol: 'VC',
    name: 'VC',
    icon: '/assets/tokens/vc.svg'
  },

  waifu: {
    chainId: CHAIN_ID,
    address: '0xA4E4d9984366e74713737Cb5d646bbA0B7E070A4',
    decimals: 18,
    symbol: 'WAIFU',
    name: 'WAIFU',
    icon: '/assets/tokens/waifu.png'
  },

  weth: {
    chainId: CHAIN_ID,
    address: '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    icon: '/assets/tokens/weth.png'
  },

  zch: {
    chainId: CHAIN_ID,
    address: '0xe8f5fbedd89c756a97de655b8d06a5b5cc3452ed',
    decimals: 18,
    symbol: 'ZCH',
    name: 'ZilchToken',
    icon: '/assets/tokens/zch.webp'
  },

  keyvc: {
    chainId: CHAIN_ID,
    address: '0x4a57dA213A589F305B8411f15f64fb8c5724e7CE',
    decimals: 18,
    symbol: 'keyVC',
    name: 'ZilchToken',
    icon: '/assets/tokens/keyvc.png'
  },

  lsd: {
    chainId: CHAIN_ID,
    address: '0x458A2E32eAbc7626187E6b75f29D7030a5202bD4',
    decimals: 18,
    symbol: 'LSD',
    name: 'LSD',
    icon: '/assets/tokens/lsd.png'
  },

  usx: {
    chainId: CHAIN_ID,
    address: '0xdb89D7b0Dccd0C0e5aC3571133A9aa1a037945cb',
    decimals: 18,
    symbol: 'USX',
    name: 'USX',
    icon: '/assets/tokens/usx.svg'
  },

  dvf: {
    chainId: CHAIN_ID,
    address: '0xbbd1ba24d589c319c86519646817f2f153c9b716',
    decimals: 18,
    symbol: 'DVF',
    name: 'DeversiFi Token',
    icon: '/assets/tokens/dvf.png'
  },

  iusd: {
    chainId: CHAIN_ID,
    address: '0x1382628e018010035999A1FF330447a0751aa84f',
    decimals: 18,
    symbol: 'iUSD',
    name: 'iZUMi Bond USD',
    icon: '/assets/tokens/iusd.svg'
  },

  slusdt: {
    chainId: CHAIN_ID,
    address: '0x496d88D1EFc3E145b7c12d53B78Ce5E7eda7a42c',
    decimals: 18,
    symbol: 'slUSDT',
    name: 'Shared-liquidity USDT',
    icon: '/assets/tokens/slusdt.png'
  },

  lusd: {
    chainId: CHAIN_ID,
    address: '0x503234F203fC7Eb888EEC8513210612a43Cf6115',
    decimals: 18,
    symbol: 'LUSD',
    name: 'LUSD Stablecoin',
    icon: '/assets/tokens/lusd.png'
  },

  reth: {
    chainId: CHAIN_ID,
    address: '0x32fd44bb869620c0ef993754c8a00be67c464806',
    decimals: 18,
    symbol: 'rETH',
    name: 'Rocket Pool ETH',
    icon: '/assets/tokens/reth.png'
  },

  space: {
    chainId: CHAIN_ID,
    address: '0x47260090cE5e83454d5f05A0AbbB2C953835f777',
    decimals: 18,
    symbol: 'SPACE',
    name: 'SPACE',
    icon: '/assets/tokens/space.png'
  },
  cebnb: {
    chainId: CHAIN_ID,
    address: '0x7400793aad94c8ca801aa036357d10f5fd0ce08f',
    decimals: 18,
    symbol: 'ceBNB',
    name: 'Celer Network BNB',
    icon: '/assets/tokens/bnb.png'
  },
  usdt: {
    chainId: CHAIN_ID,
    address: '0x493257fd37edb34451f62edf8d2a0c418852ba4c',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
    icon: '/assets/tokens/usdt.png'
  },
  'usdc.e': {
    chainId: CHAIN_ID,
    address: '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4',
    decimals: 6,
    symbol: 'USDC.e',
    name: 'USD Coin',
    icon: '/assets/tokens/usdc.png'
  },
  cebusd: {
    chainId: CHAIN_ID,
    address: '0x2039bb4116B4EFc145Ec4f0e2eA75012D6C0f181',
    decimals: 18,
    symbol: 'ceBUSD',
    name: 'Celer Network BUSD',
    icon: '/assets/tokens/busd.webp'
  },
  zf: {
    chainId: CHAIN_ID,
    address: '0x31C2c031fDc9d33e974f327Ab0d9883Eae06cA4A',
    decimals: 18,
    symbol: 'ZF',
    name: 'zkSwap Finance',
    icon: '/assets/tokens/zf.png'
  },
  velocore: {
    chainId: CHAIN_ID,
    address: '0x99bBE51be7cCe6C8b84883148fD3D12aCe5787F2',
    decimals: 18,
    symbol: 'VC',
    name: 'Velocore',
    icon: '/assets/tokens/vc.svg',
    priceKey: 'velocore'
  },

  dai: {
    chainId: CHAIN_ID,
    address: '0x4b9eb6c0b6ea15176bbf62841c6b2a8a398cb656',
    decimals: 18,
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    icon: '/assets/tokens/dai.png'
  },

  zk: {
    chainId: CHAIN_ID,
    address: '0x5A7d6b2F92C77FAD6CCaBd7EE0624E64907Eaf3E',
    decimals: 18,
    symbol: 'ZK',
    name: 'ZK',
    icon: '/assets/tokens/zk.jpeg'
  },
  wsteth: {
    chainId: CHAIN_ID,
    address: '0x703b52f2b28febcb60e1372858af5b18849fe867',
    decimals: 18,
    symbol: 'wstETH',
    name: 'wstETH',
    icon: '/assets/tokens/wsteth.png'
  },
  usdc: {
    chainId: CHAIN_ID,
    address: '0x1d17cbcf0d6d143135ae902365d2e5e2a16538d4',
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin',
    icon: '/assets/tokens/usdc.png'
  },
  wrseth: {
    chainId: CHAIN_ID,
    address: '0xd4169e045bcf9a86cc00101225d9ed61d2f51af2',
    decimals: 18,
    symbol: 'wrsETH',
    name: 'wrsETH',
    icon: '/assets/tokens/wrseth.svg'
  },
  weth2: {
    chainId: CHAIN_ID,
    address: '0xf00dad97284d0c6f06dc4db3c32454d4292c6813',
    decimals: 18,
    symbol: 'WETH',
    name: 'WETH',
    icon: '/assets/tokens/weth2.webp'
  },

  star: {
    chainId: CHAIN_ID,
    address: '0x838a66f841dd5148475a8918db0732c239499a03',
    decimals: 18,
    symbol: 'STAR',
    name: 'STAR',
    icon: '/assets/tokens/star.webp'
  },

  onez: {
    chainId: CHAIN_ID,
    address: '0x90059C32Eeeb1A2aa1351a58860d98855f3655aD',
    decimals: 18,
    symbol: 'ONEZ',
    name: 'ONEZ',
    icon: '/assets/tokens/onez.webp'
  },

  long: {
    chainId: CHAIN_ID,
    address: '0x5165ec33b491d7b67260B3143f96Bb4aC4736398',
    decimals: 18,
    symbol: 'LONG',
    name: 'LONG',
    icon: '/assets/tokens/long.webp'
  },
  leth: {
    chainId: CHAIN_ID,
    address: '0xE7895ed01a1a6AAcF1c2E955aF14E7cf612E7F9d',
    decimals: 18,
    symbol: 'LETH',
    name: 'LETH',
    icon: '/assets/tokens/leth.webp'
  },
  vs: {
    address: '0x5756a28e2aae01f600fc2c01358395f5c1f8ad3a',
    chainId: CHAIN_ID,
    symbol: 'VS',
    decimals: 18,
    name: 'veSync',
    icon: '/assets/tokens/vs.svg'
  }
};
