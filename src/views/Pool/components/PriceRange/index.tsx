import { memo, useMemo, useState } from 'react';

import { balanceFormated } from '@/utils/balance';
import TokenSwitcher from '@/views/Pool/components/TokenSwitcher';
import { sortTokens } from '@/views/Pool/utils/token';

import {
  StyledCard,
  StyledCardDesc,
  StyledCardTitle,
  StyledCardValue,
  StyledContainer,
  StyledHeader,
  StyledSubtitle,
  StyledTop
} from './styles';

const PriceRange = ({ from = 'detail', token0, token1, lowerPrice, upperPrice, currentPrice, isFullRange }: any) => {
  const [_token0, _token1] = sortTokens(token0, token1);
  const [reverse, setReverse] = useState(_token0.address !== token0.address && _token1.address !== token1.address);

  const _lowerPrice = useMemo(() => {
    if (isFullRange) {
      return '0';
    }
    return reverse ? 1 / upperPrice : lowerPrice;
  }, [reverse]);
  const _upperPrice = useMemo(() => {
    if (isFullRange) {
      return '∞';
    }
    return reverse ? 1 / lowerPrice : upperPrice;
  }, [reverse]);
  const _currentPrice = useMemo(() => (reverse ? 1 / currentPrice : currentPrice), [reverse]);

  const _tokenSymbols = useMemo(
    () => `${reverse ? _token1.symbol : _token0.symbol} per ${reverse ? _token0.symbol : _token1.symbol}`,
    [reverse]
  );

  return (
    <StyledContainer $from={from}>
      <StyledHeader>
        <StyledSubtitle>Price Range</StyledSubtitle>
        <TokenSwitcher
          token0={_token0}
          token1={_token1}
          reverse={reverse}
          onExchangeTokens={() => {
            setReverse(!reverse);
          }}
        />
      </StyledHeader>
      <StyledTop>
        <StyledCard>
          <StyledCardTitle>Min Price</StyledCardTitle>
          <StyledCardValue>{_lowerPrice === '∞' ? '∞' : balanceFormated(_lowerPrice, 6)}</StyledCardValue>
          <StyledCardDesc>{_tokenSymbols}</StyledCardDesc>
        </StyledCard>
        <StyledCard>
          <StyledCardTitle>Max Price</StyledCardTitle>
          <StyledCardValue>{_upperPrice === '∞' ? '∞' : balanceFormated(_upperPrice, 6)}</StyledCardValue>
          <StyledCardDesc>{_tokenSymbols}</StyledCardDesc>
        </StyledCard>
      </StyledTop>
      <StyledCard>
        <StyledCardTitle>Current Price</StyledCardTitle>
        <StyledCardValue>{balanceFormated(_currentPrice, 6)}</StyledCardValue>
        <StyledCardDesc>{_tokenSymbols}</StyledCardDesc>
      </StyledCard>
    </StyledContainer>
  );
};

export default memo(PriceRange);
