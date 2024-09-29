import type { Token } from '@/types';

const CHAIN_ID = 137;
export const polygon: { [key: string]: Token } = {
  matic: {
    chainId: CHAIN_ID,
    name: 'POL',
    symbol: 'POL',
    icon: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    decimals: 18,
    address: 'native',
    isNative: true
  },
  eth: {
    chainId: CHAIN_ID,
    address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    name: 'ETH',
    symbol: 'ETH',
    icon: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
    decimals: 18
  },
  mai: {
    chainId: CHAIN_ID,
    address: '0xa3Fa99A148fA48D14Ed51d610c367C61876997F1',
    name: 'Mai Stablecoin',
    symbol: 'MAI',
    icon: 'https://assets.coingecko.com/coins/images/15264/standard/mimatic-red.png?1696514916',
    decimals: 18
  },
  weth: {
    chainId: CHAIN_ID,
    address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    icon: 'https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295'
  },
  usdr: {
    chainId: CHAIN_ID,
    address: '0x40379a439D4F6795B6fc9aa5687dB461677A2dBa',
    decimals: 9,
    symbol: 'USDR',
    name: 'Real USD',
    icon: 'https://ipfs.near.social/ipfs/bafkreieocxobsqxkoopzh26huz5zjx4j5cpljzuufuipkmiiwopmym3ave'
  },

  wbtc: {
    chainId: CHAIN_ID,
    address: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
    decimals: 8,
    symbol: 'WBTC',
    name: 'Wrapped BTC',
    icon: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744'
  },

  hny: {
    chainId: CHAIN_ID,
    address: '0x1FA2F83BA2DF61c3d370071d61B17Be01e224f3a',
    decimals: 18,
    symbol: 'HNY',
    name: 'HONEY',
    icon: 'https://assets.coingecko.com/coins/images/12895/small/hnys.png?1614100588'
  },

  pcomb: {
    chainId: CHAIN_ID,
    address: '0x37D1EbC3Af809b8fADB45DCE7077eFc629b2B5BB',
    decimals: 18,
    symbol: 'pCOMB',
    name: 'Polygon Native Comb',
    icon: 'https://polygonscan.com/token/images/1hiveofc_32.png'
  },

  mimatic: {
    chainId: CHAIN_ID,
    address: '0xa3Fa99A148fA48D14Ed51d610c367C61876997F1',
    decimals: 18,
    symbol: 'miMATIC',
    name: 'miMATIC',
    icon: 'https://assets.coingecko.com/coins/images/15264/small/mimatic-red.png?1620281018'
  },

  dai: {
    chainId: CHAIN_ID,
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    decimals: 18,
    symbol: 'Dai',
    name: 'Dai Stablecoin',
    icon: 'https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png?1687143508'
  },

  wmatic: {
    chainId: CHAIN_ID,
    address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    decimals: 18,
    symbol: 'WMATIC',
    name: 'Wrapped Matic',
    icon: 'https://assets.coingecko.com/coins/images/14073/small/matic.png?1628852392'
  },

  cash: {
    chainId: CHAIN_ID,
    address: '0x5D066D022EDE10eFa2717eD3D79f22F949F8C175',
    decimals: 18,
    symbol: 'CASH',
    name: 'CASH',
    icon: 'https://assets.coingecko.com/coins/images/27558/small/cash.png?1677063931'
  },

  wusdr: {
    chainId: CHAIN_ID,
    address: '0x00e8c0E92eB3Ad88189E7125Ec8825eDc03Ab265',
    decimals: 9,
    symbol: 'wUSDR',
    name: 'Wrapped USDR',
    icon: 'https://ipfs.near.social/ipfs/bafkreidij65snn5t2w2fbdgd7pluauudbtvgemvkx2wdk7kpoi5l2fqg4y'
  },

  cvr: {
    chainId: CHAIN_ID,
    address: '0x6AE96Cc93331c19148541D4D2f31363684917092',
    decimals: 18,
    symbol: 'CVR',
    name: 'CAVIAR',
    icon: 'https://ipfs.near.social/ipfs/bafkreiae66wm5kvk523gr2ogu3zf2soggysw73kyvkw2poaq6nicuttbxq'
  },

  pearl: {
    chainId: CHAIN_ID,
    address: '0x7238390d5f6F64e67c3211C343A410E2A3DEc142',
    decimals: 18,
    symbol: 'PEARL',
    name: 'Pearl',
    icon: 'https://ipfs.near.social/ipfs/bafkreieo7d2tqvpszlcvkltb6et2kmxz7n7yuw5ae5w37wzigzlht6i6zu'
  },

  usdt: {
    chainId: CHAIN_ID,
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
    icon: 'https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663'
  },

  usdc: {
    chainId: CHAIN_ID,
    address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin (PoS)',
    icon: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389'
  },

  'usdc.e': {
    chainId: CHAIN_ID,
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    decimals: 6,
    symbol: 'USDC.e',
    name: 'USD Coin (PoS)',
    icon: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389'
  },

  retro: {
    chainId: CHAIN_ID,
    address: '0xBFA35599c7AEbb0dAcE9b5aa3ca5f2a79624D8Eb',
    decimals: 18,
    symbol: 'RETRO',
    name: 'RETRO',
    icon: 'https://assets.coingecko.com/coins/images/31136/small/retro.png?1690885867'
  },

  aave: {
    chainId: CHAIN_ID,
    address: '0xD6DF932A45C0f255f85145f286eA0b292B21C90B',
    decimals: 18,
    symbol: 'AAVE',
    name: 'Aave (PoS)',
    icon: 'https://ipfs.near.social/ipfs/bafkreicmsnivbvp2xd3ewcjb5kybgnbnevbcojhn4mgub7rregnbtqcige'
  },
  // quick: {
  //   chainId: CHAIN_ID,
  //   address: '0x831753dd7087cac61ab5644b308642cc1c33dc13',
  //   decimals: 18,
  //   symbol: 'QUICK',
  //   name: 'Quickswap',
  //   icon: 'https://ipfs.near.social/ipfs/bafkreic7svq723bgukivtik7lb3xujjq24s7wsxto4bfzlh235k2ejzjme',
  // },
  link: {
    chainId: CHAIN_ID,
    address: '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39',
    decimals: 18,
    symbol: 'LINK',
    name: 'ChainLink Token',
    icon: 'https://ipfs.near.social/ipfs/bafkreidrq7qk3d6epwaxobq4gk7yowljr5tnslxwrsbd7vnw3srkt7ok3u'
  },
  sushi: {
    chainId: CHAIN_ID,
    address: '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a',
    decimals: 18,
    symbol: 'SUSHI',
    name: 'SushiToken',
    icon: 'https://ipfs.near.social/ipfs/bafkreif5a3jne5ol2d57r2terziofqhosgl5txptv7q7bit42qt5jzoaqa'
  },
  crv: {
    chainId: CHAIN_ID,
    address: '0x172370d5Cd63279eFa6d502DAB29171933a610AF',
    decimals: 18,
    symbol: 'CRV',
    name: 'Token CRV (PoS)',
    icon: 'https://ipfs.near.social/ipfs/bafkreihfv7kul7d6e2fxnlpalx3p7wx47ylhw7tauozhipcughshj25ehm'
  },
  stmatic: {
    chainId: CHAIN_ID,
    address: '0x3A58a54C066FdC0f2D55FC9C89F0415C92eBf3C4',
    decimals: 18,
    symbol: 'stMATIC',
    name: 'Staked MATIC (PoS) ',
    icon: 'https://raw.githubusercontent.com/SphereDeFi/TokenBook-public/main/tokens/images/STMATIC.svg'
  },

  stg: {
    chainId: CHAIN_ID,
    address: '0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590',
    decimals: 18,
    symbol: 'STG',
    name: 'StargateToken',
    icon: 'https://ipfs.near.social/ipfs/bafkreihpf2eec4iyaamiiycrivl2p2hg6igqnc4v3n7hgriegjcw2ixwq4'
  },
  klima: {
    chainId: CHAIN_ID,
    address: '0x4e78011Ce80ee02d2c3e649Fb657E45898257815',
    decimals: 9,
    symbol: 'KLIMA',
    name: 'Klima DAO',
    icon: 'https://ipfs.near.social/ipfs/bafkreihh466aygxxwesk3kvuhbuzmx6v2wepl7bbjaxpnzycrdvu4pkxmy'
  },

  tut: {
    chainId: CHAIN_ID,
    address: '0x12a34A6759c871C4C1E8A0A42CFc97e4D7Aaf68d',
    decimals: 18,
    symbol: 'TUT',
    name: 'Tutellus token',
    icon: 'https://ipfs.near.social/ipfs/bafkreiamqc2y2ow3r4pshkxt5wtxd7alegbbm2llw2vlo3wezrlqdwjur4'
  },

  ghst: {
    chainId: CHAIN_ID,
    address: '0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7',
    decimals: 18,
    symbol: 'GHST',
    name: 'Aavegotchi GHST Token (PoS)',
    icon: 'https://ipfs.near.social/ipfs/bafkreiezuzoxasezth2ldns5ykobmvcdxqtatrxazjnhza2pe5firlpfza'
  },

  quick: {
    chainId: CHAIN_ID,
    address: '0xB5C064F955D8e7F38fE0460C556a72987494eE17',
    decimals: 18,
    symbol: 'QUICK',
    name: 'QuickSwap',
    icon: 'https://ipfs.near.social/ipfs/bafkreic7svq723bgukivtik7lb3xujjq24s7wsxto4bfzlh235k2ejzjme'
  },
  maticx: {
    chainId: CHAIN_ID,
    address: '0xfa68FB4628DFF1028CFEc22b4162FCcd0d45efb6',
    decimals: 18,
    symbol: 'MaticX',
    name: 'Liquid Staking Matic (PoS)',
    icon: 'https://ipfs.near.social/ipfs/bafkreiaeo5xyipnmmkkbkzwiptcehog52yczsm2vdehca4vgjlepmjsvce'
  },

  ichi: {
    chainId: CHAIN_ID,
    address: '0x111111517e4929D3dcbdfa7CCe55d30d4B6BC4d6',
    decimals: 18,
    symbol: 'ICHI',
    name: 'ICHI',
    icon: 'https://ipfs.near.social/ipfs/bafkreighebzdujyypybl5okn4kab5a65bscjfcdfipaqd2bi4y6pj46tpi'
  },
  rnt: {
    chainId: CHAIN_ID,
    address: '0x27Ab6E82F3458eDbC0703DB2756391B899Ce6324',
    decimals: 18,
    symbol: 'RNT',
    name: 'Reental Utility Token',
    icon: '/images/tokens/rnt.webp'
  },
  rain: {
    chainId: CHAIN_ID,
    address: '0x8E677CA17065eD74675BC27bCaBadB7Eef10A292',
    decimals: 18,
    symbol: 'RAIN',
    name: 'Rain Coin',
    icon: '/images/tokens/rain.webp'
  },
  zed: {
    chainId: CHAIN_ID,
    address: '0x5eC03C1f7fA7FF05EC476d19e34A22eDDb48ACdc',
    decimals: 18,
    symbol: 'ZED',
    name: 'ZED RUN',
    icon: '/images/tokens/zed.webp'
  },
  gddy: {
    chainId: CHAIN_ID,
    address: '0x67eB41A14C0fe5CD701FC9d5A3D6597A72F641a6',
    decimals: 18,
    symbol: 'GDDY',
    name: 'Giddy Token',
    icon: '/images/tokens/gddy.webp'
  },
  lgns: {
    chainId: CHAIN_ID,
    address: '0xeB51D9A39AD5EEF215dC0Bf39a8821ff804A0F01',
    decimals: 18,
    symbol: 'LGNS',
    name: 'Longinus',
    icon: '/images/tokens/lgns.webp'
  },
  sand: {
    chainId: CHAIN_ID,
    address: '0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683',
    decimals: 18,
    symbol: 'SAND',
    name: 'SAND',
    icon: '/images/tokens/sand.webp'
  },
  chp: {
    chainId: CHAIN_ID,
    address: '0x59B5654a17Ac44F3068b3882F298881433bB07Ef',
    decimals: 18,
    symbol: 'CHP',
    name: 'CoinPoker Chips',
    icon: '/images/tokens/chp.webp'
  },
  ocean: {
    chainId: CHAIN_ID,
    address: '0x282d8efCe846A88B159800bd4130ad77443Fa1A1',
    decimals: 18,
    symbol: 'OCEAN',
    name: 'Ocean Token',
    icon: '/images/tokens/ocean.png'
  },
  fxs: {
    chainId: CHAIN_ID,
    address: '0x1a3acf6D19267E2d3e7f898f42803e90C9219062',
    decimals: 18,
    symbol: 'FXS',
    name: 'Frax Share',
    icon: 'https://ipfs.near.social/ipfs/bafkreigk6tgcodvis2vsjga3ecfs3fh3i3h7jvi4llftts5s2oo7byxm6e'
  },
  snx: {
    chainId: CHAIN_ID,
    address: '0x50B728D8D964fd00C2d0AAD81718b71311feF68a',
    decimals: 18,
    symbol: 'SNX',
    name: 'Synthetix Network Token',
    icon: 'https://ipfs.near.social/ipfs/bafkreiblu4utwynt7ajvretbjzqtm2v7e7p2hkyyp7jamb742zkwpdzmu4'
  },
  uni: {
    chainId: CHAIN_ID,
    address: '0xb33EaAd8d922B1083446DC23f610c2567fB5180f',
    decimals: 18,
    symbol: 'UNI',
    name: 'Uniswap',
    icon: 'https://ipfs.near.social/ipfs/bafkreihcntncnhk7xxmodpn5caplocnppdia2b4kafbxtvxtkewbveqate'
  }
};
