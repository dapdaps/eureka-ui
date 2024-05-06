import { useEffect, useState } from "react";
import { init, getQuote, execute, getIcon, getBridgeMsg, getAllToken, getChainScan, getStatus } from 'super-bridge-sdk';

import type { QuoteRequest, QuoteResponse, ExecuteRequest } from 'super-bridge-sdk'

import useAccount from '@/hooks/useAccount';

export default function useQuote(quoteRequest: QuoteRequest | null) {
    const [routes, setRoutes] = useState<QuoteResponse[] | null>(null)
    const [loading, setLoading] = useState(false)
    const { chainId, provider } = useAccount()

    async function getRoutes() {
        if (!quoteRequest) {
            setRoutes(null)
            return 
        }
        setLoading(true)
        const routes = await getQuote(quoteRequest, provider.getSigner())
        console.log('routes:', routes)
        setRoutes(routes)
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