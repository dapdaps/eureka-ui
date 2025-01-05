import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { useBasic } from '../../hooks/useBasic';
import {
  StyledContainer,
  StyledLogo,
  StyledTitleHeader,
  StyledTotal,
  StyledTotalItem,
  StyledTotalLabel,
  StyledTotalLine,
  StyledTotalValue
} from './styles';

export default function Total() {
  const { data, loading } = useBasic({ category: 'battle-royale' });

  const { tradingVolume, tradingTransactions, totalPrize, totalCompetitors } = data;

  return (
    <StyledContainer>
      <StyledTitleHeader>Arbitrum Trading Edition ft. Bitget and Unizen!</StyledTitleHeader>
      <StyledLogo src="/images/campaign/battle-royale/logo.png"></StyledLogo>
      <StyledTotal>
        <StyledTotalItem>
          <StyledTotalLabel>Trading Volume</StyledTotalLabel>
          <StyledTotalValue>{loading ? <Skeleton width={102} height={36} /> : tradingVolume}</StyledTotalValue>
        </StyledTotalItem>
        <StyledTotalLine />
        <StyledTotalItem>
          <StyledTotalLabel>Competitors</StyledTotalLabel>
          <StyledTotalValue>{loading ? <Skeleton width={102} height={36} /> : totalCompetitors}</StyledTotalValue>
        </StyledTotalItem>
        <StyledTotalLine />
        <StyledTotalItem>
          <StyledTotalLabel>Transactions</StyledTotalLabel>
          <StyledTotalValue>{loading ? <Skeleton width={102} height={36} /> : tradingTransactions}</StyledTotalValue>
        </StyledTotalItem>
      </StyledTotal>
    </StyledContainer>
  );
}
