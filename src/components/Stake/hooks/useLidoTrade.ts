import Big from 'big.js'
import type { Signer }  from 'ethers';
import { Contract } from 'ethers';
import { useEffect, useState } from "react";

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

const ethereumAbi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_referral",
                "type": "address"
            }
        ],
        "name": "submit",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    }
]


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
        '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
        ethereumAbi,
        signer,
    );

    const transactionData = await DepositContract.populateTransaction.submit(
        '0x0000000000000000000000000000000000000000', {
        value
    })

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
            const _value = new Big(value).mul(10 ** 18).toNumber().toFixed()
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
        const _minOut = new Big(recived).mul(10 ** 18).toString().split('.')[0]
        const transactionData = await getTransactionData(value, signer)
        console.log('transactionData:', transactionData)
        const tx = await signer.sendTransaction({
            ...transactionData,
            // gasLimit: gasEstimate || 19200,
        })
        return tx.wait()
    }

    useEffect(() => {
        if (amount && !isNaN(Number(amount))) {
            setRecived(amount.toString())
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

    return {
        rate,
        recived,
        exchangeRate,
        deposit,
        transactionCost,
        isLoading,
    }
}