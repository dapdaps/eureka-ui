import Big from 'big.js';

export function tickToPrice({ tick, decimals0, decimals1, isReverse, isNumber }: any) {
  const price0 = new Big(1.0001 ** tick).div(10 ** (decimals1 - decimals0) || 1);
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

export function getToken0Amounts({ token1Amount, currentTick, tickLow, tickHigh, decimals0, decimals1, reverse }: any) {
  const Ha = Number(tickToPrice({ tick: tickHigh, decimals0, decimals1, isReverse: !reverse }));
  const Hb = Number(tickToPrice({ tick: tickLow, decimals0, decimals1, isReverse: !reverse }));
  const _Ha = Ha > Hb ? Ha : Hb;
  const _Hb = Ha > Hb ? Hb : Ha;

  const Price = Number(tickToPrice({ tick: currentTick, decimals0, decimals1, isReverse: !reverse }));
  const Lx = token1Amount * ((Math.sqrt(Price) * Math.sqrt(_Hb)) / (Math.sqrt(_Hb) - Math.sqrt(Price) || 1));
  const x = Math.floor(Lx * (Math.sqrt(Price) - Math.sqrt(_Ha)));
  return x;
}
