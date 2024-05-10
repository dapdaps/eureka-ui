import { useEffect, useState } from "react";
import { Contract, providers, utils } from 'ethers';
import Big from 'big.js'

import type { Signer }  from 'ethers';

import useToast from '@/hooks/useToast';

interface Request {
    amount: string | number;
    account: string;
    provider: any;
    isError: boolean;
    chainId: number;
}

interface Result {
    rate: number;
    recived: string;
    exchangeRate: string;
    transactionCost: string;
    deposit: any;
    isLoading: boolean,
}

const regErrMsg = /([^(]+)\(/
export function formatException(errMsg: string): string {
    let _msg = ''
    const res = errMsg.match(regErrMsg)
    if (res && res.length > 1) {
        _msg = res[1]
        return _msg
    }

    return errMsg
}


const EtherfiL2ExchangeRateProviderAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            }
        ],
        "name": "getConversionAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

const EtherfiL2ModeSyncPoolETHAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenIn",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "minAmountOut",
                "type": "uint256"
            }
        ],
        "name": "deposit",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    }
]


async function getConversionAmount(amount: string): Promise<string> {
    const provider = new providers.JsonRpcProvider('https://rpc.blast.io');
    const RateContract = new Contract(
        '0xc42853c0C6624F42fcB8219aCeb67Ad188087DCB',
        EtherfiL2ExchangeRateProviderAbi,
        provider,
    );

    const v = await RateContract.getConversionAmount(
        '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        amount,
    )

    if (v._hex) {
        return new Big(Number(v._hex)).div(10 ** 18).toString()
    }

    return ''
}


async function getEstimateGas(value: string, signer: any) {
    try {
        const transactionData = await getTransactionData(value, signer)

        const gasPrice = await signer.getGasPrice();

        const gasEstimate = await signer.estimateGas({
            ...transactionData,
            value: transactionData?.value?.toString(),
            gasPrice: gasPrice.toString(),
        });

        return {
            gasEstimate,
            gasPrice
        }
        // new Big(gasEstimate.mul(gasPrice).toString()).div(10 ** 18).toString()
    } catch (e) {
        console.log(e)
    }

    return null
}

async function getTransactionData(value: string, signer: Signer) {
    const DepositContract = new Contract(
        '0x52c4221cb805479954cde5accff8c4dcaf96623b',
        EtherfiL2ModeSyncPoolETHAbi,
        signer,
    );


    const transactionData = await DepositContract.populateTransaction.deposit(
        '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        value,
        new Big(value).mul(new Big(0.9)).toString(),
        {
            value,
        }
    )

    return transactionData
}


export default function useTrade({
    amount,
    provider,
    account,
    isError,
    chainId,
}: Request): Result {
    const { fail, success } = useToast()
    const [rate, setRate] = useState(0)
    const [recived, setRecived] = useState('')
    const [exchangeRate, setExchangeRate] = useState('1')
    const [transactionCost, setTransactionCost] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [gasEstimate, setGasEstimate] = useState(19200)

    async function deposit(value: string, signer: Signer) {
        try {
            const _value = new Big(value).mul(10 ** 18).toString()
            setIsLoading(true)
            const tx = await ethereumDeposit(_value, signer)
            success({
                title: 'Transaction successed',
            })

            setIsLoading(false)
            return tx.transactionHash
        } catch (err: any) {
            console.log(err)
            fail({
                title: err.name ? err.name : 'Transaction failed',
                text: formatException(err.message),
            })
            setIsLoading(false)
        }
    }

    async function ethereumDeposit(value: string, signer: Signer) {
        const transactionData = await getTransactionData(value, signer)
        console.log('transactionData:', transactionData, )
        console.log('gasEstimate: ', gasEstimate)
        const tx = await signer.sendTransaction({
            ...transactionData,
            // gasLimit: 19200,
        })
        return tx.wait()
    }

    useEffect(() => {
        if (amount && !isNaN(Number(amount))) {
            const _amount = new Big(amount.toString()).mul(10 ** 18).toString()
            getConversionAmount(_amount).then(setRecived)
        } else {
            setRecived('')
        }
    }, [amount, rate])

    useEffect(() => {
        if (amount && !isNaN(Number(amount)) && !isError && provider) {
            const _amount = new Big(amount.toString()).mul(10 ** 18).toString()
            getEstimateGas(_amount, provider?.getSigner()).then(res => {
                if (res) {
                    setGasEstimate(res.gasEstimate)
                    setTransactionCost(
                        new Big(res.gasEstimate.mul(res.gasPrice).toString()).div(10 ** 18).toString()
                    )
                } else {
                    setTransactionCost('')
                }
            })
        } else {
            setTransactionCost('')
        }
    }, [amount, isError, recived])

    useEffect(() => {
        const _amount = new Big(1).mul(10 ** 18).toString()
        getConversionAmount(_amount).then(setExchangeRate)

    }, [])

    return {
        rate,
        recived,
        exchangeRate,
        deposit,
        transactionCost,
        isLoading,
    }
}