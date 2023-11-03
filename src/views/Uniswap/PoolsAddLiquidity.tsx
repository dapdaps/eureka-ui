import { memo } from 'react';
import styled from 'styled-components';
import AddLiquidityHeader from './components/AddLiquidityHeader';

const StyledContainer = styled.div`
  width: 605px;
  border-radius: 24px;
  border: 1px solid #3d363d;
`;

const PoolsAddLiquidity = () => {
  return <StyledContainer>{/* <AddLiquidityHeader /> */}</StyledContainer>;
};

export default memo(PoolsAddLiquidity);
