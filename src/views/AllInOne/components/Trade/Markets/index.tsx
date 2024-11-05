import Big from 'big.js';
import { memo, useState } from 'react';

import ArrowIcon from '@/components/Icons/ArrowIcon';
import { useSettingsStore } from '@/stores/settings';
import { balanceFormated } from '@/utils/balance';
import CloseIcon from '@/views/AllInOne/components/Trade/CloseIcon';

import {
  StyledMarketArrow,
  StyledMarketItem,
  StyledMarketItemBalance,
  StyledMarketItemContent,
  StyledMarketItemDetail,
  StyledMarketItemIcon,
  StyledMarketItemLeft,
  StyledMarketItemName,
  StyledMarketItemRight,
  StyledMarketItemText,
  StyledMarketItemTextLeft,
  StyledMarketItemTextRight,
  StyledMarketItemToken,
  StyledMarketsContainer,
  StyledMarketTag
} from '../styles';

const Markets = ({ isDropdown, chain, market, markets, bestTrade, outputCurrency, onSelectMarket }: any) => {
  const slippage: any = useSettingsStore((store: any) => store.slippage);
  const [detail, setDetail] = useState<any>();
  const getMarketItemElement = (marketItem: any) => {
    return (
      <StyledMarketItem
        onClick={() => onSelectMarket(marketItem)}
        active={marketItem.name === market?.name}
        color={chain.selectBgColor}
        key={marketItem.name}
      >
        {getMarketItemLeft(marketItem)}
        <StyledMarketItemRight>
          <StyledMarketItemToken src={outputCurrency.icon} />
          <StyledMarketItemBalance>{balanceFormated(marketItem.outputCurrencyAmount, 2)}</StyledMarketItemBalance>
          <StyledMarketArrow
            onClick={(ev) => {
              ev.stopPropagation();

              setDetail(marketItem);
            }}
          >
            <ArrowIcon size={10} />
          </StyledMarketArrow>
        </StyledMarketItemRight>
      </StyledMarketItem>
    );
  };

  const getMarketItemLeft = (market: any) => (
    <StyledMarketItemLeft>
      <StyledMarketItemIcon src={market.logo} />
      <StyledMarketItemName>{market.name}</StyledMarketItemName>
      {bestTrade.name === market.name && <StyledMarketTag>Best Price</StyledMarketTag>}
    </StyledMarketItemLeft>
  );

  return (
    <StyledMarketsContainer className={`${market && 'active-market'} ${isDropdown && 'open-market'}`}>
      {detail ? (
        <StyledMarketItemDetail>
          <StyledMarketItem className="market-item_detail">
            {getMarketItemLeft(detail)}
            <CloseIcon
              onClose={() => {
                setDetail(null);
              }}
            />
          </StyledMarketItem>
          <StyledMarketItemContent>
            <StyledMarketItemText>
              <StyledMarketItemTextLeft>Minimum Received</StyledMarketItemTextLeft>
              <StyledMarketItemTextRight>
                {balanceFormated(
                  Big(detail.outputCurrencyAmount || 0)
                    .mul(1 - slippage / 100)
                    .toString(),
                  8
                )}{' '}
                {outputCurrency.symbol}
              </StyledMarketItemTextRight>
            </StyledMarketItemText>
            <StyledMarketItemText>
              <StyledMarketItemTextLeft>Price Impact</StyledMarketItemTextLeft>
              <StyledMarketItemTextRight>
                <span className={`price-impact-${detail.priceImpact ? detail.priceImpactType : 1}`}>
                  {detail.priceImpact || '-'}%
                </span>
              </StyledMarketItemTextRight>
            </StyledMarketItemText>
            <StyledMarketItemText>
              <StyledMarketItemTextLeft>Gas Fee</StyledMarketItemTextLeft>
              <StyledMarketItemTextRight>${balanceFormated(detail.gasUsd, 4)}</StyledMarketItemTextRight>
            </StyledMarketItemText>
            <StyledMarketItemText>
              <StyledMarketItemTextLeft>Route</StyledMarketItemTextLeft>
              <StyledMarketItemTextRight>{detail.routerStr}</StyledMarketItemTextRight>
            </StyledMarketItemText>
          </StyledMarketItemContent>
        </StyledMarketItemDetail>
      ) : (
        markets.map((item: any) => getMarketItemElement(item))
      )}
    </StyledMarketsContainer>
  );
};

export default memo(Markets);
