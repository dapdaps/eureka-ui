import Big from 'big.js';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import Refresh from '@/components/Icons/Refresh';
import Popover, { PopoverPlacement, PopoverTrigger } from '@/components/popover';
import { CampaignData } from '@/data/campaign';
import useAccount from '@/hooks/useAccount';
import { StyledFlex } from '@/styled/styles';
import { balanceFormated } from '@/utils/balance';
import { StatusType } from '@/views/Odyssey/components/Tag';
import DotFlashing from '@/views/SuperBridge/DotFlashing';

import { StyledBestPrice } from '../../styles';
import DexIcon from '../DexIcon';
import { StyledActionButton } from '../InputCard/styles';
import {
  StyledContainer,
  StyledDesc,
  StyledEmpty,
  StyledHeader,
  StyledItem,
  StyledList,
  StyledTitle,
  StyledTitleName,
  StyledTokenIcon
} from './styles';

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

const MarketsModal = ({
  markets = [],
  loading,
  bestTrade,
  outputCurrency,
  errorTips,
  onSelectMarket,
  trade,
  onRefresh
}: any) => {
  const router = useRouter();
  const { chainId } = useAccount();

  const getActiveCampaigns = () => {
    return Object.values(CampaignData)
      .filter((campaign) => campaign.status === StatusType.ongoing && campaign.odyssey?.[0]?.superSwapRoutes)
      .map((campaign) => campaign.odyssey?.[0])
      .filter(Boolean);
  };

  const activeCampaigns = getActiveCampaigns();

  const matchedCampaign = useMemo(
    () => (chainId ? activeCampaigns.find((campaign: any) => Number(campaign.chainId) === Number(chainId)) : null),
    [chainId, activeCampaigns]
  );

  const checkRouteMatch = (campaign: any, item: any) => {
    if (!campaign.superSwapRoutes || !item.name) return false;

    if (Number(campaign.chainId) === 42161) {
      // arb
      return campaign.superSwapRoutes.includes(item.name) && item.from === 'Unizen';
    }

    return campaign.superSwapRoutes.includes(item.name);
  };

  const treatedMarkets = useMemo(() => {
    const mapping: any = {};
    markets?.forEach((market: any) => {
      const dex = market?.name?.split(' ')?.[0];
      if (
        dex === 'Camelot' ||
        !mapping[dex] ||
        (mapping[dex] && Big(market.outputCurrencyAmount).gt(mapping?.[dex]?.outputCurrencyAmount))
      ) {
        mapping[dex] = market;
      }
    });
    const values: any = Object.values(mapping);
    const idx = values?.findIndex((market: any) => market?.from === 'Unizen' && market?.name.indexOf('Camelot') > -1);
    const array = values?.filter((market: any) => market?.name.indexOf('Camelot') === -1);
    values?.[idx] && array.unshift(values?.[idx]);
    return array;
  }, [markets]);

  return (
    <>
      <StyledContainer>
        <StyledHeader>
          <div>{treatedMarkets?.length || 0} Providers:</div>
          <div className="arrow">
            {loading ? (
              <DotFlashing val={treatedMarkets?.length || 0} />
            ) : (
              <StyledActionButton onClick={onRefresh}>
                <Refresh refreshing={loading} size={16} />
              </StyledActionButton>
            )}
          </div>
        </StyledHeader>
        <StyledList id="super-swap-dexs">
          {treatedMarkets.map((item: any, i: number) => (
            <StyledItem
              isActive={treatedMarkets?.[0]?.name === item.name}
              key={item.name}
              onClick={() => {
                onSelectMarket(item);
              }}
              style={{
                opacity: i < 2 ? 1 : 0.6
              }}
            >
              <StyledFlex justifyContent="space-between">
                <StyledFlex gap="6px">
                  <DexIcon src={item.logo || '/assets/dapps/default_token.png'} aggregator={item.from} />
                  <StyledTitle>
                    <StyledTitleName>{item.name}</StyledTitleName>
                    <Popover
                      trigger={PopoverTrigger.Hover}
                      placement={PopoverPlacement.Right}
                      contentClassName={`backdrop-blur-[10px]`}
                      content={(() => {
                        const matchedCampaign = activeCampaigns.find((campaign: any) =>
                          checkRouteMatch(campaign, item)
                        );
                        return matchedCampaign ? (
                          <div
                            className="w-[290px] p-[14px] border border-[#333648] bg-[#1F2229] text-[#979ABE] font-Montserrat rounded-lg"
                            style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)' }}
                          >
                            <BoldText text={matchedCampaign.superSwapSlogen} />
                          </div>
                        ) : null;
                      })()}
                    >
                      {activeCampaigns.some((campaign: any) => checkRouteMatch(campaign, item)) ? (
                        <StyledBestPrice>Campaign</StyledBestPrice>
                      ) : (
                        bestTrade?.name === item.name && <StyledBestPrice>Cheapest</StyledBestPrice>
                      )}
                    </Popover>
                  </StyledTitle>
                </StyledFlex>
                <StyledFlex gap="6px" style={{ flexShrink: 0 }}>
                  <StyledTitle>
                    ~
                    {balanceFormated(
                      Big(item.outputCurrencyAmount || 0)
                        // .mul(1 - slippage / 100)
                        .toString(),
                      3
                    )}
                  </StyledTitle>
                  {outputCurrency?.icon && <StyledTokenIcon src={outputCurrency.icon} />}
                </StyledFlex>
              </StyledFlex>
              <StyledFlex gap="20px" justifyContent="space-between" style={{ marginTop: 16 }}>
                <StyledFlex gap="5px" alignItems="center">
                  <StyledDesc>Price Impact</StyledDesc>
                  <StyledDesc>
                    <span className={`price-impact-${item.priceImpactType}`}>{item.priceImpact || '-'}%</span>
                  </StyledDesc>
                </StyledFlex>
                <StyledFlex gap="5px" alignItems="center">
                  <StyledDesc>Fees</StyledDesc>
                  <StyledDesc>${balanceFormated(item.gasUsd, 4)}</StyledDesc>
                </StyledFlex>
              </StyledFlex>
            </StyledItem>
          ))}
          {treatedMarkets.length === 0 && (
            <StyledEmpty>
              <svg width="36" height="46" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.5 20.3704C3.70333 18.9517 1 15.2915 1 11C1 5.47715 5.47715 1 11 1C15.9212 1 20.0121 4.55476 20.845 9.2366"
                  stroke="#979ABE"
                  stroke-opacity="0.3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.5 37.2705C18.2642 40.1097 21.4113 42.0001 25 42.0001C30.5228 42.0001 35 37.5229 35 32.0001C35 29.2027 33.8514 26.6736 32 24.8586"
                  stroke="#979ABE"
                  stroke-opacity="0.3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-dasharray="2 2"
                />
                <path
                  d="M29.7667 3.96638L29.7664 3.96682L29.7667 3.96638ZM29.5549 3.60563L6.06758 24.2745C5.58308 24.7009 5.88463 25.5 6.53001 25.5H15.5593L3.32516 43.6246C2.87606 44.2899 3.71787 45.0647 4.34373 44.5619L33.37 21.2457C33.8854 20.8318 33.5927 20 32.9317 20H20.4269L30.6024 4.51556C31.0505 3.8336 30.1676 3.0665 29.5549 3.60563Z"
                  stroke="#979ABE"
                  stroke-opacity="0.3"
                  stroke-linejoin="round"
                />
              </svg>
              <div className="empty-text">{errorTips}</div>
            </StyledEmpty>
          )}
        </StyledList>
      </StyledContainer>
      {matchedCampaign?.superSwapBanner && (
        <img
          className="w-[328px] h-[108px] rounded-[12px] absolute right-0 cursor-pointer"
          src={matchedCampaign.superSwapBanner}
          onClick={() => router.push(matchedCampaign.link || '')}
          alt=""
        />
      )}
    </>
  );
};

export default MarketsModal;
