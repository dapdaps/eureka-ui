import type { Chain, Token } from '@/types'
import { useEffect, useState } from 'react';
import { Contract, providers, utils, Signer } from 'ethers';
import { getQuote, getStatus, execute, approve } from 'super-bridge-sdk'

import type { QuoteRequest, QuoteResponse } from 'super-bridge-sdk'


import tokenConfig from './tokenConfig'
import Big from 'big.js';

interface QuoteProps {
    fromChain: Chain;
    fromToken: Token;
    amount: Big;
    pool: string;
    address: string;
}

interface QuoteResProps {
    shareVal: string;
    loading: boolean;
    bridgeRoute: QuoteResponse | null;
    receiveAmount: string;
    tradeType: number;
    pool: string;
    midToken: Token | null;
}

interface TradeProps {
    shareVal: string;
    bridgeRoute: QuoteResponse | null;
    receiveAmount: string;
    tradeType: number;
    pool: string;
    midToken: Token | null;
    recipient: string;
    quote: QuoteProps,
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
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "assetsIn",
                "type": "uint256"
            }
        ],
        "name": "previewSharesOut",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "sharesOut",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "sharesIn",
                "type": "uint256"
            }
        ],
        "name": "previewAssetsOut",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "assetsOut",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "purchasedShares",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "saleStart",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "saleEnd",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "closed",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "sharesIn",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "minAssetsOut",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            }
        ],
        "name": "swapExactSharesForAssets",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "assetsOut",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "referred",
                "type": "bool"
            }
        ],
        "name": "redeem",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "shares",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
]

const executorAbi = [
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_transactionId",
                "type": "bytes32"
            },
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "callTo",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "approveTo",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "sendingAssetId",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "receivingAssetId",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "fromAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "callData",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bool",
                        "name": "requiresDeposit",
                        "type": "bool"
                    }
                ],
                "internalType": "struct LibSwap.SwapData[]",
                "name": "_swapData",
                "type": "tuple[]"
            },
            {
                "internalType": "address",
                "name": "_transferredAssetId",
                "type": "address"
            },
            {
                "internalType": "address payable",
                "name": "_receiver",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "swapAndExecute",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "erc20Proxy",
        "outputs": [
            {
                "internalType": "contract IERC20Proxy",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
]

export function useBuyQuote(quote: QuoteProps): QuoteResProps {
    const [loading, setLoading] = useState(false)
    const [shareVal, setShareVal] = useState('')
    const [receiveAmount, setReceiveAmount] = useState('')
    const [bridgeRoute, setBridgeRoute] = useState<QuoteResponse | null>(null)
    const [tradeType, setTradeType] = useState<number>(1)
    const [midToken, setMidToken] = useState<Token | null>(null)

    useEffect(() => {
        if (midToken) {
            setLoading(true)
            setShareVal('')

            const provider = new providers.JsonRpcProvider('https://eth.llamarpc.com');
            const PoolContract = new Contract(
                quote.pool,
                poolAbi,
                provider,
            )

            try {
                if (quote.fromChain.chainId === 1 && quote.fromToken.address === midToken.address) {
                    getAssetRuote(quote, midToken, PoolContract, provider)
                    setTradeType(1)
                } else if (quote.fromChain.chainId === 1 && quote.fromToken.address !== midToken.address) {
                    getBridgeRuote(quote, midToken, PoolContract, provider)
                    setTradeType(3)
                } else {
                    getBridgeRuote(quote, midToken, PoolContract, provider)
                    setTradeType(3)
                }
                
            } catch (e) {
                setShareVal('')
                setBridgeRoute(null)
                setReceiveAmount('')
                setLoading(false)
            }
        }
        
    }, [quote, midToken])

    useEffect(() => {
        if (quote) {
            getMidToken(quote.pool)
        }
    }, [quote])

    async function getBridgeRuote(quote: QuoteProps, midToken: Token, PoolContract: Contract, provider: any) {
        
        setBridgeRoute(null)
        setReceiveAmount('')

        
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
            return false
        }

        const route = bridgeQuote[0]

        const receiveAmount = route.receiveAmount

        const targetShareVal = await PoolContract.previewSharesOut(receiveAmount)

        console.log('targetShareVal: ', new Big(targetShareVal).div(10 ** 18).toString())
        setShareVal(new Big(targetShareVal).div(10 ** 18).toString())
        setBridgeRoute(route)
        setReceiveAmount(receiveAmount)
        setLoading(false)
    }

    async function getAssetRuote(quote: QuoteProps, midToken: Token, PoolContract: Contract, provider: any) {
        const targetShareVal = await PoolContract.previewSharesOut(quote.amount.toString())
        console.log('targetShareVal: ', new Big(targetShareVal).div(10 ** 18).toString())
        setShareVal(new Big(targetShareVal).div(10 ** 18).toString())
        setReceiveAmount(quote.amount.toString())
        setLoading(false)
    }

    async function getMidToken(pool: string) {
        const PoolContract = getPoolContract(pool)

        const middleTokenAddress = await PoolContract.asset()

        const midToken = tokenConfig[middleTokenAddress]
        setMidToken(midToken)
    }

    

    return {
        shareVal,
        loading,
        bridgeRoute,
        receiveAmount,
        tradeType,
        pool: quote.pool,
        midToken,
    }
}

export function useBuyTrade({
    shareVal,
    bridgeRoute,
    receiveAmount,
    tradeType,
    pool,
    midToken,
    recipient,
    quote,
}: TradeProps) {

    async function excuteBuyTrade(signer: Signer) {
        if (!midToken) {
            return
        }

        if (tradeType === 3 && bridgeRoute) { // 1:bridge 2:asset token => target 
            const bridgeHash = await execute(bridgeRoute, signer)
            for (let i = 0; i < 999; i++) {
                const isSuccess = await getStatus(bridgeHash, 'liFi', signer)
                if (isSuccess) {
                    break;
                }
                sleep(10000)
            }
        }
        
        if (tradeType === 3 || tradeType === 1) { // 
            const PoolContract = new Contract(
                pool,
                poolAbi,
                signer,
            )

            const midTokenBalance = await getBalance('https://eth.llamarpc.com', recipient, midToken)

            let _receiveAmount = receiveAmount
            if (Number(midTokenBalance) < Number(receiveAmount)) {
                _receiveAmount = midTokenBalance
            }    

            const assetsIn = new Big(_receiveAmount)
            const minSharesOut = new Big(shareVal).mul(10 ** 18).mul(1 - 0.0025).toString()

            await approve(midToken.address, assetsIn, pool, signer)

            const hash = await PoolContract.swapExactAssetsForShares(assetsIn.toString(), minSharesOut.split('.')[0], recipient)
            
            console.log('hash: ', hash)
            return hash
        }

        if (tradeType === 2) {
            // const ExecutorContract = new Contract(
            //     '0x2dfaDAB8266483beD9Fd9A292Ce56596a2D1378D',
            //     executorAbi,
            //     signer,
            // )

            // const apprroveAddress = await ExecutorContract.erc20Proxy()

            // await approve(quote.fromToken.address, quote.amount, apprroveAddress, signer)
        }
    }

    return {
        excuteBuyTrade,
    }
}

export function useSellQuote({
    amount, pool, account
}: {
    amount: string, pool: string, account: string
}) {
    const [assetOut, setAssetOut] = useState('')
    const [balance, setBalance] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const PoolContract = getPoolContract(pool)
        PoolContract.previewAssetsOut(amount).then((res: string) => {
            // console.log(new Big(res.toString()).div(10 ** 18).toString())
            setAssetOut(new Big(res.toString()).div(10 ** 18).toString())
            setLoading(false)
        })

    }, [amount])

    useEffect(() => {
        const PoolContract = getPoolContract(pool)
        PoolContract.purchasedShares(account).then((res: string) => {
            console.log('balance: ',res.toString())
            setBalance(new Big(res.toString()).div(10 ** 18).toString())
        })
    }, [])

    return {
        assetOut, loading, balance
    }
}

