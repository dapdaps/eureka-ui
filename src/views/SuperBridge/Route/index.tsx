import styled from 'styled-components';
import Big from 'big.js';

import { usePriceStore } from '@/stores/price';
import { balanceFormated, percentFormated, addressFormated } from '@/utils/balance';

import type { Token } from '@/types';
import type { QuoteRequest, QuoteResponse, ExecuteRequest } from 'super-bridge-sdk'

const Contanier = styled.div<{active: boolean, canClick: any}>`
    /* background-color: rgba(55, 58, 83, 1); */
    min-height: 78px;
    border-radius: 10px;
    border: ${({ active }) => `1px solid ${active ? 'rgba(235, 244, 121, .3)': 'rgba(55, 58, 83, 1)'}`} ;
    padding: 10px 16px;
    cursor: ${({ canClick }) => `${canClick ? 'pointer' : 'default'}`} ;
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
            color: #fff;
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
    showOutputTitle?: boolean;
    active?: boolean;
    route: QuoteResponse;
    toToken: Token;
    onClick?: () => void;
}

export default function Route(
    { showOutputTitle = true, active = false, onClick, route, toToken } : Props
    ) {
    const prices = usePriceStore((store) => store.price);
        

    return <Contanier active={active} canClick={onClick} onClick={() => {
        onClick && onClick()
    }}>
        <BridgeSummary>
            <div className="bridge-names">
                <img className="img" src={route.icon} />
                <div className="name">{route.bridgeName}</div>
            </div>
            <div className="tags">
                <div className="tag fastest">Fastest</div>
                <div className="tag best-return">Best Return</div>
            </div>
        </BridgeSummary>
        <BridgeAmount>
            <div className="output">
                {
                    showOutputTitle && <div className="title">Est. output</div>
                }
                <img className="token-icon" src="https://ipfs.near.social/ipfs/bafkreiashn3iawpvw66ejmyo3asdn4m5x25haijwyhubxjuzw7g7c7qq7a" />
                <div className="token-amount">~{ balanceFormated(route.receiveAmount ? new Big(route.receiveAmount).div(10 ** toToken.decimals).toString() : '') }</div>
                {/* <div> + </div>
                <img className="token-icon" src="https://ipfs.near.social/ipfs/bafkreiashn3iawpvw66ejmyo3asdn4m5x25haijwyhubxjuzw7g7c7qq7a" />
                <div className="token-amount">~3380.49</div> */}
            </div>
            <div className="cost-wapper">
                <div>~{route.duration} min｜Gas ${ balanceFormated(route.feeType === 1 ? (prices as any)['ETH'] * Number(route.gas) : route.gas) }</div>
            </div>
        </BridgeAmount>
    </Contanier>
}