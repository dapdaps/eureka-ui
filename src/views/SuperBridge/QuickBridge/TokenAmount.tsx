import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import useTokenBalance from '@/hooks/useCurrencyBalance';
import { usePriceStore } from '@/stores/price';
import type { Chain, Token } from "@/types";
import { balanceFormated, percentFormated } from '@/utils/balance';

import { ArrowDown } from '../Arrow'
import TokenSelectModal from '../ChainTokenAmount/TokenSelectModal';
import usePriceValue from '../hooks/usePriceValue';


const Wrapper = styled.div`
    border: 1px solid rgba(55, 58, 83, 1);
    background: rgba(46, 49, 66, 1);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const AmountWapper = styled.div`
    flex: 1;
`

const AmountInput = styled.input`
    width: 100%;
    display: block;
    color: rgba(255, 255, 255, 1);
    font-size: 26px;
    font-weight: 500;
    line-height: 31.2px;
    &::placeholder {
        color: rgba(151, 154, 190, 1);
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
`

const PriceWapper = styled.div`
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    color: rgba(151, 154, 190, 1);
    margin-top: 10px;
    padding-left: 3px;
`

const TokenWapper = styled.div`
    
`

const TokenTrigger = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 36px;
    padding: 0 10px;
    gap: 10px;
    border-radius: 8px;
    border: 1px solid rgba(55, 58, 83, 1);
    background-color: rgba(46, 49, 66, 1);
    color: #fff;
    cursor: pointer;
    transition: all .3s;
    width: 160px;
    margin: 0 0 0 auto;
    &:hover {
        border: 1px solid rgba(235, 244, 121, .3);
    }
`

const TokenGroupImg = styled.div`
    position: relative;
    width: 22px;
    height: 22px;
    .token {
       display: block;
       width: 100%;
       height: 100%;
       border-radius: 100%;
    }
    .chain {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 10px;
        height: 10px;
    }
`

const TokenGroupName = styled.div`
    color: #fff;
`

const BalanceWapper = styled.div`
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    color: rgba(151, 154, 190, 1);
    text-align: right;
    margin-top: 5px;
    .num {
        text-decoration: underline;
        cursor: pointer;
    }
`

interface Props {
    amount: string | number | undefined;
    onAmountChange?: (v: string) => void;
    inputDisabled?: boolean;
    currentToken: Token | undefined;
    currentChain: Chain | undefined;
    disabledChainSelector: boolean;
    chainList: Chain[];
    chainToken: any;
    showTokenSelectModal: boolean;
    onTokenSelectModalChange: () => void;
    onChainChange: (chain: Chain) => void;
    onTokenChange: (token: Token) => void;
}

export default function TokenAmount({
    amount, onAmountChange, inputDisabled, disabledChainSelector, currentToken, showTokenSelectModal, onTokenSelectModalChange, currentChain, chainList, chainToken, onChainChange, onTokenChange,
}: Props) {
    const [focus, setFocus] = useState(false)
    const [tokenModalShow, setTokenModalShow] = useState(false)
    const prices = usePriceStore((store) => store.price);
    const { value: usdVal } = usePriceValue({
        prices,
        amount,
        symbol: currentToken?.symbol
    })

    const { balance, loading } = useTokenBalance({
        currency: currentToken,
        updater: 1,
        isNative: currentChain?.nativeCurrency.symbol === currentToken?.symbol,
        isPure: false,
    })

    useEffect(() => {
        if (showTokenSelectModal) {
            setTokenModalShow(true)
        }
    }, [showTokenSelectModal])

    return <Wrapper>
        <AmountWapper>
            <AmountInput value={amount} onFocus={() => {
                setFocus(true)
            }} onBlur={() => {
                setFocus(false)
            }} onChange={e => {
                onAmountChange && !inputDisabled && onAmountChange(e.target.value)
            }} type="number" disabled={inputDisabled} placeholder='0' />
            <PriceWapper>{usdVal}</PriceWapper>
        </AmountWapper>
        <TokenWapper>
            <TokenTrigger onClick={() => {
                setTokenModalShow(true)
            }}>
                {
                    currentToken ? <>
                        <TokenGroupImg>
                            <img className='token' src={currentToken?.icon} />
                            <img className='chain' src={currentChain?.icon} />
                        </TokenGroupImg>
                        <TokenGroupName>{currentToken?.symbol}</TokenGroupName>
                    </> : <>Select a Token</>
                }
                <ArrowDown />
            </TokenTrigger>
            <BalanceWapper>
                <span>balance: </span>
                {
                    loading
                        ? <Loading size={12} />
                        : <span className='num'
                            onClick={() => {
                                onAmountChange && !inputDisabled && balance && onAmountChange(balance)
                            }}>{balanceFormated(balance)}</span>
                }
            </BalanceWapper>
        </TokenWapper>


        {
            tokenModalShow && <TokenSelectModal
                currentChain={currentChain}
                currentToken={currentToken}
                chainToken={chainToken}
                chainList={chainList}
                showSelectChain={false}
                disabledChainSelector={disabledChainSelector}
                onClose={() => { 
                    setTokenModalShow(false);
                    onTokenSelectModalChange()
                 }}
                onChainChange={onChainChange}
                onTokenChange={onTokenChange}
            />
        }
    </Wrapper>
}