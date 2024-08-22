import { useCallback, useEffect,useRef, useState } from "react";
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import useTokenBalance from '@/hooks/useCurrencyBalance';
import { usePriceStore } from '@/stores/price';
import type { Chain, Token } from '@/types';
import { balanceFormated, percentFormated } from '@/utils/balance';

import Image from './Image'

const Container = styled.div`
    display: flex;
    height: 54px;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    cursor: pointer;
    &:hover, &.active{
        background-color: rgba(151, 154, 190, .1);
    }
    .left {
        display: flex;
        align-items: center;
        color: #fff;
        .img-wapper {
            position: relative;
            width: 26px;
            height: 26px;
            .token-icon {
                width: 100%;
                height: 100%;
                border-radius: 100%;
            }
            .chain-icon {
                position: absolute;
                right: 0;
                bottom: 0;
                width: 10px;
                height: 10px;
            }
        }
        .token-name {
            font-size: 14px;
            font-weight: 600;
            line-height: 16.8px;
            margin-left: 10px;
        }
    }
    .right {
        font-size: 14px;
        font-weight: 400;
        line-height: 16.8px;
        color: #fff;
        text-align: right;
        .r-price {
            color: rgba(151, 154, 190, 1);
            margin-top: 3px;
        }
    }
`

interface Props {
    token: Token;
    chain: Chain;
    isSelected: boolean;
    loading: boolean;
    balances: any;
    onTokenChange: (token: Token) => void;
}

export default function TokenRow({ token, chain, isSelected, loading, balances, onTokenChange }: Props) {

    // const { balance, loading } = useTokenBalance({
    //     currency: token,
    //     updater: 1,
    //     isNative: chain?.nativeCurrency.symbol === token?.symbol,
    //     isPure: false,
    // })
    const prices = usePriceStore((store) => store.price);
    const balanceKey = token.isNative ? 'native' : token.address

    return <Container className={isSelected ? 'active' : ''} onClick={() => {
        onTokenChange(token)

    }}>
        <div className="left">
            <div className="img-wapper">
                <Image cls="token-icon" src={token.icon} />
                <Image cls="chain-icon" src={chain.icon} />
            </div>
            <div className="token-name">{token.symbol}</div>
        </div>
        <div className="right">
            {
                loading ? <></> : <div>
                    <div>{ balanceFormated(balances[balanceKey]) }</div>
                    <div className="r-price">${ balanceFormated(Number(prices[token.symbol]) * balances[balanceKey], 2) }</div>
                </div>
            }
        </div>
    </Container>
}