import type { Token } from '@/types';

const CHAIN_ID = 56;
export const bsc: { [key: string]: Token } = {
  usdt: {
    chainId: CHAIN_ID,
    address: '0x55d398326f99059fF775485246999027B3197955',
    symbol: 'USDT',
    name: 'Tether USD',
    icon: '/assets/tokens/usdt.png',
    decimals: 18
  },
  usdd: {
    chainId: CHAIN_ID,
    address: '0xd17479997F34dd9156Deef8F95A52D81D265be9c',
    name: 'Decentralized USD',
    symbol: 'USDD',
    icon: '/assets/tokens/usdd.jpg',
    decimals: 18
  },
  mai: {
    chainId: CHAIN_ID,
    address: '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d',
    name: 'Mai Stablecoin',
    symbol: 'MAI',
    icon: '/assets/tokens/mai.png',
    decimals: 18
  },
  bnb: {
    chainId: CHAIN_ID,
    decimals: 18,
    symbol: 'BNB',
    name: 'BNB',
    icon: '/assets/tokens/bnb.png',
    isNative: true,
    address: 'native'
  },
  eth: {
    chainId: CHAIN_ID,
    address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    decimals: 18,
    symbol: 'ETH',
    name: 'Binance-Peg Ethereum Token',
    icon: '/assets/tokens/eth.png'
  },
  the: {
    chainId: CHAIN_ID,
    address: '0xF4C8E32EaDEC4BFe97E0F595AdD0f4450a863a11',
    decimals: 18,
    symbol: 'THE',
    name: 'THENA',
    icon: '/assets/tokens/the.webp'
  },

  livethe: {
    chainId: CHAIN_ID,
    address: '0xCdC3A010A3473c0C4b2cB03D8489D6BA387B83CD',
    decimals: 18,
    symbol: 'liveTHE',
    name: 'liveThe',
    icon: '/assets/tokens/livethe.png'
  },

  ankrbnb: {
    chainId: CHAIN_ID,
    address: '0x52F24a5e03aee338Da5fd9Df68D2b6FAe1178827',
    decimals: 18,
    symbol: 'ankrBNB',
    name: 'Ankr Staked BNB',
    icon: '/assets/tokens/ankrbnb.webp'
  },

  frxeth: {
    chainId: CHAIN_ID,
    address: '0x64048A7eEcF3a2F1BA9e144aAc3D7dB6e58F555e',
    decimals: 18,
    symbol: 'frxETH',
    name: 'Frax Ether',
    icon: '/assets/tokens/frxeth.webp'
  },

  bnbx: {
    chainId: CHAIN_ID,
    address: '0x1bdd3Cf7F79cfB8EdbB955f20ad99211551BA275',
    decimals: 18,
    symbol: 'BNBx',
    name: 'Liquid Staking BNB',
    icon: '/assets/tokens/bnbx.webp'
  },

  stkbnb: {
    chainId: CHAIN_ID,
    address: '0xc2E9d07F66A89c44062459A47a0D2Dc038E4fb16',
    decimals: 18,
    symbol: 'stkBNB',
    name: 'Staked BNB',
    icon: '/assets/tokens/stkbnb.png'
  },
  wbnb: {
    chainId: CHAIN_ID,
    address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    decimals: 18,
    symbol: 'WBNB',
    name: 'Wrapped BNB',
    icon: '/assets/tokens/bnb.png'
  },
  btcb: {
    chainId: CHAIN_ID,
    address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    decimals: 18,
    symbol: 'BTCB',
    name: 'Binance-Peg BTCB Token',
    icon: '/assets/tokens/btcb.webp'
  },
  bscusd: {
    chainId: CHAIN_ID,
    address: '0x55d398326f99059fF775485246999027B3197955',
    decimals: 18,
    symbol: 'BSC-USD',
    name: 'Binance-Peg BSC-USD',
    icon: '/assets/tokens/bscusd.webp'
  },
  usdc: {
    chainId: CHAIN_ID,
    address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    decimals: 18,
    symbol: 'USDC',
    name: 'Binance-Peg USD Coin',
    icon: '/assets/tokens/usdc.png'
  },
  busd: {
    chainId: CHAIN_ID,
    address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    decimals: 18,
    symbol: 'BUSD',
    name: 'Binance-Peg BUSD Token',
    icon: '/assets/tokens/busd.webp'
  },
  tusd: {
    chainId: CHAIN_ID,
    address: '0x40af3827F39D0EAcBF4A168f8D4ee67c121D11c9',
    decimals: 18,
    symbol: 'TUSD',
    name: 'TrueUSD',
    icon: '/assets/tokens/tusd.svg'
  },
  bsw: {
    chainId: CHAIN_ID,
    address: '0x965F527D9159dCe6288a2219DB51fc6Eef120dD1',
    decimals: 18,
    symbol: 'BSW',
    name: 'Biswap',
    icon: '/assets/tokens/bsw.webp'
  },
  banana: {
    chainId: CHAIN_ID,
    address: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95',
    decimals: 18,
    symbol: 'BANANA',
    name: 'ApeSwapFinance Banana',
    icon: '/assets/tokens/banana.webp'
  },
  chrp: {
    chainId: CHAIN_ID,
    address: '0xeD00Fc7D48B57B81FE65D1cE71c0985e4CF442CB',
    decimals: 18,
    symbol: 'CHRP',
    name: 'Chirpley Token',
    icon: '/assets/tokens/chrp.webp'
  },
  ceek: {
    chainId: CHAIN_ID,
    address: '0xe0F94Ac5462997D2BC57287Ac3a3aE4C31345D66',
    decimals: 18,
    symbol: 'CEEK',
    name: 'CEEK',
    icon: '/assets/tokens/ceek.webp'
  },
  jones: {
    chainId: CHAIN_ID,
    address: '0x10393c20975cF177a3513071bC110f7962CD67da',
    decimals: 18,
    symbol: 'JONES',
    name: 'Jones DAO',
    icon: '/assets/tokens/jones-dao.png'
  },
  orn: {
    chainId: CHAIN_ID,
    address: '0xe4CA1F75ECA6214393fCE1C1b316C237664EaA8e',
    decimals: 8,
    symbol: 'ORN',
    name: 'Orion Protocol',
    icon: '/assets/tokens/orn.svg'
  },
  inj: {
    chainId: CHAIN_ID,
    address: '0xa2B726B1145A4773F68593CF171187d8EBe4d495',
    decimals: 18,
    symbol: 'INJ',
    name: 'Injective Protocol',
    icon: '/assets/tokens/inj.jpg'
  },
  wbeth: {
    chainId: CHAIN_ID,
    address: '0xa2E3356610840701BDf5611a53974510Ae27E2e1',
    decimals: 18,
    symbol: 'wBETH',
    name: 'Wrapped Binance Beacon ETH',
    icon: '/assets/tokens/wbeth.svg'
  },
  xrp: {
    chainId: CHAIN_ID,
    address: '0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE',
    decimals: 18,
    symbol: 'XRP',
    name: 'Binance-Peg XRP Token',
    icon: '/assets/tokens/xrp.svg'
  },
  ltc: {
    chainId: CHAIN_ID,
    address: '0x4338665CBB7B2485A8855A139b75D5e34AB0DB94',
    decimals: 18,
    symbol: 'LTC',
    name: 'Binance-Peg Litecoin Token',
    icon: '/assets/tokens/ltc.svg'
  },
  link: {
    chainId: CHAIN_ID,
    address: '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD',
    decimals: 18,
    symbol: 'LINK',
    name: 'Binance-Peg ChainLink Token',
    icon: '/assets/tokens/link.svg'
  },
  ada: {
    chainId: CHAIN_ID,
    address: '0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47',
    decimals: 18,
    symbol: 'ADA',
    name: 'Binance-Peg Cardano Token',
    icon: '/assets/tokens/ada.svg'
  },
  cake: {
    chainId: CHAIN_ID,
    address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    decimals: 18,
    symbol: 'CAKE',
    name: 'PancakeSwap Token',
    icon: '/assets/tokens/cake.svg'
  },
  rdnt: {
    chainId: CHAIN_ID,
    address: '0x3082CC23568eA640225c2467653dB90e9250AaA0',
    decimals: 18,
    symbol: 'RDNT',
    name: 'Radiant',
    icon: '/assets/tokens/rdnt.png'
  },
  dai: {
    chainId: CHAIN_ID,
    address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
    decimals: 18,
    symbol: 'DAI',
    name: 'Binance-Peg Dai Token',
    icon: '/assets/tokens/dai.png'
  },
  dot: {
    chainId: CHAIN_ID,
    address: '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
    decimals: 18,
    symbol: 'DOT',
    name: 'Binance-Peg Polkadot Token',
    icon: '/assets/tokens/dot.png'
  },
  atom: {
    chainId: CHAIN_ID,
    address: '0x0eb3a705fc54725037cc9e008bdede697f62f335',
    decimals: 18,
    symbol: 'ATOM',
    name: 'Binance-Peg Cosmos Token',
    icon: '/assets/tokens/atom.svg'
  },
  usx: {
    chainId: CHAIN_ID,
    address: '0xB5102CeE1528Ce2C760893034A4603663495fD72',
    decimals: 18,
    symbol: 'USX',
    name: 'dForce USD',
    icon: '/assets/tokens/usx.svg'
  },
  tatom: {
    chainId: CHAIN_ID,
    address: '0xa422885120A6e6beA36949737165D681759Bb5bb',
    decimals: 18,
    symbol: 'tATOM',
    name: 'tATOM',
    icon: '/assets/tokens/tatom.svg'
  },
  xtz: {
    chainId: CHAIN_ID,
    address: '0x16939ef78684453bfdfb47825f8a5f714f12623a',
    decimals: 18,
    symbol: 'XTZ',
    name: 'Binance-Peg Tezos Token',
    icon: '/assets/tokens/xtz.svg'
  },
  rbnb: {
    chainId: CHAIN_ID,
    address: '0xF027E525D491ef6ffCC478555FBb3CFabB3406a6',
    decimals: 18,
    symbol: 'rBNB',
    name: 'StaFi rBNB',
    icon: '/assets/tokens/rbnb.svg'
  },
  ratom: {
    chainId: CHAIN_ID,
    address: '0x1e5f6d5355ae5f1c5c687d3041c55f0aeec57eab',
    decimals: 18,
    symbol: 'rATOM',
    name: 'StaFi rATOM',
    icon: '/assets/tokens/ratom.svg'
  },
  xvs: {
    chainId: CHAIN_ID,
    address: '0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63',
    decimals: 18,
    symbol: 'XVS',
    name: 'Venus',
    icon: '/assets/tokens/xvs.svg'
  },
  valas: {
    chainId: CHAIN_ID,
    address: '0xB1EbdD56729940089Ecc3aD0BBEEB12b6842ea6F',
    decimals: 18,
    symbol: 'VALAS',
    name: 'Valas Finance Protocol Token',
    icon: '/assets/tokens/valas.svg'
  },
  wsteth: {
    chainId: CHAIN_ID,
    address: '0x26c5e01524d2E6280A48F2c50fF6De7e52E9611C',
    decimals: 18,
    symbol: 'wstETH',
    name: 'Wrapped liquid staked Ether 2.0',
    icon: '/assets/tokens/wsteth.png'
  },
  ftm: {
    chainId: CHAIN_ID,
    address: '0xAD29AbB318791D579433D831ed122aFeAf29dcfe',
    decimals: 18,
    symbol: 'FTM',
    name: 'Fantom',
    icon: '/assets/tokens/ftm.webp'
  },
  weeth: {
    chainId: CHAIN_ID,
    address: '0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A',
    decimals: 18,
    symbol: 'weETH',
    name: 'Wrapped eETH',
    icon: '/assets/tokens/weeth.png'
  },
  'ankr-eth': {
    chainId: CHAIN_ID,
    address: '0xe05A08226c49b636ACf99c40Da8DC6aF83CE5bB3',
    decimals: 18,
    symbol: 'ankrETH',
    name: 'Ankr Staked ETH',
    icon: '/assets/tokens/ankrETH.png'
  },
  matic: {
    chainId: CHAIN_ID,
    address: '0xCC42724C6683B7E57334c4E856f4c9965ED682bD',
    decimals: 18,
    symbol: 'MATIC',
    name: 'Matic Token',
    icon: '/assets/tokens/matic.webp'
  },
  bfg: {
    chainId: CHAIN_ID,
    address: '0xBb46693eBbEa1aC2070E59B4D043b47e2e095f86',
    decimals: 18,
    symbol: 'BFG',
    name: 'BFG Token',
    icon: '/assets/tokens/bfg.svg'
  },
  sfp: {
    chainId: CHAIN_ID,
    address: '0xD41FDb03Ba84762dD66a0af1a6C8540FF1ba5dfb',
    decimals: 18,
    symbol: 'SFP',
    name: 'SafePal Token',
    icon: '/assets/tokens/sfp.svg'
  },
  floki: {
    chainId: CHAIN_ID,
    address: '0xfb5B838b6cfEEdC2873aB27866079AC55363D37E',
    decimals: 9,
    symbol: 'FLOKI',
    name: 'FLOKI',
    icon: '/assets/tokens/floki.svg'
  },
  btc: {
    chainId: CHAIN_ID,
    address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    decimals: 18,
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: '/assets/tokens/btcb.webp'
  },
  coti: {
    chainId: CHAIN_ID,
    address: '0xAdBAF88B39D37Dc68775eD1541F1bf83A5A45feB',
    decimals: 18,
    symbol: 'COTI',
    name: 'COTI',
    icon: '/assets/tokens/coti.svg'
  },
  egld: {
    chainId: CHAIN_ID,
    address: '0xbF7c81FFF98BbE61B40Ed186e4AfD6DDd01337fe',
    decimals: 18,
    symbol: 'EGLD',
    name: 'Elrond',
    icon: '/assets/tokens/egld.svg'
  },
  abond: {
    address: '0x34294AfABCbaFfc616ac6614F6d2e17260b78BEd',
    chainId: CHAIN_ID,
    symbol: 'ABOND',
    decimals: 18,
    name: 'ApeBond',
    icon: '/assets/tokens/abond.svg'
  },
  slisBNB: {
    address: '0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B',
    chainId: CHAIN_ID,
    symbol: 'slisBNB',
    decimals: 18,
    name: 'Staked Lista BNB',
    icon: '/assets/tokens/slisBNB.png'
  }
};
