import styled from 'styled-components';
import type { QuoteRequest, QuoteResponse, ExecuteRequest } from 'super-bridge-sdk'

import { useDebounce } from 'ahooks';
import useAccount from '@/hooks/useAccount';
import { usePriceStore } from '@/stores/price';
import { balanceFormated, percentFormated, addressFormated } from '@/utils/balance';
import Loading from '@/components/Icons/Loading';
import { useGasAmount } from './useGasTokenHooks';
import SubmitBtn from '../SubmitBtn';

import Modal from "../Modal";
import type { Chain, Token } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import Big from 'big.js';


const Tip = styled.div`
    font-size: 16px;
    font-weight: 400;
    line-height: 19.2px;
    color: rgba(255, 255, 255, 1);
    margin-top: 20px;
`

const RefuelAmount = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    .refuel-title {

    }
    .transter-detail {
        display: flex;
        align-items: center;
        gap: 20px;
    }
`

const Range = styled.input`
    width: 100%;
    &::-webkit-slider-thumb {
        border: solid 0.125em rgba(205, 224, 230, 0.5); 
        box-shadow: 0 .125em .125em #3b4547; 
    }
`

const Container = styled.div<{ disabled?: boolean }>`
    height: 60px;
    line-height: 60px;
    background-color: rgba(235, 244, 121, 1);
    border-radius: 10px;
    text-align: center;
    color: rgba(55, 58, 83, 1);
    cursor: pointer;
    font-weight: 600;
    font-size: 18px;
    margin-top: 10px;
    &.disbaled {
        opacity: .3;
        cursor: default;
    }
`

const Sep = styled.div`
    height: 20px;
`

interface Props {
    fromChain: Chain | undefined;
    fromToken: Token | undefined;
    toChain: Chain | undefined;
    toAddress: string;
    onClick: () => void;
    onClose: () => void;
}

const max$ = 200

export default function GasModal({
    onClick, onClose, fromChain, fromToken, toAddress, toChain
} : Props) {
    const { account, chainId, provider } = useAccount();
    const prices = usePriceStore((store) => store.price);
    const [rangeVal, setRangeVal] = useState<string>('0')
    const [min, setMin] = useState(0)
    const [step, setStep] = useState(1)
    const [max, setMax] = useState(200)

    const inputValue = useDebounce(rangeVal, { wait: 100 });

    const { receive, deposit, isLoading } = useGasAmount({
        fromChain,
        toChain,
        fromToken,
        value: inputValue
    })

    const senGas = useCallback(async () => {
        if (fromToken) {
            const _value = new Big(inputValue).mul(10 ** fromToken?.decimals).toString()
            await deposit(fromToken.address, account as string, _value, provider?.getSigner())
            onClose()
        }
    }, [fromToken, fromChain, inputValue])

    useEffect(() => {
        if (prices && fromToken && prices[fromToken.symbol]) {
            const max = max$ / Number(prices[fromToken.symbol])
            const step = max / 200
            const min = step
            setMax(max)
            setMin(min)
            setStep(step)
        }
    }, [prices, fromToken])

    return <Modal title="Refuel Gas Token" onClose={() => {
        !isLoading && onClose()
    }}>
        <Tip>Transfer {fromToken?.symbol} for {toChain?.nativeCurrency.symbol} to cover gas fee on Base.</Tip>
        <RefuelAmount>
            <div>Refuel Amount:</div>
            <div className="transter-detail">
                <div>{balanceFormated(rangeVal)} {fromToken?.symbol}</div>
                    <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 4.13397C8.16667 4.51887 8.16667 5.48113 7.5 5.86603L1.5 9.33013C0.833334 9.71503 -4.47338e-07 9.2339 -4.13689e-07 8.4641L-1.10848e-07 1.5359C-7.71986e-08 0.766098 0.833333 0.284973 1.5 0.669873L7.5 4.13397Z" fill="#979ABE"/>
                    </svg>
                <div>{balanceFormated(receive)} {toChain?.nativeCurrency.symbol}</div>
            </div>
        </RefuelAmount>

        <Sep />
        
        <Range
            type='range'
            onChange={(e: any) => {
                setRangeVal(e.target.value)
            }}
            min={min}
            max={max}
            step={step}
            value={rangeVal}
            className='custom-slider'
        />

        <Sep />

        <SubmitBtn
            isLoading={isLoading}
            disabled={receive === '0'}
            text="Confirm"
            fromChain={fromChain as Chain}
            onClick={senGas}
            defaultText="Confirm"
        />
        
    </Modal>
}