import { memo, useMemo } from 'react';

import { tickToPrice } from '@/views/Pool/utils/tickMath';

import Panel from '../Panel';
import { StyledContainer } from './styles';

const LiquidityPanel = ({ amount0, amount1, currentTick, token0, token1 }: any) => {
  const currentPrice = useMemo(() => tickToPrice({ tick: currentTick, token0, token1 }), [currentTick]);
  return (
    <StyledContainer>
      <Panel type={1} token0={token0} token1={token1} amount0={amount0} amount1={amount1} currentPrice={currentPrice} />
    </StyledContainer>
  );
};

export default memo(LiquidityPanel);
