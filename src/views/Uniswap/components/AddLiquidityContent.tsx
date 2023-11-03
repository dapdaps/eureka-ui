import { memo } from 'react';
import styled from 'styled-components';
import TokensSelect from './TokensSelect';
import FeeSelect from './FeeSelect';
import PriceRange from './PriceRange';

const StyledContainer = styled.div`
  padding: 0px 20px 20px;
  .mt {
    margin-top: 10px;
  }
`;
const Label = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  padding: 10px 0px;
`;

const AddLiquidityContent = () => {
  return (
    <StyledContainer>
      <Label>Select pair</Label>
      <TokensSelect />
      <FeeSelect />
      <PriceRange />
    </StyledContainer>
  );
};

export default memo(AddLiquidityContent);
