import type { Chain, Token } from '@/types'

import Big from 'big.js'
import { useState } from 'react'
import Loading from '@/components/Icons/Loading'
import useAccount from '@/hooks/useAccount';
import LaunchPadModal from '@/components/launchpad-modal'



export default function BirdgeAction() {
    const [launchPadModalShow, setLaunchPadModalShow] = useState(true)
    // const { account, chainId, provider } = useAccount();

    // const [quote] = useState<any>({
    //     fromChain: fromChain,
    //     fromToken: fromToken,
    //     amount: new Big('0.001').mul(10 ** 18),
    //     pool: '0x31BE063F26E5db02Fda4b6B11D037e8Ad8a98988',
    //     address: '0x86cdCd7fA9F3B24D68CbDD9170C3662036BDC2ef',
    // })

    // const { loading: buyQuoteLoading, bridgeRoute, shareVal, receiveAmount, pool, tradeType, midToken } = useBuyQuote(quote)

    // const { loading: sellQuoteLoading, assetOut } = useSellQuote({
    //     amount: new Big('161.316157182813200429').mul(10 ** 18).toString(),
    //     pool: '0x31BE063F26E5db02Fda4b6B11D037e8Ad8a98988',
    //     account: '0x86cdCd7fA9F3B24D68CbDD9170C3662036BDC2ef'
    // })

    // const { excuteBuyTrade } = useBuyTrade({
    //     shareVal,
    //     bridgeRoute,
    //     receiveAmount,
    //     tradeType,
    //     pool,
    //     midToken,
    //     recipient: '0x86cdCd7fA9F3B24D68CbDD9170C3662036BDC2ef',
    //     quote,
    // })

    // const { excuteSellTrade } = useSellTrade({
    //     pool: '0x31BE063F26E5db02Fda4b6B11D037e8Ad8a98988',
    //     recipient: '0x86cdCd7fA9F3B24D68CbDD9170C3662036BDC2ef',
    //     assetOut,
    //     amount: new Big('161.316157182813200429').mul(10 ** 18).toString(),
    // })
    

    return <div>
        {/* <div>will buy Val: {shareVal}</div>
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
        }}> {sellQuoteLoading && <Loading size={20} />} sell trade</button>  */}

        <div>
            <button onClick={() => {
                setLaunchPadModalShow(true)
            }}>pool: 0x31BE063F26E5db02Fda4b6B11D037e8Ad8a98988</button>
        </div>


        {/* {
            launchPadModalShow && <LaunchPadModal pool="0x31BE063F26E5db02Fda4b6B11D037e8Ad8a98988" onClose={() => {
                setLaunchPadModalShow(false)
            }}/>
        } */}
        

    </div>
}