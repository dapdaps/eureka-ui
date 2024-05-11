import { useEffect, useState } from "react";
import { init, getQuote, execute, getIcon, getBridgeMsg, getAllToken, getChainScan, getStatus } from 'super-bridge-sdk';

import type { QuoteRequest, QuoteResponse, ExecuteRequest } from 'super-bridge-sdk'

import useAccount from '@/hooks/useAccount';

const timeout = 1000 * 30

export default function useQuote(quoteRequest: QuoteRequest | null, identification: string | number) {
    const [routes, setRoutes] = useState<QuoteResponse[] | null>(null)
    const [loading, setLoading] = useState(false)
    const {chainId, provider} = useAccount()

    async function getRoutes() {
        if (!quoteRequest) {
            setRoutes(null)
            return 
        }
        setLoading(true)
        setRoutes(null)
        const routes: QuoteResponse[] = []
        let stop = false

        setTimeout(() => {
            if (!stop) {
                stop = true
                setLoading(false)
            }
        }, timeout)

        
        const _routes = await getQuote(quoteRequest, provider?.getSigner(), function(val: QuoteResponse) {
            if (stop) {
                return
            }
            if (val.identification === identification) {
                routes.push(val)
                // console.log('routes.length: ', routes.length)
                setRoutes([
                    ...routes
                ])
            }
           
        })
        // console.log('routes:', routes)
        // setRoutes(_routes)
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