import { memo, useMemo } from 'react';

import { checkIsFullRange, tickToPrice } from '@/views/Pool/utils/tickMath';

import PriceRange from '../PriceRange';

const Range = ({ token0, token1, tickLower, tickUpper, currentTick, from }: any) => {
  const lowerPrice = useMemo(
    () =>
      tickToPrice({
        tick: tickLower,
        token0,
        token1,
      }),
    [tickLower],
  );
  const upperPrice = useMemo(
    () =>
      tickToPrice({
        tick: tickUpper,
        token0,
        token1,
      }),
    [tickLower],
  );
  const currentPrice = useMemo(
    () =>
      tickToPrice({
        tick: currentTick,
        token0,
        token1,
      }),
    [tickLower],
  );
  const isFullRange = checkIsFullRange({ tickLower, tickUpper });
  return (
    <PriceRange
      from={from}
      token0={token0}
      token1={token1}
      lowerPrice={lowerPrice}
      upperPrice={upperPrice}
      currentPrice={currentPrice}
      isFullRange={isFullRange}
    />
  );
};

export default memo(Range);
