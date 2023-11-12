import { Contract } from 'ethers';
import Big from 'big.js';
import config from '@/config/uniswap/linea/index';
import positionAbi from '../abi/positionAbi';
import { getSqrtRatioAtTick } from '../utils/getTick';

export async function getPosition(tokenId: string, provider: any) {
  const PositionContract = new Contract(config.contracts.positionAddress, positionAbi, provider);
  return await PositionContract.positions(tokenId);
}

export async function getPositionCollect(args: string[], provider: any) {
  const PositionContract = new Contract(config.contracts.positionAddress, positionAbi, provider);
  return await PositionContract.callStatic.collect([
    ...args,
    '340282366920938463463374607431768211455',
    '340282366920938463463374607431768211455',
  ]);
}

export async function getTokenAmounts({ liquidity, tickLower, tickUpper, tick, decimal0, decimal1, provider }: any) {
  const [sqrtRatioLower, sqrtRatioUpper, sqrtRatio] = await Promise.all([
    getSqrtRatioAtTick(tickLower, provider),
    getSqrtRatioAtTick(tickUpper, provider),
    getSqrtRatioAtTick(tick, provider),
  ]);
  const _reverse0 = new Big(sqrtRatioUpper).gt(sqrtRatio);
  const _sqrtRatio0A = _reverse0 ? new Big(sqrtRatio) : new Big(sqrtRatioUpper);
  const _sqrtRatio0B = _reverse0 ? new Big(sqrtRatioUpper) : new Big(sqrtRatio);
  const _diff0 = _sqrtRatio0B.minus(_sqrtRatio0A);

  const _reverse1 = new Big(sqrtRatioLower).gt(sqrtRatio);
  const _sqrtRatio1A = _reverse1 ? new Big(sqrtRatio) : new Big(sqrtRatioLower);
  const _sqrtRatio1B = _reverse1 ? new Big(sqrtRatioLower) : new Big(sqrtRatio);
  const _diff1 = _sqrtRatio1B.minus(_sqrtRatio1A);

  const q96 = 2 ** 96;
  const amount0 = new Big(liquidity)
    .mul(q96)
    .mul(_diff0)
    .div(_sqrtRatio0A)
    .div(_sqrtRatio0B)
    .div(10 ** decimal0);
  const amount1 = new Big(liquidity)
    .mul(_diff1)
    .div(q96)
    .div(10 ** decimal1);

  return [amount0.toFixed(decimal0), amount1.toFixed(decimal1)];
}
