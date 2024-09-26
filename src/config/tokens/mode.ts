import type { Token } from '@/types';

const CHAIN_ID = 34443;
export const mode: { [key: string]: Token } = {
  eth: {
    chainId: CHAIN_ID,
    address: 'native',
    name: 'ETH',
    symbol: 'ETH',
    icon: 'https://ipfs.near.social/ipfs/bafkreibmo3leq3youcg4o2fxe6pjxajkz4rfee4u5qbcxrx4puebx46psy',
    decimals: 18,
    isNative: true
  },
  weth: {
    chainId: CHAIN_ID,
    address: '0x4200000000000000000000000000000000000006',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    icon: '/assets/tokens/weth.png'
  },
  usdt: {
    chainId: CHAIN_ID,
    address: '0xf0F161fDA2712DB8b566946122a5af183995e2eD',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD ',
    icon: '/assets/tokens/usdt.png'
  },
  usdc: {
    chainId: CHAIN_ID,
    address: '0xd988097fb8612cc24eeC14542bC03424c656005f',
    decimals: 6,
    symbol: 'USDC',
    name: 'USDC',
    icon: '/assets/tokens/lusd.png'
  },
  ezeth: {
    address: '0x2416092f143378750bb29b79eD961ab195CcEea5',
    chainId: CHAIN_ID,
    symbol: 'ezETH',
    decimals: 18,
    name: 'Renzo Restaked ETH',
    icon: '/assets/tokens/ezeth.svg'
  },
  'm-btc': {
    address: '0x59889b7021243dB5B1e065385F918316cD90D46c',
    chainId: CHAIN_ID,
    symbol: 'M-BTC',
    decimals: 18,
    name: 'Merlin BTC',
    icon: '/assets/tokens/m-btc.svg'
  },
  'we-eth': {
    address: '0x028227c4dd1e5419d11Bb6fa6e661920c519D4F5',
    chainId: CHAIN_ID,
    symbol: 'weETH',
    decimals: 18,
    name: 'Wrapped eETH',
    icon: '/assets/tokens/weeth.png'
  },
  'we-eth.mode': {
    address: '0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A',
    chainId: CHAIN_ID,
    symbol: 'weETH.mode',
    decimals: 18,
    name: 'Wrapped eETH',
    icon: '/assets/tokens/weeth.png'
  },
  'ankr-eth': {
    address: '0x12D8CE035c5DE3Ce39B1fDD4C1d5a745EAbA3b8C',
    chainId: CHAIN_ID,
    symbol: 'ankrETH',
    decimals: 18,
    name: 'Ankr Staked ETH',
    icon: '/assets/tokens/ankrETH.png'
  },
  dai: {
    chainId: CHAIN_ID,
    address: '0xe7798f023fc62146e8aa1b36da45fb70855a77ea',
    decimals: 18,
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    icon: '/assets/tokens/dai.png'
  },
  smd: {
    chainId: CHAIN_ID,
    address: '0xfda619b6d20975be80a10332cd39b9a4b0faa8bb',
    decimals: 18,
    symbol: 'SMD',
    name: 'Swap Mode',
    icon: 'https://ipfs.near.social/ipfs/bafkreidos7g5c4y4cplsamp2rry6a5x3kn5cxbyc734lrevbm4ron35nfa'
  },
  mochad: {
    chainId: CHAIN_ID,
    address: '0xcda802a5bffaa02b842651266969a5bba0c66d3e',
    decimals: 18,
    symbol: 'MOCHAD',
    name: 'MoChadCoin',
    icon: 'https://ipfs.near.social/ipfs/bafkreiezw2pp2yptuajshiqfxxeqrw3vgkjt6xi2jx62cqb53chlnup6h4'
  },
  wbtc: {
    chainId: CHAIN_ID,
    address: '0xcdd475325d6f564d27247d1dddbb0dac6fa0a5cf',
    decimals: 8,
    symbol: 'WBTC',
    name: 'Wrapped BTC',
    icon: '/assets/tokens/wbtc.png'
  },
  modi: {
    chainId: CHAIN_ID,
    address: '0x598f9cb99bafc8346b4c153a61b3a27c8f13b10f',
    decimals: 18,
    symbol: 'MODI',
    name: 'Modie',
    icon: 'https://ipfs.near.social/ipfs/bafkreiemajqfppspgsp3aqpg7rmgex672idgamyqrrcs6t7ut7t2uqrhia'
  },
  stone: {
    chainId: CHAIN_ID,
    address: '0x80137510979822322193fc997d400d5a6c747bf7',
    decimals: 18,
    symbol: 'STONE',
    name: 'StakeStone Ether',
    icon: 'https://ipfs.near.social/ipfs/bafkreih3upiejskutko5ochkysbzuihf4t7ngopshrdefi3zjknmnmou6i'
  },
  lab: {
    chainId: CHAIN_ID,
    address: '0xFE67e16313f4B38743a153f74D5762F7C83e59aE',
    decimals: 18,
    symbol: 'LAB',
    name: 'LineaBank Token',
    icon: '/assets/tokens/lab.svg'
  },
  kim: {
    chainId: CHAIN_ID,
    address: '0x6863fb62Ed27A9DdF458105B507C15b5d741d62e',
    decimals: 18,
    symbol: 'KIM',
    name: 'KIM',
    icon: 'https://ipfs.near.social/ipfs/bafkreidiekbdac2oxzv3wue537e22wi7hvb62wqwp3tkmy3oquolbsedf4'
  },
  rseth: {
    chainId: CHAIN_ID,
    address: '0x4186BFC76E2E237523CBC30FD220FE055156b41F',
    decimals: 18,
    symbol: 'rsETH',
    name: 'KelpDao Restaked ETH',
    icon: '/assets/tokens/rseth.svg'
  },
  wrseth: {
    address: '0xe7903B1F75C534Dd8159b313d92cDCfbC62cB3Cd',
    chainId: CHAIN_ID,
    symbol: 'wrsETH',
    decimals: 18,
    name: 'rsETHWrapper',
    icon: '/assets/tokens/wrseth.svg'
  },
  mode: {
    address: '0xDfc7C877a950e49D2610114102175A06C2e3167a',
    chainId: CHAIN_ID,
    symbol: 'MODE',
    decimals: 18,
    name: 'MODE',
    icon: 'https://ipfs.near.social/ipfs/bafkreihyh7mw7dieuobllbdpzs2irqadepophuc764rtdxbwdn36csz5ei'
  },
  iusd: {
    address: '0xA70266C8F8Cf33647dcFEE763961aFf418D9E1E4',
    chainId: CHAIN_ID,
    symbol: 'iUSD',
    decimals: 18,
    name: 'Ironclad USD',
    icon: '/assets/tokens/iusd.svg'
  },
  djump: {
    address: '0xb9dF4BD9d3103cF1FB184BF5e6b54Cf55de81747',
    chainId: CHAIN_ID,
    symbol: 'DJUMP',
    decimals: 18,
    name: 'Degen Jmp',
    icon: 'https://ipfs.near.social/ipfs/bafybeic2jxrjhyqvg257y76sudgjs5ysikfdip6o35rw5kxegf7mnf65um'
  },
  'px-eth': {
    address: '0x9E0d7D79735e1c63333128149c7b616a0dC0bBDb',
    chainId: CHAIN_ID,
    symbol: 'pxETH',
    decimals: 18,
    name: 'Pirex Ether OT',
    icon: 'https://ipfs.near.social/ipfs/bafkreie2h2na72r7wtoea4lcaooq37abhqed4p2tc6zps7rviyyank27wq'
  },
  ionx: {
    address: '0x77E7bcfeE826b12cD498Faa9831d7055b7478272',
    chainId: CHAIN_ID,
    symbol: 'IONX',
    decimals: 18,
    name: 'Charged Particles - IONX',
    icon: 'https://ipfs.near.social/ipfs/bafkreiapb6sl4xwdemmtnul7dp2nbqhnjxuaa6jhcvpon3fhf725akj4oi'
  },
  peas: {
    address: '0x02f92800F57BCD74066F5709F1Daa1A4302Df875',
    chainId: CHAIN_ID,
    symbol: 'PEAS',
    decimals: 18,
    name: 'Peapods',
    icon: '/assets/tokens/peas.webp'
  }
};
