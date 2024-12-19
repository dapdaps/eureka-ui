import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { useBasic } from '../../hooks/useBasic';
import { StyledTotal, StyledTotalItem, StyledTotalLabel, StyledTotalLine, StyledTotalValue } from './styles';

export default function Total() {
  const { data, loading } = useBasic({ category: 'linea-marsh' });

  const { tradingVolume, tradingTransactions, totalPrize, totalCompetitors } = data;

  return (
    <StyledTotal>
      <StyledTotalItem>
        <StyledTotalLabel>Total Prize</StyledTotalLabel>
        <StyledTotalValue>{loading ? <Skeleton width={102} height={36} /> : totalPrize}</StyledTotalValue>
      </StyledTotalItem>
      <StyledTotalLine />
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
  );
}
