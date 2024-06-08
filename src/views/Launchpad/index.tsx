import type { Chain, Token } from '@/types'

import { useQuote, useTrade } from './useFjordTrade'
import Big from 'big.js'
import { useState } from 'react'

const fromChain: Chain = {
    chainId: 42161,
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

export default function BirdgeAction() {
    const [quote] = useState<any>({
        fromChain: fromChain,
        fromToken: fromToken,
        amount: new Big('0.01').mul(10 ** 18),
        pool: '0x31BE063F26E5db02Fda4b6B11D037e8Ad8a98988',
        address: '0x86cdCd7fA9F3B24D68CbDD9170C3662036BDC2ef',
    })

    useQuote(quote)

    return <div>111</div>
}