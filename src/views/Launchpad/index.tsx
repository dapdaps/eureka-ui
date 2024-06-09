import type { Chain, Token } from '@/types'

import { useBuyQuote,  useSellQuote, useBuyTrade, useSellTrade } from './useFjordTrade'
import Big from 'big.js'
import { useState } from 'react'
import Loading from '@/components/Icons/Loading'
import useAccount from '@/hooks/useAccount';

const fromChain: Chain = {
    chainId: 42161,
    // chainId: 1,
    chainName: 'Arbitrum',
    icon: 'https://assets.dapdap.net/images/bafkreiajyg2iof2wygtgromy6a2yfl2fqavfy235k7afc4frr7xnljvu2a.svg',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://arb1.arbitrum.io/rpc', 'https://arbitrum.llamarpc.com', 'https://arbitrum-one.publicnode.com'],
    blockExplorers: 'https://arbiscan.io',
}
const fromToken: Token = {
    chainId: 42161,
    name: 'ETH',
    symbol: 'ETH',
    icon: 'https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq',
    decimals: 18,
    isNative: true,
    address: '0x0000000000000000000000000000000000000000',
}

const fromToken2: Token = {
    chainId: 1,
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    name: 'WETH',
    symbol: 'WETH',
    icon: 'https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694',
    decimals: 18,
}

export default function BirdgeAction() {
    const { account, chainId, provider } = useAccount();

    const [quote] = useState<any>({
        fromChain: fromChain,
        fromToken: fromToken,
        amount: new Big('0.001').mul(10 ** 18),
        pool: '0x31BE063F26E5db02Fda4b6B11D037e8Ad8a98988',
        address: '0x86cdCd7fA9F3B24D68CbDD9170C3662036BDC2ef',
    })

    const { loading: buyQuoteLoading, bridgeRoute, shareVal, receiveAmount, pool, tradeType, midToken } = useBuyQuote(quote)

    const { loading: sellQuoteLoading, assetOut } = useSellQuote({
        amount: new Big('161.316157182813200429').mul(10 ** 18).toString(),
        pool: '0x31BE063F26E5db02Fda4b6B11D037e8Ad8a98988',
        account: '0x86cdCd7fA9F3B24D68CbDD9170C3662036BDC2ef'
    })

    const { excuteBuyTrade } = useBuyTrade({
        shareVal,
        bridgeRoute,
        receiveAmount,
        tradeType,
        pool,
        midToken,
        recipient: '0x86cdCd7fA9F3B24D68CbDD9170C3662036BDC2ef',
        quote,
    })

    const { excuteSellTrade } = useSellTrade({
        pool: '0x31BE063F26E5db02Fda4b6B11D037e8Ad8a98988',
        recipient: '0x86cdCd7fA9F3B24D68CbDD9170C3662036BDC2ef',
        assetOut,
        amount: new Big('161.316157182813200429').mul(10 ** 18).toString(),
    })
    

    return <div>
        <div>will buy Val: {shareVal}</div>
        <button onClick={() => {
            if (!buyQuoteLoading && shareVal) {
                excuteBuyTrade(provider.getSigner())
            }
        }}> {buyQuoteLoading && <Loading size={20} />} buy trade</button> 


        <div>will sell Val: {assetOut}</div>
        <button onClick={() => {
            if (!sellQuoteLoading && assetOut) {
                excuteSellTrade(provider.getSigner())
            }
        }}> {sellQuoteLoading && <Loading size={20} />} sell trade</button> 
    </div>
}