import { useState, useRef, useCallback, useEffect } from "react";
import styled from 'styled-components';

import useTokenBalance from '@/hooks/useCurrencyBalance';
import { balanceFormated, percentFormated } from '@/utils/balance';

import Loading from '@/components/Icons/Loading';

import type { Chain, Token } from '@/types';

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
    }
`

interface Props {
    token: Token;
    chain: Chain;
    isSelected: boolean;
    onTokenChange: (token: Token) => void;
}

export default function TokenRow({ token, chain, isSelected, onTokenChange }: Props) {

    // const { balance, loading } = useTokenBalance({
    //     currency: token,
    //     updater: 1,
    //     isNative: chain?.nativeCurrency.symbol === token?.symbol,
    //     isPure: false,
    // })

    return <Container className={isSelected ? 'active' : ''} onClick={() => {
        onTokenChange(token)

    }}>
        <div className="left">
            <div className="img-wapper">
                <img className="token-icon" src={token.icon} />
                <img className="chain-icon" src={chain.icon} />
            </div>
            <div className="token-name">{token.symbol}</div>
        </div>
        <div className="right">
            {/* {
                loading ? <Loading size={12} /> : <span>{ balanceFormated(balance) }</span>
            } */}
        </div>
    </Container>
}