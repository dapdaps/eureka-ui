import { useCallback, useEffect,useRef, useState } from 'react';
import styled from 'styled-components';

import type { Chain } from '@/types';
import { balanceFormated, percentFormated } from '@/utils/balance';

const Container = styled.div`
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 12px;
    padding: 12px;
    min-height: 135px;
`

const Apart = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    font-weight: 500;
    line-height: 16.56px;
    font-size: 14px;
    .title {
        color: rgba(151, 154, 190, 1);
    }
    .amount-wapper {
        text-align: right;
        .amount {
            color: #fff;
        }
        .price {
            color: rgba(151, 154, 190, 1);
        }
    }
    &:not(:first-child) {
        margin-top: 10px;
    }
`


interface Props {
    receive: number | string;
    loading: boolean;
    toChain: Chain | undefined;
    receivePrice: string | number;
}

export default function ReceiveDesc({
    receive, loading, toChain, receivePrice,
}: Props) {
    return <Container>
        <Apart>
            <div className="title">Receiving Amount</div>
            <div className="amount-wapper ">
                <div className="amount">{balanceFormated(receive)} {toChain?.nativeCurrency.symbol}</div>
                <div className="price">(~${balanceFormated(receivePrice, 2)})</div>
            </div>
        </Apart>
        <Apart>
            <div className="title">Total Fee</div>
            <div className="amount-wapper ">
                <div className="amount">0.0045 ETH</div>
                <div className="price">(~$18.16)</div>
            </div>
        </Apart>
    </Container>
}