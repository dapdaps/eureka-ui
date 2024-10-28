import Big from 'big.js';

import { FEES, MAX_TICK, MIN_TICK } from '@/config/pool/index';

import { sortTokens } from './token';

export function tickToPrice({ tick, token0, token1 }: any) {
  const [_token0, _token1] = sortTokens(token0, token1);
  const decimals = _token1.decimals - _token0.decimals;
  const isReverse = _token0.address !== token0.address && _token1.address !== token1.address;
  const price = new Big(1.0001 ** tick).div(10 ** decimals).toNumber();
  return isReverse ? 1 / price : price;
}

export function priceToTick({ price, token0, token1 }: any) {
  const [_token0, _token1] = sortTokens(token0, token1);
  const decimals = _token1.decimals - _token0.decimals;
  const isReverse = _token0.address !== token0.address && _token1.address !== token1.address;

  return Math.floor(Math.log(new Big(isReverse ? 1 / price : price).mul(10 ** decimals).toNumber()) / Math.log(1.0001));
}

export function nearestUsableTick({ tick, fee, tickSpacing }: { tick: number; fee?: number; tickSpacing?: number }) {
  const _tickSpacing = tickSpacing ? tickSpacing : fee ? FEES[fee].space : 60;
  const rounded = Math.round(tick / _tickSpacing) * _tickSpacing;

  if (rounded < MIN_TICK) return rounded + _tickSpacing;
  else if (rounded > MAX_TICK) return rounded - _tickSpacing;
  else return rounded;
}

export function priceToUsableTick({ price, token0, token1, fee, tickSpacing }: any) {
  const tick = priceToTick({ price, token0, token1 });

  return nearestUsableTick({ tick, fee, tickSpacing });
}

export function priceToUsablePrice({ price, token0, token1, fee }: any) {
  const tick = priceToUsableTick({ price, token0, token1, fee });
  return tickToPrice({ tick, token0, token1 });
}

export function checkIsFullRange({ tickLower, tickUpper }: any) {
  return tickUpper - tickLower > 400000;
}
