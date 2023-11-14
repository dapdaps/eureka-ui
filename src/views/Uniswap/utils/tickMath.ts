import Big from 'big.js';

export function tickToPrice({ tick, decimals0, decimals1, isReverse, isNumber }: any) {
  if (!tick || !decimals0 || !decimals1) return 0;
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
  if (rounded < -887272) return rounded + tickSpacing;
  else if (rounded > 887272) return rounded - tickSpacing;
  else return rounded;
}

export function getPriceFromTicks({ amount0, amount1, currentPrice, lowPrice, highPrice }: any) {
  const q96 = 2 ** 96;
  function price_to_sqrtp(p: any) {
    return Math.sqrt(p) * q96;
  }
  const sqrtp_low = price_to_sqrtp(lowPrice).toFixed(0);
  const sqrtp_cur = price_to_sqrtp(currentPrice).toFixed(0);
  const sqrtp_upp = price_to_sqrtp(highPrice).toFixed(0);
  function sort(pa: any, pb: any) {
    let _pa = new Big(pa);
    let _pb = new Big(pb);
    if (_pa.gt(_pb)) {
      _pa = new Big(pb);
      _pb = new Big(pa);
    }
    return [_pa, _pb];
  }
  function liquitity0(amount: any, pa: any, pb: any) {
    const [_pa, _pb] = sort(pa, pb);
    const diff = _pb.minus(_pa);
    return new Big(amount)
      .mul(_pa.mul(_pb))
      .div(q96)
      .div(diff.eq(0) ? 1 : diff);
  }
  function liquitity1(amount: any, pa: any, pb: any) {
    const [_pa, _pb] = sort(pa, pb);
    const diff = _pb.minus(_pa);
    return new Big(amount).mul(q96).div(diff.eq(0) ? 1 : diff);
  }
  const liq0 = liquitity0(amount0, sqrtp_cur, sqrtp_upp);
  const liq1 = liquitity1(amount1, sqrtp_cur, sqrtp_low);
  const liquidity = liq0.gt(liq1) ? liq1.toFixed() : liq0.toFixed();
  function calc_amount0(liq: any, pa: any, pb: any) {
    let _pa = pa;
    let _pb = pb;
    if (new Big(pa).gt(pb)) {
      _pa = pb;
      _pb = pa;
    }
    return (liq * q96 * (_pb - _pa)) / _pa / _pb;
  }

  function calc_amount1(liq: any, pa: any, pb: any) {
    let _pa = pa;
    let _pb = pb;
    if (new Big(pa).gt(pb)) {
      _pa = pb;
      _pb = pa;
    }
    return (liq * (_pb - _pa)) / q96;
  }
  const _amount0 = calc_amount0(liquidity, sqrtp_upp, sqrtp_cur);
  const _amount1 = calc_amount1(liquidity, sqrtp_low, sqrtp_cur);
  return _amount1 / _amount0;
}
