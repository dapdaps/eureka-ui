import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import { balanceFormated, percentFormated } from '@/utils/balance';

import { ArrowDown, ArrowUp } from './Arrows'

const MsgWapper = styled.div`
    position: relative;
    padding: 20px;
`

const MsgHeader = styled.div`
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    color: rgba(151, 154, 190, 1);
`

const MsgFold = styled.div`
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 15px;
`

const MsgDetail = styled.div`
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 10px;
    padding: 12px;
    margin-top: 12px;
`

const MsgDetailItem = styled.div`
    display: flex;
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    justify-content: space-between;
    align-items: center;
    color: rgba(151, 154, 190, 1);
    &:not(:first-child) {
        margin-top: 10px;
    }
`
interface Props {
    exchangeRate: any;
    transactionCostMoney: any;
    rewardFee: any;
    symbol: string;
}

export default function Msg({
    exchangeRate,
    transactionCostMoney,
    rewardFee,
    symbol,
}: Props) {
    const [fold, setFold] = useState(false)

    return <MsgWapper>
    <MsgHeader>1 ETH = {exchangeRate ? balanceFormated(exchangeRate) : <Loading size={14} />} {symbol}</MsgHeader>
    <MsgFold onClick={() => {
        setFold(!fold)
    }}>
        {
            !fold ? <ArrowDown /> : <ArrowUp />
        }
    </MsgFold>
    {
        fold && <MsgDetail>
            <MsgDetailItem>
                <div>Transaction Cost</div>
                <div>{transactionCostMoney}</div>
            </MsgDetailItem>
            <MsgDetailItem>
                <div>Reward Fee</div>
                <div>{ rewardFee }</div>
            </MsgDetailItem>
        </MsgDetail>
    }
</MsgWapper>
}