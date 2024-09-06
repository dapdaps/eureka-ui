import { StyledBox, StyledPrice } from '@/modules/lending/components/CompoundV3/UsdPrice/styles';
import LendingTotal from '@/modules/lending/components/Total';

const CompoundV3UsdPrice = (props: Props) => {
  const { price } = props;

  return (
    <StyledBox>
      <StyledPrice>
        <LendingTotal
          total={price}
          digit={2}
          unit="$"
        />
      </StyledPrice>
    </StyledBox>
  );
};

export default CompoundV3UsdPrice;

export interface Props {
  price: any;
}
