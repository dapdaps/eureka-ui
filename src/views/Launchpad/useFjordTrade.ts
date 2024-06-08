import type { Chain, Token } from '@/types'
import { useEffect, useState } from 'react';
import { Contract, providers, utils } from 'ethers';
import { getQuote } from 'super-bridge-sdk'

import tokenConfig from './tokenConfig'
import Big from 'big.js';

interface QuoteProps {
    fromChain: Chain;
    fromToken: Token;
    amount: Big;
    pool: string;
    address: string;
}

interface TradeProps {

}

const poolAbi = [
    {
        "inputs": [],
        "name": "asset",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "assetsIn",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "minSharesOut",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            }
        ],
        "name": "swapExactAssetsForShares",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "sharesOut",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
]

export function useQuote(quote: QuoteProps) {
    const provider = new providers.JsonRpcProvider('https://eth.llamarpc.com');
    

    useEffect(() => {
        getFdQuote(quote)
    }, [quote])

    async function getFdQuote(quote: QuoteProps) {
        const RateContract = new Contract(
            quote.pool,
            poolAbi,
            provider,
        )
        const middleTokenAddress = await RateContract.asset()

        const midToken = tokenConfig[middleTokenAddress]

        const bridgeQuote = await getQuote({
            fromChainId: quote.fromChain.chainId.toString(),
            toChainId: '1',
            fromToken: quote.fromToken,
            toToken: midToken,
            fromAddress: quote.address,
            destAddress: quote.address,
            amount: quote.amount,
            identification: Date.now(),
            engine: ['liFi'],
        }, provider?.getSigner())

        console.log('bridgeQuote: ', bridgeQuote)
        if (!bridgeQuote.length) {
            return null
        }

        const route = bridgeQuote[0]

        if (route) {
            const receiveAmount = route.receiveAmount

        }
    }



    return {}
}

export function useTrade({}: TradeProps) {

}