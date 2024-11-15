import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';

import { StyledItem, StyledSummary, StyledTitle, StyledValue } from './styles';

const LendingSummary = (props: Props) => {
  const { userTotalCollateralUsd = '0', userTotalSupplyUsd = '0', userTotalBorrowUsd = '0' } = props;

  const formatUsd = (val: string) => {
    return formateValueWithThousandSeparatorAndFont(val, 2, true, { prefix: '$', isZeroPrecision: true });
  };

  return (
    <StyledSummary>
      <StyledItem>
        <StyledTitle>Your Collateral</StyledTitle>
        <StyledValue>{formatUsd(userTotalCollateralUsd)}</StyledValue>
      </StyledItem>
      <StyledItem>
        <StyledTitle>Your Borrowed</StyledTitle>
        <StyledValue>{formatUsd(userTotalBorrowUsd)}</StyledValue>
      </StyledItem>
      <StyledItem>
        <StyledTitle>Your Deposited</StyledTitle>
        <StyledValue>{formatUsd(userTotalSupplyUsd)}</StyledValue>
      </StyledItem>
    </StyledSummary>
  );
};

export default LendingSummary;

interface Props {
  userTotalCollateralUsd?: string;
  userTotalSupplyUsd?: string;
  userTotalBorrowUsd?: string;
}
