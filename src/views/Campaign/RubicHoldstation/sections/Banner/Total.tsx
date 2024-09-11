import { balanceShortFormated } from '@/utils/balance';
import { formatThousandsSeparator } from '@/utils/format-number';

import { StyledTotal, StyledTotalItem, StyledTotalLabel, StyledTotalLine, StyledTotalValue } from './styles';

export default function Total() {
  return (
    <StyledTotal>
      <StyledTotalItem>
        <StyledTotalLabel>Trading Volume</StyledTotalLabel>
        <StyledTotalValue>${balanceShortFormated(120000, 2)}</StyledTotalValue>
      </StyledTotalItem>
      <StyledTotalLine />
      <StyledTotalItem>
        <StyledTotalLabel>Total Tickets</StyledTotalLabel>
        <StyledTotalValue>{formatThousandsSeparator(10000)}</StyledTotalValue>
      </StyledTotalItem>
      <StyledTotalLine />
      <StyledTotalItem>
        <StyledTotalLabel>Total Bonus</StyledTotalLabel>
        <StyledTotalValue>${formatThousandsSeparator(10000)}</StyledTotalValue>
      </StyledTotalItem>
    </StyledTotal>
  );
}
