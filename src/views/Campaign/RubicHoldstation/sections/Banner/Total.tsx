import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';

import RubicHoldstationContext from '@/views/Campaign/RubicHoldstation/context';

import { StyledTotal, StyledTotalItem, StyledTotalLabel, StyledTotalLine, StyledTotalValue } from './styles';

export default function Total() {
  const context = useContext(RubicHoldstationContext);

  const { data, loading } = context.basic;

  const { tradingVolume, totalTickets, totalBonus } = data;

  return (
    <StyledTotal>
      <StyledTotalItem>
        <StyledTotalLabel>Trading Volume</StyledTotalLabel>
        <StyledTotalValue>{loading ? <Skeleton width={102} height={36} /> : tradingVolume}</StyledTotalValue>
      </StyledTotalItem>
      <StyledTotalLine />
      <StyledTotalItem>
        <StyledTotalLabel>Total Tickets</StyledTotalLabel>
        <StyledTotalValue>{loading ? <Skeleton width={102} height={36} /> : totalTickets}</StyledTotalValue>
      </StyledTotalItem>
      <StyledTotalLine />
      <StyledTotalItem>
        <StyledTotalLabel>Total Bonus</StyledTotalLabel>
        <StyledTotalValue>{loading ? <Skeleton width={102} height={36} /> : totalBonus}</StyledTotalValue>
      </StyledTotalItem>
    </StyledTotal>
  );
}
