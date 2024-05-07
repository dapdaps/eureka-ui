import { useEffect, useState } from "react";
import { init, getQuote, execute, getIcon, getBridgeMsg, getAllToken, getChainScan, getStatus } from 'super-bridge-sdk';

import type { QuoteRequest, QuoteResponse, ExecuteRequest } from 'super-bridge-sdk'

import useAccount from '@/hooks/useAccount';

export default function useQuote(quoteRequest: QuoteRequest | null, identification: string | number) {
    const [routes, setRoutes] = useState<QuoteResponse[] | null>(null)
    const [loading, setLoading] = useState(false)
    const { chainId, provider } = useAccount()

    async function getRoutes() {
        if (!quoteRequest) {
            setRoutes(null)
            return 
        }
        setLoading(true)

        const routes: QuoteResponse[] = []
        const _routes = await getQuote(quoteRequest, provider.getSigner(), function(val: QuoteResponse) {
            console.log('val: ', val)
            if (val.identification === identification) {
                routes.push(val)
                setRoutes(routes)
            }
        })
        console.log('routes:', routes)
        setRoutes(_routes)
        setLoading(false)
    } 

    useEffect(() => {
        getRoutes()
    }, [quoteRequest])

    return {
        routes,
        loading,
    }
    
}