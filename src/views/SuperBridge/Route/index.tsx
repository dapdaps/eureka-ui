import Big from 'big.js';
import styled from 'styled-components';
import type { ExecuteRequest, QuoteRequest, QuoteResponse } from 'super-bridge-sdk';

import { usePriceStore } from '@/stores/price';
import type { Chain, Token } from '@/types';
import { addressFormated, balanceFormated, percentFormated } from '@/utils/balance';

const Contanier = styled.div<{ active: boolean; canClick: any }>`
  /* background-color: rgba(55, 58, 83, 1); */
  min-height: 78px;
  border-radius: 10px;
  border: ${({ active }) => `1px solid ${active ? 'rgba(235, 244, 121, .3)' : 'rgba(55, 58, 83, 1)'}`};
  padding: 10px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s;
  cursor: ${({ canClick }) => `${canClick ? 'pointer' : 'default'}`};
  opacity: ${({ active }) => (active ? '1' : '.6')};
`;

const BridgeSummary = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 5px;
  .bridge-names {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 5px;
    .img {
      width: 30px;
      height: 30px;
      border-radius: 100%;
    }
    .name {
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 5px;
      color: #fff;
    }
  }

  .tags {
    display: flex;
    align-items: flex-start;
    gap: 5px;
    flex-wrap: wrap;
    padding-top: 7px;
    .tag {
      font-size: 10px;
      font-weight: 400;
      border-radius: 4px;
      height: 17px;
      line-height: 17px;
      padding: 0 8px;
      &.fastest {
        color: rgba(123, 144, 255, 1);
        background-color: rgba(123, 144, 255, 0.2);
      }
      &.best-return {
        color: rgba(106, 255, 228, 1);
        background-color: rgba(106, 255, 228, 0.2);
      }
    }
    .activity-tag {
      font-size: 10px;
      font-weight: 400;
      line-height: 17px;
      color: rgba(235, 244, 121, 1);
      background: rgba(235, 244, 121, 0.2);
      height: 17px;
      padding: 0 8px;
      border-radius: 4px;
    }
  }
`;

const BridgeAmount = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: space-between; */
  /* margin-top: 5px; */
  .cost-wapper {
    display: flex;
    align-items: center;
    font-size: 10px;
    font-weight: 400;
    line-height: 16.8px;
    color: rgba(151, 154, 190, 1);
    gap: 5px;
    white-space: nowrap;
  }

  .output {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    gap: 10px;
    justify-content: flex-end;
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
`;

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

const ActivityTags: any = {
  // Rango: 'Campaign',
  // Swing: 'Campaign'
  Rubic: 'Campaign'
};

export default function Route({
  showOutputTitle = true,
  active = false,
  onClick,
  route,
  best,
  fast,
  fromChain,
  toToken
}: Props) {
  const prices = usePriceStore((store) => store.price);

  return (
    <Contanier
      active={active}
      canClick={onClick}
      onClick={() => {
        onClick && onClick();
      }}
    >
      <BridgeSummary>
        <div className="bridge-names">
          <img className="img" src={route.icon} key={route.icon} />
          <div className="name">
            <div>{route.bridgeType}</div>
            {/* : {route.bridgeName} */}
          </div>
        </div>

        <div className="tags">
          {ActivityTags[route.bridgeType] && <div className="activity-tag">{ActivityTags[route.bridgeType]}</div>}
          {best === route && <div className="tag best-return">Cheapest</div>}
          {fast === route && <div className="tag fastest">Fastest</div>}
        </div>
      </BridgeSummary>
      <BridgeAmount>
        <div className="output">
          <div className="token-amount">
            ~
            {balanceFormated(
              route.receiveAmount ? new Big(route.receiveAmount).div(10 ** toToken.decimals).toString() : '',
              6
            )}
          </div>
        </div>
        <div className="cost-wapper">
          <div>
            ~{route.duration} min｜Fee $
            {balanceFormated(
              route.feeType === 1 ? (prices as any)[fromChain.nativeCurrency.symbol] * Number(route.fee) : route.fee
            )}
          </div>
        </div>
      </BridgeAmount>
    </Contanier>
  );
}
