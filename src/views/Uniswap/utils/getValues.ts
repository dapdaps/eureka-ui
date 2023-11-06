export function getTotalValues({ token0, token1, amount0, amount1, prices }: any) {
  let value0 = 0;
  let value1 = 0;

  if (prices[token0.symbol]) {
    value0 = (amount0 || 0) * prices[token0.symbol];
  }
  if (prices[token1.symbol]) {
    value1 = (amount1 || 0) * prices[token1.symbol];
  }

  return {
    total: (value0 + value1).toString(),
    percentage0: ((value0 / (value0 + value1)) * 100).toFixed(0),
    percentage1: ((value1 / (value0 + value1)) * 100).toFixed(0),
  };
}
