export function tickToPrice({ tick, decimals0, decimals1, isReverse }: any) {
  let price0 = 1.0001 ** tick / 10 ** (decimals1 - decimals0);
  let price1 = 1 / price0;
  if (isReverse) {
    if (price0 < 0.001) return '<0.001';
    return price0.toFixed(decimals1);
  }
  if (price1 < 0.001) return '<0.001';
  return price1.toFixed(decimals0);
}
