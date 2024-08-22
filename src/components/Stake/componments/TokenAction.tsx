import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import { balanceFormated, percentFormated } from '@/utils/balance';

import { ArrowDown, ArrowUp } from './Arrows'

const InputAction = styled.div`
    height: 100px;
    border-radius: 12px;
    border: 1px solid rgba(55, 58, 83, 1);
    background-color: rgba(46, 49, 66, 1);
    padding: 15px;
    &.spe {
        margin-top: 10px;
    }
`

const InputActionTitle = styled.div`
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    color: rgba(151, 154, 190, 1);
`

const TokenActionWapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    .input {
        color: #fff;
        font-size: 20px;
        font-weight: 500;
        border: none;
        height: 24px;
        width: 200px;
    }
    .token {
        height: 35px;
        border-radius: 8px;
        min-width: 106px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        cursor: pointer;
        &.t-border {
            border: 1px solid rgba(55, 58, 83, 1);
        }
        .chian-token {
            position: relative;
            width: 20px;
            height: 20px;
            .token-icon {
                display: block;
                width: 100%;
                height: 100%;
            }
            .chain-icon {
                position: absolute;
                right: 0;
                bottom: 0;
                width: 8px;
                height: 8px;
            }
        }
        .token-name {
            color: #fff;
            font-size: 16px;
            font-weight: 400;
        }
        .arrow {

        }
    }
`

const BalanceWapper = styled.div`
    display: flex;
    justify-content: center;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    color: rgba(151, 154, 190, 1);
    margin-top: 5px;
    .price-value {
        
    }
    .balance-value {
        .balance-text {
            color: #fff;
            text-decoration: underline;
            cursor: pointer;
        }
    }
`

interface Props {
    recived: any
    outputMoney: any;
    balance: any;
    chainIcon: any;
    tokenIcon: any;
    symbol: any;
    title?: string;
    balanceLoading: boolean;
    tokenAmountChange?: any;
    tokenChange?: any;
}

export default function TokenAction({
    recived,
    outputMoney,
    balance,
    chainIcon,
    tokenIcon,
    symbol,
    title,
    balanceLoading,
    tokenAmountChange,
    tokenChange,
}: Props) {

    return <InputAction className="spe">
        <InputActionTitle>{title}</InputActionTitle>

        <TokenActionWapper>
            <input className="input" placeholder='0' disabled={!tokenAmountChange} value={recived} onChange={(e) => {
                tokenAmountChange && tokenAmountChange(e.target.value)
                
            }} />
            <div className={"token" + (tokenChange ? ' t-border' : '')} onClick={() => {
                tokenChange && tokenChange()
            }}>
                <div className="chian-token">
                    <img src={tokenIcon} className="token-icon" />
                    <img src={chainIcon} className="chain-icon" />
                </div>
                <div className='token-name'>{symbol}</div>
                <div className='arrow'>{
                    tokenChange && <ArrowDown />
                }</div>
            </div>
        </TokenActionWapper>
        <BalanceWapper>
            <div className="price-value">{outputMoney}</div>
            <div className="balance-value">Balance:<span onClick={() => {
                (tokenAmountChange && !balanceLoading) && tokenAmountChange(balance)
            }} className={tokenAmountChange && "balance-text"}>
                {balanceLoading ? <Loading size={14} /> : balanceFormated(balance)} {symbol}
            </span></div>
        </BalanceWapper>
    </InputAction>
}