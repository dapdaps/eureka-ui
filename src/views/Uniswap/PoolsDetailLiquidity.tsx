import { memo } from 'react';
import styled from 'styled-components';

import Back from './components/pools/Back';
import PoolBaseData from './components/pools/PoolBaseData';
import PoolPair from './components/pools/PoolPair';
import PoolPriceRange from './components/pools/PoolPriceRange';

const StyledContainer = styled.div`
  width: 810px;
`;

const PoolsDetailLiquidity = () => {
  return (
    <StyledContainer>
      <Back />
      <PoolPair />
      <PoolBaseData />
      <PoolPriceRange />
    </StyledContainer>
  );
};

export default memo(PoolsDetailLiquidity);
