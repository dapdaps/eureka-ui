import { memo } from 'react';
import styled from 'styled-components';
import Panel from './components/Panel';
import AddLiquidityHeader from './components/AddLiquidityHeader';
import AddLiquidityContent from './components/AddLiquidityContent';

const StyledContainer = styled(Panel)`
  width: 650px;
`;

const AddLiquidity = () => {
  return (
    <StyledContainer>
      <AddLiquidityHeader />
      <AddLiquidityContent />
    </StyledContainer>
  );
};

export default memo(AddLiquidity);
