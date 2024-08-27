import Big from 'big.js';
import styled from 'styled-components';
import type { ExecuteRequest,QuoteRequest, QuoteResponse } from 'super-bridge-sdk'

import { usePriceStore } from '@/stores/price';
import type { Chain,Token } from '@/types';
import { addressFormated,balanceFormated, percentFormated } from '@/utils/balance';

const Contanier = styled.div<{active: boolean, canClick: any}>`
    /* background-color: rgba(55, 58, 83, 1); */
    min-height: 78px;
    border-radius: 10px;
    border: ${({ active }) => `2px solid ${active ? 'rgba(235, 244, 121, .3)': 'rgba(55, 58, 83, 1)'}`} ;
    padding: 10px 16px;
    cursor: ${({ canClick }) => `${canClick ? 'pointer' : 'default'}`} ;
    .name {
        color: ${({ active }) => !active ? 'rgba(151, 154, 190, 1)' : '#fff'} ;
    }
`

const BridgeSummary = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .bridge-names {
        display: flex;
        align-items: center;
        gap: 10px;
        .img {
            width: 30px;
            height: 30px;
            border-radius: 100%;
        }
        .name {
            font-size: 16px;
            font-weight: 500;
        }
    }
    .tags {
        display: flex;
        align-items: center;
        gap: 10px;
        .tag {
            font-size: 10px;
            font-weight: 400;
            border-radius: 4px;
            padding: 5px;
            &.fastest {
                color: rgba(123, 144, 255, 1);
                background-color: rgba(123, 144, 255, .2);
            }
            &.best-return {
                color: rgba(106, 255, 228, 1);
                background-color: rgba(106, 255, 228, .2);
            }
        }
    }
`

const BridgeAmount = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 5px;
    .output {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        line-height: 19.2px;
        gap: 10px;
        .title {
            color: rgba(151, 154, 190, 1);
        }
        .token-icon {
            width: 22px;
            height: 22px;
        }
        .token-amount {
            color: rgba(255, 255, 255, 1);
        }
    }
    .cost-wapper {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        line-height: 16.8px;
        color: rgba(151, 154, 190, 1);
        gap: 10px;
    }

`

interface Props {
    fromChain: Chain;
    showOutputTitle?: boolean;
    active?: boolean;
    route: QuoteResponse;
    toToken: Token;
    best: QuoteResponse | null;
    fast: QuoteResponse | null;
    onClick?: () => void;
}

export default function Route(
    { showOutputTitle = true, active = false, onClick, route, best, fast, fromChain, toToken } : Props
    ) {
    const prices = usePriceStore((store) => store.price);
        

    return <Contanier active={active} canClick={onClick} onClick={() => {
        onClick && onClick()
    }}>
        <BridgeSummary>
            <div className="bridge-names">
                <img className="img" src={route.icon} key={route.icon} />
                <div className="name">{route.bridgeType}: {route.bridgeName}</div>
            </div>
            <div className="tags">
                {
                    best === route && <div className="tag best-return">Cheapest</div>
                }
                {
                    fast === route && <div className="tag fastest">Fastest</div>
                }
            </div>
        </BridgeSummary>
        <BridgeAmount>
            <div className="output">
                {
                    showOutputTitle && <div className="title">Est. output</div>
                }
                <img className="token-icon" src={toToken.icon} />
                <div className="token-amount">~{ balanceFormated(route.receiveAmount ? new Big(route.receiveAmount).div(10 ** toToken.decimals).toString() : '') }</div>
                {/* <div> + </div>
                <img className="token-icon" src="https://ipfs.near.social/ipfs/bafkreiashn3iawpvw66ejmyo3asdn4m5x25haijwyhubxjuzw7g7c7qq7a" />
                <div className="token-amount">~3380.49</div> */}
            </div>
            <div className="cost-wapper">
                <div>~{route.duration} min｜Fee ${ balanceFormated(route.feeType === 1 ? (prices as any)[fromChain.nativeCurrency.symbol] * Number(route.fee) : route.fee) }</div>
            </div>
        </BridgeAmount>
    </Contanier>
}