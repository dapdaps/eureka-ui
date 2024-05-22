import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import { balanceFormated, percentFormated } from '@/utils/balance';

const Summary = styled.div`
    display: flex;
    padding: 0 20px 20px;
    border-bottom: 1px solid rgba(55, 58, 83, 1);
    align-items: center;
    justify-content: space-between;
`

const SummaryItem = styled.div`
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    .title {
        color: rgba(151, 154, 190, 1);
    }
    .amount {
        margin-top: 5px;
        color: rgba(255, 255, 255, 1);
    }
`

interface Props {
    ethLoading: boolean;
    ethBalance: any;
    ezETHLoading: boolean;
    ezETHbalance: any;
    apr: any;
    currentToken: any;
    symbol: string;
}

export default function Header({
    ethLoading,
    ethBalance,
    ezETHLoading,
    ezETHbalance,
    apr,
    currentToken,
    symbol,
}: Props) {
    return <Summary>
    <SummaryItem>
        <div className="title">Available to stake</div>
        <div className="amount">{ethLoading ? <Loading size={14} /> : balanceFormated(ethBalance)} {currentToken.symbol}</div>
    </SummaryItem>
    <SummaryItem>
        <div className="title">Staked amount</div>
        <div className="amount">{ezETHLoading ? <Loading size={14} /> : balanceFormated(ezETHbalance || 0)} {symbol}</div>
    </SummaryItem>
    <SummaryItem>
        <div className="title">APR</div>
        <div className="amount">{percentFormated(apr || 0)}</div>
    </SummaryItem>
</Summary>
}