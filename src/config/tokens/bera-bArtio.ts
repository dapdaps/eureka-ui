import type { Token } from '@/types';

const CHAIN_ID = 80084;

export const beraB: { [key: string]: Token } = {
  bera: {
    address: 'native',
    isNative: true,
    chainId: CHAIN_ID,
    symbol: 'BERA',
    decimals: 18,
    name: 'BERA',
    icon: '/images/tokens/bera.png'
  },
  wbera: {
    address: '0x7507c1dc16935B82698e4C63f2746A2fCf994dF8',
    chainId: CHAIN_ID,
    symbol: 'WBERA',
    decimals: 18,
    name: 'WBERA',
    icon: '/images/tokens/wbera.png'
  },
  honey: {
    address: '0x0E4aaF1351de4c0264C5c7056Ef3777b41BD8e03',
    chainId: CHAIN_ID,
    symbol: 'HONEY',
    decimals: 18,
    name: 'HONEY',
    icon: '/images/tokens/honey.png'
  },
  usdt: {
    chainId: CHAIN_ID,
    address: '0x05D0dD5135E3eF3aDE32a9eF9Cb06e8D37A6795D',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
    icon: 'https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i'
  },
  usdc: {
    chainId: CHAIN_ID,
    address: '0xd6D83aF58a19Cd14eF3CF6fe848C9A4d21e5727c',
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin',
    icon: 'https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla'
  },
  dai: {
    chainId: CHAIN_ID,
    address: '0x806Ef538b228844c73E8E692ADCFa8Eb2fCF729c',
    decimals: 18,
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    icon: 'https://ipfs.near.social/ipfs/bafkreieuxntkdzi2mzkzdcbk6kahwxqpftxnipxcwc4oe4p4jm2rhj2xhu'
  },
  wbtc: {
    chainId: CHAIN_ID,
    address: '0x2577D24a26f8FA19c1058a8b0106E2c7303454a4',
    decimals: 8,
    symbol: 'WBTC',
    name: 'Wrapped BTC',
    icon: 'https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q'
  },
  weth: {
    chainId: CHAIN_ID,
    address: '0xE28AfD8c634946833e89ee3F122C06d7C537E8A8',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    icon: 'https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4'
  },
  eth: {
    chainId: CHAIN_ID,
    address: '0x6e1e9896e93f7a71ecb33d4386b49deed67a231a',
    decimals: 18,
    symbol: 'ETH',
    name: 'Ethereum',
    icon: 'https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq'
  }
};
