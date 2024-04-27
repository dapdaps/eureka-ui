import { useEffect, useState } from "react";
import { Contract, Signer, providers, utils } from 'ethers';
import Big from 'big.js'

interface Request {
    amount: string | number;
    account: string;
    provider: any;
    isError: boolean;
}

interface Result {
    rate: number;
    recived: string;
    exchangeRate: string;
    transactionCost: string;
    deposit: any;
}

const rateAbi = [
    {
        "inputs": [],
        "name": "getRate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

const ethereumAbi = [
    {
        "inputs": [],
        "name": "depositETH",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
]

async function getRate(): Promise<number> {
    const provider = new providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
    const RateContract = new Contract(
        '0xf25484650484DE3d554fB0b7125e7696efA4ab99',
        rateAbi,
        provider,
    );

    const v = await RateContract.getRate()
    if (v._hex) {
        return new Big(Number(v._hex)).div(10 ** 18).toNumber()
    }

    return 0
}

async function getEstimateGas(signer: any, value: string) {
    try {
        const transactionData = await getTransactionData(value, signer)

        const gasPrice = await signer.getGasPrice();
    
        console.log('gasPrice:', gasPrice)
    
        const gasEstimate = await signer.estimateGas({
            ...transactionData,
            value: transactionData.value?.toString(),
            gasPrice: gasPrice.toString(),
        });
    
        return new Big(gasEstimate.mul(gasPrice).toString()).div(10 ** 18).toString()
    } catch(e) {
        console.log(e)
    }

    return ''
}

async function deposit(value: string, signer: Signer, chainId: number) {
    const _value = new Big(value).mul(10 ** 18).toString()
    console.log('_value:', _value)
    switch (chainId) {
        case 1:
            return ethereumDeposit(_value, signer) 
        case 42161:
            break;
    }
}

async function ethereumDeposit(value: string, signer: Signer) {
    const transactionData = await getTransactionData(value, signer)
    await signer.sendTransaction(transactionData)
}

async function getTransactionData(value: string, signer: Signer) {
    const DepositContract = new Contract(
        '0x74a09653A083691711cF8215a6ab074BB4e99ef5',
        ethereumAbi,
        signer,
    );

    const transactionData = await DepositContract.populateTransaction.depositETH({
        value
    })

    return transactionData
}

export default function useTrade({
    amount,
    provider,
    account,
    isError,
}: Request): Result {
    const [rate, setRate] = useState(0)
    const [recived, setRecived] = useState('')
    const [exchangeRate, setExchangeRate] = useState('')
    const [transactionCost, setTransactionCost] = useState('')

    useEffect(() => {
        getRate().then(setRate)
    }, [])

    useEffect(() => {
        if (rate && Number(rate) > 0) {
            setExchangeRate((1 / rate).toString())
        }
    }, [rate])

    useEffect(() => {
        if (amount && !isNaN(Number(amount)) && rate) {
            const recived = Number(amount) / rate
            setRecived(recived.toString())
        } else {
            setRecived('')
        }
    }, [amount, rate])

    useEffect(() => {
        if (amount && !isNaN(Number(amount)) && !isError) {
            console.log('isError: ', isError)
            const _amount = new Big(amount.toString()).mul(10 ** 18).toString()
            getEstimateGas(provider.getSigner(), _amount).then(setTransactionCost)
        } else {

        }
    }, [amount, isError])

    return {
        rate,
        recived,
        exchangeRate,
        deposit,
        transactionCost,
    }
}