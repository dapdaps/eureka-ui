import type { Chain, Token } from '@/types'

export default {
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': {
        chainId: 1,
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        decimals: 18,
        symbol: 'WETH',
        name: 'Wrapped Ether',
        icon: 'https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4',
    },
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': {
        chainId: 1,
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        name: 'USDC',
        symbol: 'USDC',
        icon: 'https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694',
        decimals: 6,
    },
} as {
    [key: string]: Token
}