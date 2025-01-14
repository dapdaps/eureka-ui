import Big from 'big.js';
import styled from 'styled-components';
import type { ExecuteRequest, QuoteRequest, QuoteResponse } from 'super-bridge-sdk';

import { timeFormate } from '@/components/BridgeX/Utils';
import Popover, { PopoverPlacement, PopoverTrigger } from '@/components/popover';
import { CampaignData } from '@/data/campaign';
import { usePriceStore } from '@/stores/price';
import type { Chain, Token } from '@/types';
import { addressFormated, balanceFormated, percentFormated } from '@/utils/balance';
import { StatusType } from '@/views/Odyssey/components/Tag';

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
    width: 60px;
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

const ActivityTags: any = {};
Object.values(CampaignData).forEach((campaign) => {
  if (!campaign.odyssey) return;
  campaign.odyssey.forEach((ody) => {
    if (ody.status !== StatusType.ongoing || !ody.superBridgeRoutes) {
      return;
    }
    ody.superBridgeRoutes.forEach((r: any) => {
      ActivityTags[r] = 'Campaign';
    });
  });
});

export const BoldText = ({ text }: { text: string }) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <span key={index} style={{ fontWeight: 700 }}>
              {part.slice(2, -2)}
            </span>
          );
        }
        return part;
      })}
    </>
  );
};

const getActiveCampaigns = () => {
  return Object.values(CampaignData)
    .filter((campaign) => campaign.status === StatusType.ongoing && campaign.odyssey?.[0]?.superBridgeRoutes)
    .map((campaign) => campaign.odyssey?.[0])
    .filter(Boolean);
};

const Route = ({ showOutputTitle = true, active = false, onClick, route, best, fast, fromChain, toToken }: Props) => {
  const prices = usePriceStore((store) => store.price);
  const activeCampaigns = getActiveCampaigns();

  const checkBridgeRouteMatch = (campaign: any, route: any) => {
    if (!campaign.superBridgeRoutes || !route.bridgeType) return false;

    if (Number(campaign.chainId) !== Number(toToken.chainId)) return false;

    return campaign.superBridgeRoutes.includes(route.bridgeType);
  };

  let feeCostUSD = '0';
  if (route.feeType === 1) {
    const symbol = fromChain.chainId === 137 ? 'ETH' : fromChain.nativeCurrency.symbol;
    feeCostUSD = ((prices as any)[symbol] * Number(route.fee)).toString();
  } else if (route.feeType === 2) {
    feeCostUSD = route.fee as string;
  } else if (route.feeType === -1) {
    feeCostUSD = ((prices as any)[toToken.symbol] * Number(route.fee)).toString();
  }

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
          <img
            className="img"
            src={route.bridgeType === 'Unizen' ? '/images/alldapps/icon-unizen.svg' : route.icon}
            key={route.icon}
          />
          <div className="name">
            <div>{route.bridgeType}</div>
          </div>
        </div>

        <div className="tags">
          {(() => {
            const matchedCampaign = activeCampaigns.find(
              (campaign: any) =>
                Number(campaign.chainId) === Number(toToken.chainId) && checkBridgeRouteMatch(campaign, route)
            );

            return matchedCampaign ? (
              <Popover
                trigger={PopoverTrigger.Hover}
                placement={PopoverPlacement.Right}
                contentClassName={`backdrop-blur-[10px]`}
                content={
                  <div
                    className="w-[290px] p-[14px] border border-[#333648] bg-[#1F2229] text-[#979ABE] font-Montserrat rounded-lg"
                    style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)' }}
                  >
                    <BoldText text={matchedCampaign.superBridgeSlogen} />
                  </div>
                }
              >
                <div className="activity-tag">Campaign</div>
              </Popover>
            ) : null;
          })()}
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
            {timeFormate(route.duration)} ｜ Fee ${Number(feeCostUSD) > 0 ? balanceFormated(feeCostUSD) : '~'}
          </div>
        </div>
      </BridgeAmount>
    </Contanier>
  );
};

export default Route;
