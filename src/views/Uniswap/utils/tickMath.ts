import Big from 'big.js';

export function tickToPrice({ tick, decimals0, decimals1, isReverse, isNumber }: any) {
  const price0 = new Big(1.0001 ** tick).div(10 ** (decimals1 - decimals0));
  const price1 = new Big(1).div(price0.eq(0) ? 1 : price0);
  if (isReverse) {
    if (price0.lt(0.001) && !isNumber) return '<0.001';
    return !isNumber ? price0.toFixed(3) : price0.toFixed(decimals0);
  }
  if (price1.lt(0.001) && !isNumber) return '<0.001';
  return !isNumber ? price1.toFixed(3) : price1.toFixed(decimals1);
}

export function nearestUsableTick(tick: number, tickSpacing: number) {
  const rounded = Math.round(tick / tickSpacing) * tickSpacing;
  if (rounded < -887200) return rounded + tickSpacing;
  else if (rounded > 887200) return rounded - tickSpacing;
  else return rounded;
}

