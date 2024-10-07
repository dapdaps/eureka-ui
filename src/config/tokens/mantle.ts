import type { Token } from '@/types';

const CHAIN_ID = 5000;
export const mantle: { [key: string]: Token } = {
  mnt: {
    chainId: CHAIN_ID,
    name: 'MNT',
    symbol: 'MNT',
    icon: '/assets/tokens/mnt.png',
    decimals: 18,
    isNative: true,
    address: 'native'
  },
  weth: {
    address: '0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111',
    chainId: CHAIN_ID,
    symbol: 'WETH',
    decimals: 18,
    name: 'Wrapped Ether',
    icon: '/assets/tokens/weth.png'
  },
  usdc: {
    address: '0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9',
    chainId: CHAIN_ID,
    symbol: 'USDC',
    decimals: 6,
    name: 'USD Coin',
    icon: '/assets/tokens/usdc.png'
  },

  usdt: {
    address: '0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE',
    chainId: CHAIN_ID,
    symbol: 'USDT',
    decimals: 6,
    name: 'Tether USD',
    icon: '/assets/tokens/usdt.png'
  },

  wbtc: {
    address: '0xCAbAE6f6Ea1ecaB08Ad02fE02ce9A44F09aebfA2',
    chainId: CHAIN_ID,
    symbol: 'WBTC',
    decimals: 8,
    name: 'Wrapped BTC',
    icon: '/assets/tokens/wbtc.png'
  },

  dai: {
    address: '0xAfAF32C57659BC9992b43bc6840A9d997632a0F5',
    chainId: CHAIN_ID,
    symbol: 'DAI',
    decimals: 18,
    name: 'Dai Stablecoin',
    icon: '/assets/tokens/dai.png'
  },
  wmnt: {
    address: '0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8',
    chainId: CHAIN_ID,
    decimals: 18,
    symbol: 'WMNT',
    name: 'Wrapped Mantle',
    icon: '/assets/tokens/mnt.png'
  },
  lend: {
    chainId: CHAIN_ID,
    address: '0x25356aeca4210ef7553140edb9b8026089e49396',
    decimals: 18,
    symbol: 'LEND',
    name: 'Lendle Protocol Token',
    icon: '/assets/tokens/lend.png'
  },
  moe: {
    chainId: CHAIN_ID,
    address: '0x4515A45337F461A11Ff0FE8aBF3c606AE5dC00c9',
    decimals: 18,
    symbol: 'MOE',
    name: 'Moe Token',
    icon: '/assets/tokens/moe.png'
  },
  lusd: {
    chainId: CHAIN_ID,
    address: '0xf93a85d53e4af0d62bdf3a83ccfc1ecf3eaf9f32',
    name: 'LUSD Stablecoin',
    symbol: 'LUSD',
    icon: '/assets/tokens/lusd.png',
    decimals: 18
  },
  cleo: {
    chainId: CHAIN_ID,
    address: '0xC1E0C8C30F251A07a894609616580ad2CEb547F2',
    name: 'Cleopatra',
    symbol: 'CLEO',
    icon: '/assets/tokens/cleo.svg',
    decimals: 18
  },
  mvm: {
    chainId: CHAIN_ID,
    address: '0x861A6Fc736Cbb12ad57477B535B829239c8347d7',
    name: 'VelociMantle',
    symbol: 'MVM',
    icon: '/assets/tokens/bvm.webp',
    decimals: 18
  },
  axlETH: {
    chainId: CHAIN_ID,
    address: '0xb829b68f57CC546dA7E5806A929e53bE32a4625D',
    name: 'Axelar Wrapped ETH',
    symbol: 'axlETH',
    icon: '/assets/tokens/axleth.png',
    decimals: 18
  },
  meth: {
    chainId: CHAIN_ID,
    address: '0xcDA86A272531e8640cD7F1a92c01839911B90bb0',
    name: 'mETH',
    symbol: 'mETH',
    icon: '/assets/tokens/meth.png',
    decimals: 18
  },
  fbtc: {
    chainId: CHAIN_ID,
    address: '0xC96dE26018A54D51c097160568752c4E3BD6C364',
    name: 'Fire Bitcoin',
    symbol: 'FBTC',
    icon: 'https://ipfs.near.social/ipfs/bafkreiaq2jz526isky7iipkzz4j43esghbu3r3tj746picv66nhmsookj4',
    decimals: 8
  },
  usdy: {
    chainId: CHAIN_ID,
    address: '0x5bE26527e817998A7206475496fDE1E68957c5A6',
    name: 'Ondo U.S. Dollar Yield',
    symbol: 'USDY',
    icon: '/assets/tokens/usdy.png',
    decimals: 18
  },
  ausd: {
    chainId: CHAIN_ID,
    address: '0xd2b4c9b0d70e3da1fbdd98f469bd02e77e12fc79',
    name: 'Aurelius USD',
    symbol: 'aUSD',
    icon: '/assets/tokens/ausd.webp',
    decimals: 18
  },
  izi: {
    chainId: CHAIN_ID,
    name: 'iZUMi Token',
    symbol: 'iZi',
    icon: '/assets/tokens/izi.png',
    decimals: 18,
    address: '0x60d01ec2d5e98ac51c8b4cf84dfcce98d527c747'
  },
  axlusdc: {
    chainId: CHAIN_ID,
    address: '0xEB466342C4d449BC9f53A865D5Cb90586f405215',
    decimals: 6,
    symbol: 'axlUSDC',
    name: 'Axelar Wrapped USDC',
    icon: '/assets/tokens/usdc.png'
  },
  minu: {
    chainId: CHAIN_ID,
    address: '0x51cfe5b1E764dC253F4c8C1f19a081fF4C3517eD',
    decimals: 18,
    symbol: 'MINU',
    name: 'Mantle Inu Token',
    icon: '/assets/tokens/minu.png'
  },
  minty: {
    chainId: CHAIN_ID,
    address: '0x5eCDB76feda945DC71F7D9ce62dFe7EaFEfFFAb4',
    name: 'Minterest',
    symbol: 'MINTY',
    icon: '/assets/tokens/minterest.png',
    decimals: 18
  }
};
