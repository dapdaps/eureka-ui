import styled from 'styled-components';
import { useState, useRef, useCallback, useEffect } from "react";

import useTokenBalance from '@/hooks/useCurrencyBalance';
import usePriceValue from '../hooks/usePriceValue';
import { usePriceStore } from '@/stores/price';

import { ArrowDown } from '../Arrow'
import TokenSelectModal from './TokenSelectModal';
import { balanceFormated, percentFormated } from '@/utils/balance';
import Loading from '@/components/Icons/Loading';

import type { Chain, Token } from '@/types';

const Wapper = styled.div`
    min-height: 145px;
    border-radius: 12px;
    border: 1px solid rgba(55, 58, 83, 1);
    background-color: rgba(46, 49, 66, 1);
`
const Header = styled.div`
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    border-bottom: 1px solid rgba(55, 58, 83, 1);
`
const ChainWapper = styled.div`
    display: flex;
    align-items: center;
`
const ChainName = styled.div`
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    width: 30px;
`
const ChainTrigger = styled.div`
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(46, 49, 66, 1);
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 8px;
    margin-left: 15px;
    gap: 10px;
    padding: 0 5px;
    cursor: pointer;
    transition: all .3s;
    &:hover {
        border: 1px solid rgba(235, 244, 121, .3);
    }
`
const ChainGroupImg = styled.img`
    width: 22px;
    height: 22px;
`

const ChainGroupName = styled.div`
    font-size: 16px;
    font-weight: 500;
    line-height: 19.2px;
    color: #fff;
`

const AddressWapper = styled.div`
    font-size: 16px;
    font-weight: 400;
    line-height: 19.2px;
    color: rgba(151, 154, 190, 1);
`

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 12px 16px;
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
    cursor: pointer;
    transition: all .3s;
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
    margin-top: 10px;
    .num {
        text-decoration: underline;
        cursor: pointer;
    }
`

interface Props {
    title: string;
    address: string;
    chainList: Chain[];
    chainToken: any;
    currentChain: Chain | undefined;
    currentToken: Token | undefined;
    inputDisabled?: boolean;
    amount: string;
    onChainChange: (chain: Chain) => void;
    onTokenChange: (token: Token) => void;
    onAmountChange?: (value: string) => void;
}

export default function ChainTokenAmount({
      title, address, chainList, chainToken, currentChain, currentToken, amount, inputDisabled = false, onChainChange, onTokenChange, onAmountChange,
}: Props) {
    const prices = usePriceStore((store) => store.price);
    const [tokenModalShow, setTokenModalShow] = useState<boolean>(false)

    const { balance, loading } = useTokenBalance({
        currency: currentToken,
        updater: 1,
        isNative: currentChain?.nativeCurrency.symbol === currentToken?.symbol,
        isPure: false,
    })

    const { value : usdVal } = usePriceValue({
        prices,
        amount,
        symbol: currentToken?.symbol
    })

    return <Wapper>
        <Header>
            <ChainWapper>
                <ChainName>{title}</ChainName>
                <ChainTrigger onClick={() => {
                    setTokenModalShow(true)
                }}>
                    <ChainGroupImg src={currentChain?.icon} />
                    <ChainGroupName>{currentChain?.chainName}</ChainGroupName>
                    <ArrowDown />
                </ChainTrigger>
            </ChainWapper>
            <AddressWapper>{address}</AddressWapper>
        </Header>
        <Content>
            <AmountWapper>
                <AmountInput value={amount} onChange={e => {
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
                            <TokenGroupName>{ currentToken?.symbol }</TokenGroupName>
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
                        }}>{ balanceFormated(balance) }</span>
                    }
                </BalanceWapper>
            </TokenWapper>
        </Content>

        {
            tokenModalShow && <TokenSelectModal
                currentChain={currentChain}
                currentToken={currentToken}
                chainToken={chainToken}
                chainList={chainList}
                onClose={() => { setTokenModalShow(false) }}
                onChainChange={onChainChange}
                onTokenChange={onTokenChange}
            />
        }
    </Wapper>
}