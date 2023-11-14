import { Contract } from 'ethers';
import config from '@/config/uniswap/linea/index';
import Big from 'big.js';
import tickMathAbi from '../abi/tickMathAbi';
import { sortTokens } from './sortTokens';

export async function getTickAtSqrtRatio(sqrtPriceX96: string, provider: any) {
  const TickMathContract = new Contract(config.contracts.tickMathAddress, tickMathAbi, provider);
  const result = await TickMathContract.callStatic.getTickAtSqrtRatio(sqrtPriceX96);
  return result;
}

export async function getSqrtRatioAtTick(tick: string, provider: any) {
  const TickMathContract = new Contract(config.contracts.tickMathAddress, tickMathAbi, provider);
  const result = await TickMathContract.callStatic.getSqrtRatioAtTick(tick);
  return result.toString();
}

export async function getTickFromPrice({ token0, token1, price, fee, type, provider }: any) {
  const [_token0, _token1] = sortTokens(token0, token1);
  const isReverse = _token0.address !== token0.address;
  const mathPrice = (isReverse ? 1 / price : price) / 10 ** (_token0.decimals - _token1.decimals);
  const _sqrtPriceX96 = new Big(mathPrice)
    .sqrt()
    .mul(2 ** 96)
    .toFixed(0);
  let _tick = await getTickAtSqrtRatio(_sqrtPriceX96, provider);
  if (_tick < -887272) {
    _tick = -887272;
  }
  if (_tick > 887272) {
    _tick = 887272;
  }
  const TICK_SPACING: any = {
    100: 1,
    500: 10,
    3000: 60,
    10000: 200,
  };
  const tickSpacing = TICK_SPACING[fee];
  const _useableTick =
    type === 'up'
      ? Math.floor(_tick / tickSpacing) * tickSpacing
      : Math.floor(_tick / tickSpacing) * tickSpacing + tickSpacing;

  return _useableTick;
}
