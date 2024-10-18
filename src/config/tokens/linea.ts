import type { Token } from '@/types';

const CHAIN_ID = 59144;
export const linea: { [key: string]: Token } = {
  eth: {
    chainId: CHAIN_ID,
    name: 'ETH',
    symbol: 'ETH',
    icon: '/assets/tokens/eth.png',
    decimals: 18,
    isNative: true,
    address: 'native'
  },
  weth: {
    chainId: CHAIN_ID,
    address: '0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    icon: '/assets/tokens/weth.png'
  },
  axlusdc: {
    chainId: CHAIN_ID,
    address: '0xEB466342C4d449BC9f53A865D5Cb90586f405215',
    decimals: 6,
    symbol: 'axlUSDC',
    name: 'Axelar Wrapped USDC',
    icon: '/assets/tokens/usdc.png'
  },
  axlusdt: {
    chainId: CHAIN_ID,
    address: '0x7f5373AE26c3E8FfC4c77b7255DF7eC1A9aF52a6',
    decimals: 6,
    symbol: 'axlUSDT',
    name: 'Axelar Wrapped USDT',
    icon: '/assets/tokens/usdt.png'
  },
  hzn: {
    chainId: CHAIN_ID,
    address: '0x0B1A02A7309dFbfAD1Cd4adC096582C87e8A3Ac1',
    decimals: 18,
    symbol: 'HZN',
    name: 'Horizon',
    icon: '/assets/tokens/hzn.webp'
  },
  usdc: {
    chainId: CHAIN_ID,
    address: '0x176211869cA2b568f2A7D4EE941E073a821EE1ff',
    decimals: 6,
    symbol: 'USDC',
    name: 'USDC.e',
    icon: '/assets/tokens/usdc.png'
  },
  busd: {
    chainId: CHAIN_ID,
    address: '0x7d43AABC515C356145049227CeE54B608342c0ad',
    decimals: 18,
    symbol: 'BUSD',
    name: 'Binance USD',
    icon: '/assets/tokens/busd.webp'
  },
  bnb: {
    chainId: CHAIN_ID,
    address: '0xf5C6825015280CdfD0b56903F9F8B5A2233476F5',
    decimals: 18,
    symbol: 'BNB',
    name: 'Binance Coin',
    icon: '/assets/tokens/bnb.png'
  },
  usdt: {
    chainId: CHAIN_ID,
    address: '0xA219439258ca9da29E9Cc4cE5596924745e12B93',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD ',
    icon: '/assets/tokens/usdt.png'
  },
  dai: {
    chainId: CHAIN_ID,
    address: '0x4AF15ec2A0BD43Db75dd04E62FAA3B8EF36b00d5',
    decimals: 18,
    symbol: 'DAI',
    name: 'Dai Stablecoin ',
    icon: '/assets/tokens/dai.png'
  },
  matic: {
    chainId: CHAIN_ID,
    address: '0x265B25e22bcd7f10a5bD6E6410F10537Cc7567e8',
    decimals: 18,
    symbol: 'MATIC',
    name: 'Matic Token',
    icon: '/assets/tokens/matic.webp'
  },
  izi: {
    chainId: CHAIN_ID,
    address: '0x60D01EC2D5E98Ac51C8B4cF84DfCCE98D527c747',
    decimals: 18,
    symbol: 'iZi',
    name: 'izumi Token',
    icon: '/assets/tokens/izi.png'
  },
  wbtc: {
    chainId: CHAIN_ID,
    address: '0x3aAB2285ddcDdaD8edf438C1bAB47e1a9D05a9b4',
    decimals: 8,
    symbol: 'WBTC',
    name: 'Wrapped BTC',
    icon: '/assets/tokens/wbtc.png'
  },
  lab: {
    chainId: CHAIN_ID,
    address: '0xB97F21D1f2508fF5c73E7B5AF02847640B1ff75d',
    decimals: 18,
    symbol: 'LAB',
    name: 'LineaBank Token',
    icon: '/assets/tokens/lab.svg'
  },
  mendi: {
    chainId: CHAIN_ID,
    address: '0x43E8809ea748EFf3204ee01F08872F063e44065f',
    decimals: 18,
    symbol: 'MENDI',
    name: 'Mendi Finance',
    icon: '/assets/tokens/mendi.svg'
  },
  wsteth: {
    chainId: CHAIN_ID,
    address: '0xB5beDd42000b71FddE22D3eE8a79Bd49A568fC8F',
    decimals: 18,
    symbol: 'wstETH',
    name: 'Wrapped liquid staked Ether 2.0',
    icon: '/assets/tokens/wsteth.png'
  },
  cebusd: {
    chainId: CHAIN_ID,
    address: '0x7d43AABC515C356145049227CeE54B608342c0ad',
    decimals: 18,
    symbol: 'ceBUSD',
    name: 'Celer Network BUSD',
    icon: '/assets/tokens/busd.webp'
  },
  cake: {
    chainId: CHAIN_ID,
    address: '0x0D1E753a25eBda689453309112904807625bEFBe',
    decimals: 18,
    symbol: 'CAKE',
    name: 'PancakeSwap Token',
    icon: '/assets/tokens/cake.svg'
  },
  xfit: {
    chainId: CHAIN_ID,
    address: '0x8c56017b172226fe024dea197748fc1eaccc82b1',
    decimals: 18,
    symbol: 'XFIT',
    name: 'XFIT',
    icon: '/assets/tokens/xfit.webp'
  },
  mai: {
    chainId: CHAIN_ID,
    address: '0xf3b001d64c656e30a62fbaaca003b1336b4ce12a',
    decimals: 18,
    symbol: 'MAI',
    name: 'Mai Stablecoin ',
    icon: '/assets/tokens/mai.png'
  },
  grai: {
    chainId: CHAIN_ID,
    address: '0x894134a25a5faC1c2C26F1d8fBf05111a3CB9487',
    decimals: 18,
    symbol: 'GRAI',
    name: 'Gravita Debt Token',
    icon: '/assets/tokens/grai.svg'
  },
  wrseth: {
    chainId: CHAIN_ID,
    address: '0xD2671165570f41BBB3B0097893300b6EB6101E6C',
    decimals: 18,
    symbol: 'wrsETH',
    name: 'rsETHWrapper',
    icon: '/assets/tokens/wrseth.svg'
  },
  rseth: {
    chainId: CHAIN_ID,
    address: '0x4186BFC76E2E237523CBC30FD220FE055156b41F',
    decimals: 18,
    symbol: 'rsETH',
    name: 'KelpDao Restaked ETH',
    icon: '/assets/tokens/rseth.svg'
  },
  lusdc: {
    chainId: CHAIN_ID,
    address: '0x4af215dbe27fc030f37f73109b85f421fab45b7a',
    decimals: 6,
    symbol: 'LUSDC',
    name: 'Ledgity USDC',
    icon: '/assets/tokens/lusd.png'
  },
  ezeth: {
    address: '0x2416092f143378750bb29b79ed961ab195cceea5',
    chainId: CHAIN_ID,
    symbol: 'ezETH',
    decimals: 18,
    name: 'Renzo Restaked ETH',
    icon: '/assets/tokens/ezeth.svg'
  },
  weeth: {
    address: '0x1bf74c010e6320bab11e2e5a532b5ac15e0b8aa6',
    chainId: CHAIN_ID,
    symbol: 'weETH',
    decimals: 18,
    name: 'Wrapped eETH',
    icon: '/assets/tokens/weeth.png'
  },
  stone: {
    address: '0x93f4d0ab6a8b4271f4a28db399b5e30612d21116',
    chainId: CHAIN_ID,
    symbol: 'STONE',
    decimals: 18,
    name: 'StakeStone Ether',
    icon: '/assets/tokens/stone.png'
  },
  foxy: {
    address: '0x5fbdf89403270a1846f5ae7d113a989f850d1566',
    chainId: CHAIN_ID,
    symbol: 'FOXY',
    decimals: 18,
    name: 'Foxy',
    icon: '/assets/tokens/foxy.png'
  },
  'solv-btc': {
    address: '0x5FFcE65A40f6d3de5332766ffF6A28BF491C868c',
    chainId: CHAIN_ID,
    symbol: 'SolvBTC.m',
    decimals: 18,
    name: 'Free Bridged SolvBTC',
    icon: '/assets/tokens/solv-btc.webp'
  },
  lynx: {
    address: '0x1a51b19CE03dbE0Cb44C1528E34a7EDD7771E9Af',
    chainId: CHAIN_ID,
    symbol: 'LYNX',
    decimals: 18,
    name: 'Lynex',
    icon: '/assets/tokens/lynx.png'
  },
  iusd: {
    address: '0x0A3BB08b3a15A19b4De82F8AcFc862606FB69A2D',
    chainId: CHAIN_ID,
    symbol: 'iUSD',
    decimals: 18,
    name: 'iZUMi Bond USD',
    icon: '/assets/tokens/iusd.svg'
  },
  'm-btc': {
    address: '0xe4D584ae9b753e549cAE66200A6475d2f00705f7',
    chainId: CHAIN_ID,
    symbol: 'M-BTC',
    decimals: 18,
    name: 'Merlin BTC',
    icon: '/assets/tokens/m-btc.svg'
  },
  'uni-eth': {
    chainId: CHAIN_ID,
    address: '0x15EEfE5B297136b8712291B632404B66A8eF4D25',
    decimals: 18,
    symbol: 'uniETH',
    name: 'Universal ETH',
    icon: '/assets/tokens/uni-eth.png'
  },
  croak: {
    chainId: CHAIN_ID,
    address: '0xacb54d07ca167934f57f829bee2cc665e1a5ebef',
    decimals: 18,
    symbol: 'CROAK',
    name: 'CROAK',
    icon: '/assets/tokens/croak.webp'
  },
  linus: {
    chainId: CHAIN_ID,
    address: '0xe07C2bdbb8C787962C2C6e93C11a152110E7E4d2',
    decimals: 18,
    symbol: 'LINUS',
    name: 'LINUS',
    icon: '/assets/tokens/linus.png'
  },
  zero: {
    chainId: CHAIN_ID,
    address: '0x78354f8dccb269a615a7e0a24f9b0718fdc3c7a7',
    decimals: 18,
    symbol: 'ZERO',
    name: 'ZeroLend',
    icon: '/assets/tokens/zero.webp'
  },
  nile: {
    chainId: CHAIN_ID,
    address: '0xAAAac83751090C6ea42379626435f805DDF54DC8',
    decimals: 18,
    symbol: 'NILE',
    name: 'NILE',
    icon: '/assets/tokens/nile.svg'
  },
  zLP: {
    chainId: CHAIN_ID,
    address: '0x0040F36784dDA0821E74BA67f86E084D70d67a3A',
    decimals: 18,
    symbol: 'zLP',
    name: 'ZERO/ETH',
    icon: ''
  }
};
