import { useEffect, useState } from "react";
import { init, getQuote, execute, getIcon, getBridgeMsg, getAllToken, getChainScan, getStatus } from 'super-bridge-sdk';

import type { QuoteRequest, QuoteResponse, ExecuteRequest } from 'super-bridge-sdk'

import useAccount from '@/hooks/useAccount';

export default function useQuote(quoteRequest: QuoteRequest) {
    const [routes, setRoutes] = useState(null)
    const [loading, setLoading] = useState(false)
    const { chainId, provider } = useAccount();

    async function getRoutes() {
        const routes = await getQuote(quoteRequest, provider.getSigner())
    } 

    useEffect(() => {
        
    }, [quoteRequest])

    return {
        routes,
        loading,
    }
    
}