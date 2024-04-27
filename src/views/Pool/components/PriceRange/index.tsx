import { memo, useMemo, useState } from 'react';
import TokenSwitcher from '@/views/Pool/components/TokenSwitcher';
import { balanceFormated } from '@/utils/balance';
import { sortTokens } from '@/views/Pool/utils/token';
import {
  StyledContainer,
  StyledHeader,
  StyledTop,
  StyledCard,
  StyledCardTitle,
  StyledCardValue,
  StyledCardDesc,
  StyledSubtitle,
} from './styles';

const PriceRange = ({ from = 'detail', token0, token1, lowerPrice, upperPrice, currentPrice }: any) => {
  const [_token0, _token1] = sortTokens(token0, token1);
  const [reverse, setReverse] = useState(_token0.address === token1.address);

  const _lowerPrice = useMemo(() => {
    if (reverse) {
      return upperPrice === '∞' ? '0' : upperPrice === '0' ? '∞' : 1 / upperPrice;
    } else {
      return lowerPrice;
    }
  }, [reverse]);
  const _upperPrice = useMemo(() => {
    if (reverse) {
      return lowerPrice === '∞' ? '0' : lowerPrice === '0' ? '∞' : 1 / lowerPrice;
    } else {
      return upperPrice;
    }
  }, [reverse]);
  const _currentPrice = useMemo(() => (reverse ? 1 / currentPrice : currentPrice), [reverse]);

  const _tokenSymbols = useMemo(
    () => `${!reverse ? _token0.symbol : _token1.symbol} per ${!reverse ? _token1.symbol : _token0.symbol}`,
    [reverse],
  );

  return (
    <StyledContainer $from={from}>
      <StyledHeader>
        <StyledSubtitle>Price Range</StyledSubtitle>
        <TokenSwitcher
          token0={token0}
          token1={token1}
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
