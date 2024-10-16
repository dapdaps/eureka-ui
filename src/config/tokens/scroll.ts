import type { Token } from '@/types';

export const CHAIN_ID = 534352;

export const scroll: { [key: string]: Token } = {
  eth: {
    address: 'native',
    isNative: true,
    chainId: CHAIN_ID,
    symbol: 'ETH',
    decimals: 18,
    name: 'Ether',
    icon: '/assets/tokens/eth.png'
  },
  usdt: {
    chainId: CHAIN_ID,
    address: '0xf55bec9cafdbe8730f096aa55dad6d22d44099df',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
    icon: '/assets/tokens/usdt.png'
  },
  weth: {
    chainId: CHAIN_ID,
    address: '0x5300000000000000000000000000000000000004',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    icon: '/assets/tokens/weth.png'
  },
  usdc: {
    chainId: CHAIN_ID,
    address: '0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4',
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin',
    icon: '/assets/tokens/usdc.png'
  },
  lusd: {
    chainId: CHAIN_ID,
    address: '0xedeabc3a1e7d21fe835ffa6f83a710c70bb1a051',
    name: 'LUSD Stablecoin',
    symbol: 'LUSD',
    icon: '/assets/tokens/lusd.png',
    decimals: 18
  },
  wbtc: {
    chainId: CHAIN_ID,
    address: '0x3c1bca5a656e69edcd0d4e36bebb3fcdaca60cf1',
    decimals: 8,
    symbol: 'WBTC',
    name: 'Wrapped BTC',
    icon: '/assets/tokens/wbtc.png'
  },
  lab: {
    chainId: CHAIN_ID,
    address: '0x2A00647F45047f05BDed961Eb8ECABc42780e604',
    decimals: 18,
    symbol: 'LAB',
    name: 'LineaBank Token',
    icon: '/assets/tokens/lab.svg'
  },
  wsteth: {
    chainId: CHAIN_ID,
    name: 'Wrapped liquid staked Ether 2.0',
    symbol: 'wstETH',
    icon: '/assets/tokens/wsteth.png',
    decimals: 18,
    address: '0xf610A9dfB7C89644979b4A0f27063E9e7d7Cda32'
  },
  sky: {
    chainId: CHAIN_ID,
    name: 'Skydrome',
    symbol: 'SKY',
    icon: '/assets/tokens/sky.png',
    decimals: 18,
    address: '0x95a52ec1d60e74cd3eb002fe54a2c74b185a4c16'
  },
  crv: {
    chainId: CHAIN_ID,
    address: '0xB755039eDc7910C1F1BD985D48322E55A31AC0bF',
    decimals: 18,
    symbol: 'CRV',
    name: 'Curve DAO Token',
    icon: '/assets/tokens/crv.png'
  },
  aave: {
    chainId: CHAIN_ID,
    address: '0x79379C0E09a41d7978f883a56246290eE9a8c4d3',
    decimals: 18,
    symbol: 'AAVE',
    name: 'Aave Token',
    icon: '/assets/tokens/aave.svg'
  },
  reth: {
    chainId: CHAIN_ID,
    address: '0x53878b874283351d26d206fa512aece1bef6c0dd',
    decimals: 18,
    symbol: 'rETH',
    name: 'Rocket Pool ETH',
    icon: '/assets/tokens/reth.png'
  },
  dai: {
    chainId: CHAIN_ID,
    address: '0xcA77eB3fEFe3725Dc33bccB54eDEFc3D9f764f97',
    decimals: 18,
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    icon: '/assets/tokens/dai.png'
  },
  izi: {
    chainId: CHAIN_ID,
    address: '0x60D01EC2D5E98Ac51C8B4cF84DfCCE98D527c747',
    decimals: 18,
    symbol: 'iZi',
    name: 'izumi Token',
    icon: '/assets/tokens/izi.png'
  },
  dodo: {
    chainId: CHAIN_ID,
    address: '0x912aB742e1ab30ffa87038C425F9Bc8ED12B3EF4',
    decimals: 18,
    symbol: 'DODO',
    name: 'DODO bird',
    icon: '/assets/tokens/dodo.webp'
  },
  pxeth: {
    chainId: CHAIN_ID,
    address: '0x9E0d7D79735e1c63333128149c7b616a0dC0bBDb',
    decimals: 18,
    symbol: 'pxETH',
    name: 'Pirex Ether OFT',
    icon: '/assets/tokens/pxeth.png'
  },
  wrseth: {
    chainId: CHAIN_ID,
    address: '0xa25b25548b4c98b0c7d3d27dca5d5ca743d68b7f',
    decimals: 18,
    symbol: 'wrsETH',
    name: 'rsETHWrapper',
    icon: '/assets/tokens/wrseth.svg'
  },
  usde: {
    chainId: CHAIN_ID,
    address: '0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34',
    decimals: 18,
    symbol: 'USDe',
    name: 'USDe',
    icon: '/assets/tokens/usde.svg'
  },
  sUSDe: {
    chainId: CHAIN_ID,
    address: '0x211Cc4DD073734dA055fbF44a2b4667d5E5fE5d2',
    decimals: 18,
    symbol: 'sUSDe',
    name: 'Staked USDe',
    icon: '/assets/tokens/sUSDe.svg'
  },
  'we-eth': {
    address: '0x01f0a31698c4d065659b9bdc21b3610292a1c506',
    chainId: CHAIN_ID,
    symbol: 'weETH',
    decimals: 18,
    name: 'Wrapped eETH',
    icon: '/assets/tokens/weeth.png'
  },
  stone: {
    chainId: CHAIN_ID,
    address: '0x80137510979822322193FC997d400D5A6C747bf7',
    decimals: 18,
    symbol: 'STONE',
    name: 'StakeStone Ether',
    icon: '/assets/tokens/stone.png'
  },
  uniETH: {
    chainId: CHAIN_ID,
    address: '0x15EEfE5B297136b8712291B632404B66A8eF4D25',
    decimals: 18,
    symbol: 'uniETH',
    name: 'Universal ETH',
    icon: '/assets/tokens/uni-eth.png'
  },
  pufETH: {
    chainId: CHAIN_ID,
    address: '0xc4d46E8402F476F269c379677C99F18E22Ea030e',
    decimals: 18,
    symbol: 'pufETH',
    name: 'PufferVault',
    icon: '/assets/tokens/puf-eth.svg'
  },
  scribes: {
    chainId: CHAIN_ID,
    address: '0x750351a9F75F98f2c2E91D4eDb3BeB14e719557E',
    decimals: 18,
    symbol: 'SCRIBES',
    name: 'SCRIBES',
    icon: '/assets/tokens/scribes.png'
  },
  sol: {
    chainId: CHAIN_ID,
    address: '0xCDf95E1F720caade4b1DC83ABfE15400D2a458AD',
    decimals: 9,
    symbol: 'SOL',
    name: 'Wrapped SOL',
    icon: '/assets/tokens/sol.svg'
  },
  sis: {
    chainId: CHAIN_ID,
    address: '0x1467b62a6ae5cdcb10a6a8173cfe187dd2c5a136',
    decimals: 18,
    symbol: 'SIS',
    name: 'Symbiosis',
    icon: '/assets/tokens/sis.png'
  },
  itp: {
    chainId: CHAIN_ID,
    address: '0x2b1d36f5b61addaf7da7ebbd11b35fd8cfb0de31',
    decimals: 18,
    symbol: 'ITP',
    name: 'Interport Token',
    icon: '/assets/tokens/itp.png'
  },
  scrolly: {
    chainId: CHAIN_ID,
    address: '0xb65aD8d81d1E4Cb2975352338805AF6e39BA8Be8',
    decimals: 18,
    symbol: 'SCROLLY',
    name: 'Scrolly The Map',
    icon: '/assets/tokens/scrolly.png'
  },
  cat: {
    chainId: CHAIN_ID,
    address: '0xdd6a49995ad38Fe7409B5d5Cb5539261Bd1bC901',
    decimals: 18,
    symbol: 'CAT',
    name: 'Danjuan Cat',
    icon: '/assets/tokens/cat.png'
  },
  iusd: {
    address: '0x0A3BB08b3a15A19b4De82F8AcFc862606FB69A2D',
    chainId: CHAIN_ID,
    symbol: 'iUSD',
    decimals: 18,
    name: 'iZUMi Bond USD',
    icon: '/assets/tokens/iusd.svg'
  },
  kala: {
    address: '0x1f4F171676f8cb3B1C3FD38867B3B160679F934A',
    chainId: CHAIN_ID,
    symbol: 'KALA',
    decimals: 18,
    name: 'Kalax',
    icon: '/assets/tokens/kala.png'
  },
  panda: {
    address: '0x61a9cC561b6c1F9C31bcDeb447aFeCf25f33Bbf9',
    chainId: CHAIN_ID,
    symbol: 'PANDA',
    decimals: 18,
    name: 'PANDA',
    icon: '/assets/tokens/panda.png'
  },
  neth: {
    address: '0x4392753d228Ec9b7F93dcE7D27905e33c3bd1eCB',
    chainId: CHAIN_ID,
    symbol: 'nETH',
    decimals: 18,
    name: 'nETH',
    icon: '/assets/tokens/default_icon.png'
  },
  based: {
    address: '0x14794e06ff5F6c88FB83Ad174A957241f8f78FC8',
    chainId: CHAIN_ID,
    symbol: 'BASED',
    decimals: 18,
    name: 'BASED',
    icon: '/assets/tokens/default_icon.png'
  },
  bald: {
    chainId: CHAIN_ID,
    address: '0x258A79F76DbB98e29ad3121f02c4C8469dE03F60',
    decimals: 18,
    symbol: 'BALD',
    name: 'Bald',
    icon: '/assets/tokens/bald.png'
  },
  eggroll: {
    address: '0x3275FA3A5e244a17b16A9867eBf5e0F9E5d9fcd0',
    chainId: CHAIN_ID,
    symbol: 'EGGROLL',
    decimals: 18,
    name: 'EGGROLL',
    icon: '/assets/tokens/default_icon.png'
  },
  axlusdc: {
    address: '0xEB466342C4d449BC9f53A865D5Cb90586f405215',
    chainId: CHAIN_ID,
    symbol: 'axlUSDC',
    decimals: 6,
    name: 'Axelar Wrapped USDC',
    icon: '/assets/tokens/usdc.png'
  },
  axlfrax: {
    address: '0x406Cde76a3fD20e48bc1E0F60651e60Ae204B040',
    chainId: CHAIN_ID,
    symbol: 'axlFRAX',
    decimals: 18,
    name: 'Axelar Wrapped FRAX',
    icon: '/assets/tokens/frax.webp'
  },
  frxeth: {
    chainId: CHAIN_ID,
    address: '0xEcc68d0451E20292406967Fe7C04280E5238Ac7D',
    decimals: 18,
    symbol: 'frxETH',
    name: 'Frax Ether',
    icon: '/assets/tokens/frxeth.webp'
  },
  rlc: {
    address: '0x44f96348916c0769ff738d916EB481F71Ccfd18B',
    chainId: CHAIN_ID,
    symbol: 'RLC',
    decimals: 18,
    name: 'Relic',
    icon: '/assets/tokens/default_icon.png'
  },
  toazu: {
    address: '0xb7E0BB834E012432A6676603f34C691ff3c228e3',
    chainId: CHAIN_ID,
    symbol: 'ToaZu',
    decimals: 18,
    name: 'ToaZu Coin',
    icon: '/assets/tokens/default_icon.png'
  },
  rock: {
    address: '0xCE3CfE8781E6dD5EE185d63100236743469acfA1',
    chainId: CHAIN_ID,
    symbol: 'ROCK',
    decimals: 18,
    name: 'Rock Scroll',
    icon: '/assets/tokens/rock.png'
  },
  IZI: {
    address: '0x9acE0E3bb92948647D91CaF5406c402f37A62686',
    chainId: CHAIN_ID,
    symbol: 'IZI',
    decimals: 18,
    name: 'IZI',
    icon: '/assets/tokens/default_icon.png'
  },
  soi: {
    address: '0xe795F59D3556285454bd00Cabc35682dc8455Fc2',
    chainId: CHAIN_ID,
    symbol: 'SOI',
    decimals: 18,
    name: 'ScrollObamaInu',
    icon: '/assets/tokens/default_icon.png'
  },
  mvx: {
    address: '0x0018D96C579121a94307249d47F053E2D687b5e7',
    chainId: CHAIN_ID,
    symbol: 'MVX',
    decimals: 18,
    name: 'Metavault Trade',
    icon: '/assets/tokens/mvx.webp'
  }
};
