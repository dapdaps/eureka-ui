import { useRouter } from 'next/router';
import { useCallback, useEffect,useRef, useState } from 'react';
import styled from 'styled-components';

import type { Chain, Token } from '@/types';
import { balanceFormated, percentFormated } from '@/utils/balance';

import SubmitBtn from './SubmitBtn';

const Container = styled.div`
    position: absolute;
    left: 100%;
    top: 50px;
`

const SubEar = styled.div`
    width: 8px;
    height: 286px;
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 0 9999px 9999px 0;
    background: rgba(37, 40, 56, 1);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
`

const SubPanel = styled.div`
    width: 206px;
    height: 264px;
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 0 8px 8px 0;
    background: rgba(46, 49, 66, 1);
    margin-top: 11px;
    padding: 30px 20px;
    .total-wapper {
        height: 100px;
        border-radius: 10px;
        border: 1px solid rgba(55, 58, 83, 1);
        background: linear-gradient(180deg, #0C0E1A 0%, #262836 100%);
        font-size: 16px;
        font-weight: 500;
        line-height: 18.93px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 10px 0;
        .total {
            color: rgba(151, 154, 190, 1);
        }
        .amount {
            color: #fff;
        }
        .dollar {
            color: rgba(151, 154, 190, 1);
        }
    }
`


const Record = styled.div`
    font-size: 14px;
    font-weight: 500;
    line-height: 16.56px;
    text-align: center;
    color: rgba(151, 154, 190, 1);
    margin-top: 10px;
    cursor: pointer;
`

interface Props {
    disabled: boolean;
    payPrice: number | string | undefined;
    pay: number | string | undefined;
    token: Token | undefined;
    loading: boolean;
    fromChain: Chain | undefined;
    onClick: () => void;
}

export default function SubmitPanel({
    disabled, payPrice, pay, token, loading, fromChain, onClick
}: Props) {
    const router = useRouter();

    return <Container>
        <SubEar />
        <SubPanel>
            <div className="total-wapper">
                <div className="total">Total</div>
                <div className="amount">{pay ? balanceFormated(pay, 4) : '-'} {token?.symbol}</div>
                <div className="dollar">(~${payPrice ? balanceFormated(payPrice, 2) : '-'})</div>
            </div>
            <SubmitBtn
                disabled={disabled}
                loading={loading}
                fromChain={fromChain}
                onClick={onClick}
            />
            <Record onClick={() => {
                router.push('/gas-station/transaction')
            }}>Records</Record>
        </SubPanel>

    </Container>
}