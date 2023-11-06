import { memo } from 'react';
import styled from 'styled-components';

import Head from './components/pools/AddHead';
import IncreaseButton from './components/pools/IncreaseButton';
import PoolIncreaseLiquidityData from './components/pools/PoolIncreaseLiquidityData';
import PoolIncreaseMore from './components/pools/PoolIncreaseMore';
import PoolPriceRange from './components/pools/PoolPriceRange';
import PoolRemovePair from './components/pools/PoolRemovePair';

const StyledContainer = styled.div`
  width: 605px;
  border-radius: 24px;
  border: 1px solid #3d363d;
`;
const StyledBody = styled.div`
  padding: 20px;
`;

const PoolsIncreaseLiquidity = () => {
  return (
    <StyledContainer>
      <Head showCleanAll={false} />
      <StyledBody>
        <PoolRemovePair />
        <PoolIncreaseLiquidityData />
        <PoolPriceRange type="1" />
        <PoolIncreaseMore />
        <IncreaseButton />
      </StyledBody>
    </StyledContainer>
  );
};

export default memo(PoolsIncreaseLiquidity);
