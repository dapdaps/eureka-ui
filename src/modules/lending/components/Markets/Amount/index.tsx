import Big from 'big.js';

import LendingTotal from '@/modules/lending/components/Total';

import { StyledAmount, StyledBox, StyledValue } from './styles';

const LendingMarketAmount = (props: Props) => {
  const { amount, price } = props;

  return (
    <StyledBox>
      <StyledAmount>
        <LendingTotal
          total={amount}
          digit={2}
          unit=""
        />
      </StyledAmount>
      <StyledValue>
        <LendingTotal
          total={Big(amount || 0)
            .mul(price || 0)
            .toString()}
          digit={2}
          unit="$"
        />
      </StyledValue>
    </StyledBox>
  );
};

export default LendingMarketAmount;

export interface Props {
  amount: string;
  price: string;
}
