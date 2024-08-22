import { memo } from 'react';

import { StyledContainer } from './styles';

const PoolHints = () => {
  return (
    <StyledContainer>
      This pool must be initialized before you can add liquidity. To initialize,
      select a starting price for the pool. Then, enter your liquidity price
      range and deposit amount. Gas fees will be higher than usual due to the
      initialization transaction.
    </StyledContainer>
  );
};

export default memo(PoolHints);
