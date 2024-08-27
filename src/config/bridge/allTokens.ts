import { arbitrum } from '@/config/tokens/arbitrum' 
import { avalanche } from '@/config/tokens/avalanche' 
import { base } from '@/config/tokens/base' 
import { blast } from '@/config/tokens/blast'
import { bsc } from '@/config/tokens/bsc'
import { ethereum } from '@/config/tokens/ethereum'
import { gnosis } from '@/config/tokens/gnosis'
import { linea } from '@/config/tokens/linea'
import { manta } from '@/config/tokens/manta'
import { mantle } from '@/config/tokens/mantle'
import { metis } from '@/config/tokens/metis'
import { mode } from '@/config/tokens/mode'
import { optimism } from '@/config/tokens/optimism'
import { polygon } from '@/config/tokens/polygon'
import { polygonZkevm } from '@/config/tokens/polygonZkevm'
import { scroll } from '@/config/tokens/scroll'
import { zkSync } from '@/config/tokens/zkSync'
import type { Token } from '@/types';

const mapFn = (item: Token) => {
  if (item.address === 'native') {
    return {
      ...item,
      address: '0x0000000000000000000000000000000000000000'
    }
  }
  return item
}

const allTokens: { [key: number]: Token[] } = {
    42161: Object.values(arbitrum).map(mapFn),
    43114: Object.values(avalanche).map(mapFn),
    8453: Object.values(base).map(mapFn),
    56: Object.values(bsc).map(mapFn).filter(item => {
      return item.symbol !== 'RDNT' && item.symbol !== 'JONES'
    }),
    1: Object.values(ethereum).map(mapFn),
    100: Object.values(gnosis).map(mapFn),
    59144: Object.values(linea).map(mapFn),
    169: Object.values(manta).map(mapFn),
    5000: Object.values(mantle).map(mapFn),
    1088: Object.values(metis).map(mapFn),
    34443: Object.values(mode).map(mapFn),
    137: Object.values(polygon).map(mapFn),
    1101: Object.values(polygonZkevm).map(mapFn),
    534352: Object.values(scroll).map(mapFn),
    324: Object.values(zkSync).map(mapFn),
    10: Object.values(optimism).map(mapFn),
    81457: Object.values(blast).map(mapFn),
    11155111: [{
        address: '0x0000000000000000000000000000000000000000',
        isNative: true,
        chainId: 11155111,
        symbol: 'ETH',
        decimals: 18,
        name: 'Ether',
        icon: 'https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq',
      }, {
        chainId: 11155111,
        address: '0x5561e620f8Be78ae6D962f8Aaa50369302eB4afF',
        decimals: 6,
        symbol: 'USDT',
        name: 'Tether USD',
        icon: 'https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i',
      }, {
      chainId: 11155111,
      address: '0x193859664CF07E331e1cE3FAe623e7E499F2a200',
      decimals: 18,
      symbol: 'WETH',
      name: 'Wrapped Ether',
      icon: 'https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4',
    }, {
      chainId: 11155111,
      address: '0x93690818A89cCbcf4565CF36BCC72eBb0CC0db5F',
      name: 'USDC',
      symbol: 'USDC',
      icon: 'https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694',
      decimals: 6,
    }],
    421614: [{
      address: '0x0000000000000000000000000000000000000000',
      isNative: true,
      chainId: 421614,
      symbol: 'ETH',
      decimals: 18,
      name: 'Ether',
      icon: 'https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq',
    },],
    300: [{
      address: '0x0000000000000000000000000000000000000000',
      isNative: true,
      chainId: 300,
      symbol: 'ETH',
      decimals: 18,
      name: 'Ether',
      icon: 'https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq',
    },],
    84532: [{
      address: '0x0000000000000000000000000000000000000000',
      isNative: true,
      chainId: 84532,
      symbol: 'ETH',
      decimals: 18,
      name: 'Ether',
      icon: 'https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq',
    },],
    5003: [{
      address: '0x193859664CF07E331e1cE3FAe623e7E499F2a200',
      isNative: false,
      chainId: 5003,
      symbol: 'ETH',
      decimals: 18,
      name: 'Ether',
      icon: 'https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq',
    },],
}

export default allTokens