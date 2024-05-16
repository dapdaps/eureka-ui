import { useEffect, useState, useRef } from "react";
import Big from 'Big.js'
import { ethers, Contract, providers, utils } from "ethers";
import { approve } from 'super-bridge-sdk'

import type { Signer } from 'ethers'
import { balanceFormated, percentFormated, addressFormated, errorFormated } from '@/utils/balance'
import useToast from '@/hooks/useToast';
import { abi } from './abi'

import type { Chain, Token } from "@/types";

const contractAddress = '0xe1dA6F46d757699f6D783a2876E01937a1eCa9a9'



interface GasTokenParams {
    fromChain: Chain | undefined;
    toChain: Chain | undefined;
    fromToken: Token | undefined;
}

const BASE_URL = 'https://refueler.bobdev.link/api/v1/refuel'

let supportedChains: any = null

async function getAllSupportedChains(fromChain: Chain, toChain: Chain) {
    if (!supportedChains) {
        const res = await fetch(`${BASE_URL}/supportedChains`).then(res => res.json())
        supportedChains = res.data
    }

    const hasFrom = supportedChains
        .supported_src_chains?.filter((item: any) => Number(item.chain_id) === fromChain.chainId)
    const hasTo = supportedChains
        .supported_dst_chains?.filter((item: any) => Number(item.chain_id) === toChain.chainId)

    return {
        hasFrom,
        hasTo
    }
}

async function getSupportedToken(fromChain: any, fromToken: Token) {
    if (fromToken.isNative) {
        return Promise.resolve(true)
    }
    const res = await fetch(`${BASE_URL}/${fromChain.chain_name}/${fromChain.chain_id}/supportedSourceTokens`).then(res => res.json())
    const tokens = res.data.tokens
    return tokens.some((item: any) => item.token_address === fromToken.address)
}

async function getTokenReceived(fromChain: any, toChain: any, fromToken: Token, amount: any) {
    const res = await fetch(`${BASE_URL}/estimateExpectedReceived`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            amount: parseInt(amount).toString(),
            amount_decimal: fromToken.decimals,
            dest_chain_id: toChain.chain_id,
            dest_chain_name: toChain.chain_name,
            src_chain_name: fromChain.chain_name,
            token_address: fromToken.address
        }),
    }).then(res => res.json())

    if (res.returnCode !== 20000) {
        return 0
    }

    return res.data.expected_received
}

export function useGasTokenHooks({
    fromChain,
    toChain,
    fromToken,
}: GasTokenParams) {
    const [isSupported, setIsSupported] = useState(false)


    useEffect(() => {
        if (fromChain && toChain && fromToken) {
            getAllSupportedChains(fromChain, toChain).then(({ hasFrom, hasTo }: any) => {
                if (hasFrom?.length && hasTo?.length) {
                    getSupportedToken(hasFrom[0], fromToken)
                        .then(res => {
                            setIsSupported(res)
                        })
                } else {
                    setIsSupported(false)
                }
            })
        } else {
            setIsSupported(false)
        }

    }, [fromChain, toChain, fromToken])

    return {
        isSupported
    }
}

interface GasAmountParams {
    fromChain: Chain | undefined;
    fromToken: Token | undefined;
    toChain: Chain | undefined;
    value: string | number;
}

export function useGasAmount({
    fromChain,
    toChain,
    fromToken,
    value,
}: GasAmountParams) {
    const [receive, setReceive] = useState('0')
    const [isLoading, setIsLoading] = useState(false)
    const { fail, success } = useToast()

    async function deposit(tokenAddress: string, account: string, value: string, signer: Signer) {
        if (isLoading) {
            return
        }
        setIsLoading(true)
        
        try {
            if (fromToken?.isNative) {
                await depositEth(account, value, signer)
            } else {
                console.log(222)
                await depositToken(tokenAddress, account, value, signer)
            }

            success({
                title: 'Transaction success',
                text: '',
            })

            setIsLoading(false)
        } catch (err) {
            fail({
                title: 'Transaction failed',
                text: errorFormated(err),
            })

            setIsLoading(false)
        }
    }

        

    async function depositEth(account: string, value: string, signer: Signer) {
        const tokenContract = new Contract(
            contractAddress,
            abi,
            signer,
        )

        const v = await tokenContract.depositEth(toChain?.chainId, account, true, {
            value
        })

        const res = await v.wait()
    }

    async function depositToken(tokenAddress: string, account: string, value: string, signer: Signer) {
        console.log('tokenAddress', tokenAddress, value, account)

        const _value = parseInt(value).toString()
        await approve(tokenAddress, new Big(_value), contractAddress, signer)
    
        const tokenContract = new Contract(
            contractAddress,
            abi,
            signer,
        )
    
        const v = await tokenContract.depositToken(
            tokenAddress,
            _value,
            account, 
            toChain?.chainId, 
            true, 
          )
    
        const res = await v.wait()
    }

    useEffect(() => {
        if (!fromChain || !toChain || !fromToken) {
            setReceive('0')
            return
        }

        getAllSupportedChains(fromChain, toChain).then(({ hasFrom, hasTo }: any) => {
            const _fromChain = hasFrom[0]
            const _toChain = hasTo[0]
            const _value = new Big(value).mul(10 ** fromToken.decimals)
            getTokenReceived(_fromChain, _toChain, fromToken, _value).then(res => {
                setReceive(new Big(res).div(10 ** toChain.nativeCurrency.decimals).toString())
            })
        })
    }, [fromChain, toChain, fromToken, value])

    return {
        receive,
        isLoading,
        deposit,
    }
}