import type { Token } from '@/types';

const CHAIN_ID = 1088;
export const metis: { [key: string]: Token } = {
  usdt: {
    chainId: CHAIN_ID,
    name: 'USDT Token',
    symbol: 'USDT',
    icon: '/assets/tokens/usdt.png',
    decimals: 6,
    address: '0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC'
  },
  eth: {
    chainId: CHAIN_ID,
    name: 'ETH',
    symbol: 'ETH',
    icon: '/assets/tokens/eth.png',
    decimals: 18,
    address: '0x420000000000000000000000000000000000000A'
  },
  metis: {
    chainId: CHAIN_ID,
    address: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
    decimals: 18,
    symbol: 'METIS',
    name: 'Metis Token',
    icon: '/assets/tokens/metis.webp',
    isNative: true
  },
  weth: {
    chainId: CHAIN_ID,
    address: '0x420000000000000000000000000000000000000A',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    icon: '/assets/tokens/weth.png'
  },

  'm.usdt': {
    chainId: CHAIN_ID,
    address: '0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC',
    decimals: 6,
    symbol: 'm.USDT',
    name: 'USDT Token',
    icon: '/assets/tokens/usdt.png'
  },
  'm.usdc': {
    chainId: CHAIN_ID,
    address: '0xEA32A96608495e54156Ae48931A7c20f0dcc1a21',
    decimals: 6,
    symbol: 'm.USDC',
    name: 'USDC Token',
    icon: '/assets/tokens/usdc.png'
  },
  maia: {
    chainId: CHAIN_ID,
    address: '0x72c232D56542Ba082592DEE7C77b1C6CFA758BCD',
    decimals: 9,
    symbol: 'MAIA',
    name: 'Maia',
    icon: '/assets/tokens/maia.webp'
  },
  hera: {
    chainId: CHAIN_ID,
    address: '0x6f05709bc91bad933346f9e159f0d3fdbc2c9dce',
    decimals: 18,
    symbol: 'HERA',
    name: 'Hera Token',
    icon: '/assets/tokens/hera.png'
  },
  nett: {
    chainId: CHAIN_ID,
    address: '0x90fE084F877C65e1b577c7b2eA64B8D8dd1AB278',
    decimals: 18,
    symbol: 'NETT',
    name: 'Netswap Token',
    icon: '/assets/tokens/nett.png'
  },
  peak: {
    chainId: CHAIN_ID,
    address: '0x1f5550a0f5f659e07506088a7919a88dff37218f',
    decimals: 18,
    symbol: 'PEAK',
    name: 'PEAK',
    icon: '/assets/tokens/peak.png'
  },
  byte: {
    chainId: CHAIN_ID,
    address: '0x721532bc0da5ffaeb0a6a45fb24271e8098629a7',
    decimals: 18,
    symbol: 'BYTE',
    name: 'BinaryDAO Token',
    icon: '/assets/tokens/byte.jpg'
  },
  'm.dai': {
    chainId: CHAIN_ID,
    address: '0x4c078361FC9BbB78DF910800A991C7c3DD2F6ce0',
    decimals: 18,
    symbol: 'm.DAI',
    name: 'DAI Token',
    icon: '/assets/tokens/dai.png'
  },
  'm.wbtc': {
    chainId: CHAIN_ID,
    address: '0x433E43047B95cB83517abd7c9978Bdf7005E9938',
    decimals: 18,
    symbol: 'm.WBTC',
    name: 'WBTC Token',
    icon: '/assets/tokens/wbtc.png'
  },
  hermes: {
    chainId: CHAIN_ID,
    address: '0xb27BbeaACA2C00d6258C3118BAB6b5B6975161c8',
    decimals: 18,
    symbol: 'HERMES',
    name: 'Hermes',
    icon: '/assets/tokens/hermes.svg'
  },
  sfrxETH: {
    chainId: CHAIN_ID,
    address: '0x1f55a02A049033E3419a8E2975cF3F572F4e6E9A',
    decimals: 18,
    symbol: 'sfrxETH',
    name: 'Staked rax Ether',
    icon: '/assets/tokens/sfrxETH.svg'
  },
  eMetis: {
    chainId: CHAIN_ID,
    address: '0x97a2de3A09F4A4229369ee82c7F76be1a5564661',
    decimals: 18,
    symbol: 'eMetis',
    name: 'Enki Metis',
    icon: '/assets/tokens/eMetis.png'
  },
  seMetis: {
    chainId: CHAIN_ID,
    address: '0x79F3522a1b56f22a6549e42f9cfa92eF5FEb81e8',
    decimals: 18,
    symbol: 'seMetis',
    name: 'seMetis',
    icon: '/assets/tokens/seMetis.svg'
  },
  artMETIS: {
    chainId: CHAIN_ID,
    address: '0x2583A2538272f31e9A15dD12A432B8C96Ab4821d',
    decimals: 18,
    symbol: 'artMETIS',
    name: 'Staked Metis Token',
    icon: '/assets/tokens/artMETIS.svg'
  },
  enki: {
    chainId: CHAIN_ID,
    address: '0x096A84536ab84E68ee210561FFD3A038E79736F1',
    decimals: 18,
    symbol: 'ENKI',
    name: 'ENKI Protocol',
    icon: '/assets/tokens/enki.png'
  },
  titans: {
    chainId: CHAIN_ID,
    address: '0xa11DD414Ad9b68cc1fe4d0a256f0F4413169Dd5E',
    decimals: 18,
    symbol: 'TITANS',
    name: 'TitanBorn',
    icon: '/assets/tokens/titans.png'
  }
};