export function useSellTrade({
    pool,
    amount,
    assetOut,
    recipient,
}: {
    pool: string;
    amount: string;
    assetOut: string;
    recipient: string;
}) {
    async function excuteSellTrade(signer: Signer) {
        const PoolContract = new Contract(
            pool,
            poolAbi,
            signer,
        )

        const minAssetsOut = new Big(assetOut).mul(10 ** 18).mul(1 - 0.0025).toString()

        const hash = await PoolContract.swapExactSharesForAssets(amount,  minAssetsOut.split('.')[0], recipient)

        console.log(hash)

        return hash
    }

    async function saleStart() {
        const PoolContract = getPoolContract(pool)
        const time = await PoolContract.saleStart()
        console.log('start-time:', time)
    }

    async function saleEnd() {
        const PoolContract = getPoolContract(pool)
        const time = await PoolContract.saleEnd()
        console.log('end-time:', time)
    }

    async function getClosed() {
        const PoolContract = getPoolContract(pool)
        const time = await PoolContract.closed()
        console.log('close-time:', time)
    }

    useEffect(() => {
        saleStart()
        saleEnd()
        getClosed()
    }, [])

    return {
        excuteSellTrade
    }
}

async function getBalance(rpcUrl: string, account: string, currency: Token) {
    try {
        const provider = new providers.JsonRpcProvider(rpcUrl);
        const TokenContract = new Contract(
            currency.address,
            [
                {
                    constant: true,
                    inputs: [
                        {
                            name: '_owner',
                            type: 'address',
                        },
                    ],
                    name: 'balanceOf',
                    outputs: [
                        {
                            name: 'balance',
                            type: 'uint256',
                        },
                    ],
                    payable: false,
                    stateMutability: 'view',
                    type: 'function',
                },
            ],
            provider,
        );
        const res = await TokenContract.balanceOf(account);
        return res.toString()
    } catch (err) {
        return '0'
    }
};


function sleep(time: number){
    return new Promise((resolve) => setTimeout(resolve, time));
}

function getPoolContract(pool: string) {
    const provider = new providers.JsonRpcProvider('https://eth.llamarpc.com');
    const PoolContract = new Contract(
        pool,
        poolAbi,
        provider,
    )

    return PoolContract
}