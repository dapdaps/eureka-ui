import type { Token } from '@/types';

const CHAIN_ID = 137;
export const polygon: { [key: string]: Token } = {
  matic: {
    chainId: CHAIN_ID,
    name: 'POL',
    symbol: 'POL',
    icon: '/assets/tokens/matic.webp',
    decimals: 18,
    address: 'native',
    isNative: true
  },
  eth: {
    chainId: CHAIN_ID,
    address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    name: 'ETH',
    symbol: 'ETH',
    icon: '/assets/tokens/usdt.png',
    decimals: 18
  },
  mai: {
    chainId: CHAIN_ID,
    address: '0xa3Fa99A148fA48D14Ed51d610c367C61876997F1',
    name: 'Mai Stablecoin',
    symbol: 'MAI',
    icon: '/assets/tokens/mai.png',
    decimals: 18
  },
  weth: {
    chainId: CHAIN_ID,
    address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    icon: '/assets/tokens/weth.png'
  },
  usdr: {
    chainId: CHAIN_ID,
    address: '0x40379a439D4F6795B6fc9aa5687dB461677A2dBa',
    decimals: 9,
    symbol: 'USDR',
    name: 'Real USD',
    icon: '/assets/tokens/usdr.webp'
  },

  wbtc: {
    chainId: CHAIN_ID,
    address: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
    decimals: 8,
    symbol: 'WBTC',
    name: 'Wrapped BTC',
    icon: '/assets/tokens/wbtc.png'
  },

  hny: {
    chainId: CHAIN_ID,
    address: '0x1FA2F83BA2DF61c3d370071d61B17Be01e224f3a',
    decimals: 18,
    symbol: 'HNY',
    name: 'HONEY',
    icon: '/assets/tokens/hny.webp'
  },

  pcomb: {
    chainId: CHAIN_ID,
    address: '0x37D1EbC3Af809b8fADB45DCE7077eFc629b2B5BB',
    decimals: 18,
    symbol: 'pCOMB',
    name: 'Polygon Native Comb',
    icon: '/assets/tokens/pcomb.png'
  },

  mimatic: {
    chainId: CHAIN_ID,
    address: '0xa3Fa99A148fA48D14Ed51d610c367C61876997F1',
    decimals: 18,
    symbol: 'miMATIC',
    name: 'miMATIC',
    icon: '/assets/tokens/mimatic.webp'
  },

  dai: {
    chainId: CHAIN_ID,
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    decimals: 18,
    symbol: 'Dai',
    name: 'Dai Stablecoin',
    icon: '/assets/tokens/dai.png'
  },

  wmatic: {
    chainId: CHAIN_ID,
    address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    decimals: 18,
    symbol: 'WMATIC',
    name: 'Wrapped Matic',
    icon: '/assets/tokens/wmatic.png'
  },

  cash: {
    chainId: CHAIN_ID,
    address: '0x5D066D022EDE10eFa2717eD3D79f22F949F8C175',
    decimals: 18,
    symbol: 'CASH',
    name: 'CASH',
    icon: '/assets/tokens/cash.webp'
  },

  wusdr: {
    chainId: CHAIN_ID,
    address: '0x00e8c0E92eB3Ad88189E7125Ec8825eDc03Ab265',
    decimals: 9,
    symbol: 'wUSDR',
    name: 'Wrapped USDR',
    icon: '/assets/tokens/wusdr.jpeg'
  },

  cvr: {
    chainId: CHAIN_ID,
    address: '0x6AE96Cc93331c19148541D4D2f31363684917092',
    decimals: 18,
    symbol: 'CVR',
    name: 'CAVIAR',
    icon: '/assets/tokens/cvr.png'
  },

  pearl: {
    chainId: CHAIN_ID,
    address: '0x7238390d5f6F64e67c3211C343A410E2A3DEc142',
    decimals: 18,
    symbol: 'PEARL',
    name: 'Pearl',
    icon: '/assets/tokens/pearl.jpeg'
  },

  usdt: {
    chainId: CHAIN_ID,
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
    icon: '/assets/tokens/usdt.png'
  },

  usdc: {
    chainId: CHAIN_ID,
    address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin (PoS)',
    icon: '/assets/tokens/lusd.png'
  },

  'usdc.e': {
    chainId: CHAIN_ID,
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    decimals: 6,
    symbol: 'USDC.e',
    name: 'USD Coin (PoS)',
    icon: '/assets/tokens/lusd.png'
  },

  retro: {
    chainId: CHAIN_ID,
    address: '0xBFA35599c7AEbb0dAcE9b5aa3ca5f2a79624D8Eb',
    decimals: 18,
    symbol: 'RETRO',
    name: 'RETRO',
    icon: '/assets/tokens/retro.webp'
  },

  aave: {
    chainId: CHAIN_ID,
    address: '0xD6DF932A45C0f255f85145f286eA0b292B21C90B',
    decimals: 18,
    symbol: 'AAVE',
    name: 'Aave (PoS)',
    icon: '/assets/tokens/aave.svg'
  },
  // quick: {
  //   chainId: CHAIN_ID,
  //   address: '0x831753dd7087cac61ab5644b308642cc1c33dc13',
  //   decimals: 18,
  //   symbol: 'QUICK',
  //   name: 'Quickswap',
  //   icon: '/assets/tokens/quick.png',
  // },
  link: {
    chainId: CHAIN_ID,
    address: '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39',
    decimals: 18,
    symbol: 'LINK',
    name: 'ChainLink Token',
    icon: '/assets/tokens/link.png'
  },
  sushi: {
    chainId: CHAIN_ID,
    address: '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a',
    decimals: 18,
    symbol: 'SUSHI',
    name: 'SushiToken',
    icon: '/assets/tokens/sushi.png'
  },
  crv: {
    chainId: CHAIN_ID,
    address: '0x172370d5Cd63279eFa6d502DAB29171933a610AF',
    decimals: 18,
    symbol: 'CRV',
    name: 'Token CRV (PoS)',
    icon: '/assets/tokens/crv.png'
  },
  stmatic: {
    chainId: CHAIN_ID,
    address: '0x3A58a54C066FdC0f2D55FC9C89F0415C92eBf3C4',
    decimals: 18,
    symbol: 'stMATIC',
    name: 'Staked MATIC (PoS) ',
    icon: '/assets/tokens/stmatic.svg'
  },

  stg: {
    chainId: CHAIN_ID,
    address: '0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590',
    decimals: 18,
    symbol: 'STG',
    name: 'StargateToken',
    icon: '/assets/tokens/stg.webp'
  },
  klima: {
    chainId: CHAIN_ID,
    address: '0x4e78011Ce80ee02d2c3e649Fb657E45898257815',
    decimals: 9,
    symbol: 'KLIMA',
    name: 'Klima DAO',
    icon: '/assets/tokens/klima.webp'
  },

  tut: {
    chainId: CHAIN_ID,
    address: '0x12a34A6759c871C4C1E8A0A42CFc97e4D7Aaf68d',
    decimals: 18,
    symbol: 'TUT',
    name: 'Tutellus token',
    icon: '/assets/tokens/tut.webp'
  },

  ghst: {
    chainId: CHAIN_ID,
    address: '0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7',
    decimals: 18,
    symbol: 'GHST',
    name: 'Aavegotchi GHST Token (PoS)',
    icon: '/assets/tokens/ghst.webp'
  },

  quick: {
    chainId: CHAIN_ID,
    address: '0xB5C064F955D8e7F38fE0460C556a72987494eE17',
    decimals: 18,
    symbol: 'QUICK',
    name: 'QuickSwap',
    icon: '/assets/tokens/quick.png'
  },
  maticx: {
    chainId: CHAIN_ID,
    address: '0xfa68FB4628DFF1028CFEc22b4162FCcd0d45efb6',
    decimals: 18,
    symbol: 'MaticX',
    name: 'Liquid Staking Matic (PoS)',
    icon: '/assets/tokens/maticx.webp'
  },

  ichi: {
    chainId: CHAIN_ID,
    address: '0x111111517e4929D3dcbdfa7CCe55d30d4B6BC4d6',
    decimals: 18,
    symbol: 'ICHI',
    name: 'ICHI',
    icon: '/assets/tokens/ichi.webp'
  },
  rnt: {
    chainId: CHAIN_ID,
    address: '0x27Ab6E82F3458eDbC0703DB2756391B899Ce6324',
    decimals: 18,
    symbol: 'RNT',
    name: 'Reental Utility Token',
    icon: '/assets/tokens/rnt.webp'
  },
  rain: {
    chainId: CHAIN_ID,
    address: '0x8E677CA17065eD74675BC27bCaBadB7Eef10A292',
    decimals: 18,
    symbol: 'RAIN',
    name: 'Rain Coin',
    icon: '/assets/tokens/rain.webp'
  },
  zed: {
    chainId: CHAIN_ID,
    address: '0x5eC03C1f7fA7FF05EC476d19e34A22eDDb48ACdc',
    decimals: 18,
    symbol: 'ZED',
    name: 'ZED RUN',
    icon: '/assets/tokens/zed.webp'
  },
  gddy: {
    chainId: CHAIN_ID,
    address: '0x67eB41A14C0fe5CD701FC9d5A3D6597A72F641a6',
    decimals: 18,
    symbol: 'GDDY',
    name: 'Giddy Token',
    icon: '/assets/tokens/gddy.webp'
  },
  lgns: {
    chainId: CHAIN_ID,
    address: '0xeB51D9A39AD5EEF215dC0Bf39a8821ff804A0F01',
    decimals: 18,
    symbol: 'LGNS',
    name: 'Longinus',
    icon: '/assets/tokens/lgns.webp'
  },
  sand: {
    chainId: CHAIN_ID,
    address: '0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683',
    decimals: 18,
    symbol: 'SAND',
    name: 'SAND',
    icon: '/assets/tokens/sand.webp'
  },
  chp: {
    chainId: CHAIN_ID,
    address: '0x59B5654a17Ac44F3068b3882F298881433bB07Ef',
    decimals: 18,
    symbol: 'CHP',
    name: 'CoinPoker Chips',
    icon: '/assets/tokens/chp.webp'
  },
  ocean: {
    chainId: CHAIN_ID,
    address: '0x282d8efCe846A88B159800bd4130ad77443Fa1A1',
    decimals: 18,
    symbol: 'OCEAN',
    name: 'Ocean Token',
    icon: '/assets/tokens/ocean.png'
  }
};
