import { useDebounceFn } from 'ahooks';
import Big from 'big.js'
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom'
import styled from 'styled-components';

// import useTokenBalance from '@/hooks/useTokenBalance';
import Loading from '@/components/Icons/Loading';
import useTokenBalance from '@/hooks/useCurrencyBalance';
import { balanceFormated, valueFormated } from '@/utils/balance';

const Container = styled.div`
    .token-row {
        height: 54px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        cursor: pointer;
        &.active {
            background-color: rgba(151, 154, 190, .1);
        }
        &:hover {
            background-color: rgba(151, 154, 190, .1);
        }
        .token-desc {
            display: flex;
            align-items: center;

            .token-imgs {
                position: relative;
                width: 26px;
                height: 26px;
                .token-img {
                    width: 100%;
                    height: 100%;
                }
                .chain-img {
                    width: 10px;
                    height: 10px;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                }
            }
            .token-names {
                margin-left: 10px;
                .token-name {
                    font-size: 16px;
                    font-weight: 600;
                    line-height: 19.2px;
                    color: #fff;
                }
                .chain-name {
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 16.8px;
                    color: rgba(151, 154, 190, 1);
                    margin-top: 3px;
                }
            }
        }
        .balance {
            font-size: 16px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
        }
    }
  
`

export const ChainTokens = ({
    tokenItem,
    token,
    chain,
    onClick,
}: {
    tokenItem: any;
    token: any;
    chain: any;
    onClick: () => void;
}) => {
    const { balance, loading } = useTokenBalance({
        currency: tokenItem, 
        updater: 1, 
        isNative: tokenItem.isNative, 
        isPure: false,
    })

    return <Container onClick={onClick}>
        <div className={"token-row" + (tokenItem.symbol === token.symbol ? ' active' : '')}>
            <div className="token-desc">
                <div className="token-imgs">
                    <img src={tokenItem.icon} className="token-img" />
                    <img src={chain.icon} className="chain-img" />
                </div>
                <div className="token-names">
                    <div className="token-name">{tokenItem.name}</div>
                    <div className="chain-name">{chain.chainName}</div>
                </div>
            </div>
            <div className="balance">{ loading ? <Loading size={20}/> :  balanceFormated(balance) }</div>
        </div>
    </Container>

};

export default ChainTokens;
