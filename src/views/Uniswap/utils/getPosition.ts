import { Contract } from 'ethers';
import Big from 'big.js';
import config from '@/config/uniswap/linea/index';
import positionAbi from '../abi/positionAbi';

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

export function getTokenAmounts({ liquidity, sqrtPriceX96, tickLow, tickHigh, currentTick, Decimal0, Decimal1 }: any) {
  const sqrtRatioA = new Big(1.0001).pow(tickLow);
  const sqrtRatioB = new Big(1.0001).pow(tickHigh);
  const sqrtPrice = new Big(sqrtPriceX96 || 1).div(new Big(2).pow(96));
  let amount0 = new Big(0);
  let amount1 = new Big(0);
  if (currentTick < tickLow) {
    amount0 = new Big(liquidity).mul(sqrtRatioB.minus(sqrtRatioA).div(sqrtRatioA.mul(sqrtRatioB)));
  } else if (currentTick >= tickHigh) {
    amount1 = new Big(liquidity).mul(sqrtRatioB.minus(sqrtRatioA));
  } else if (currentTick >= tickLow && currentTick < tickHigh) {
    amount0 = new Big(liquidity).mul(sqrtRatioB.minus(sqrtPrice).div(sqrtPrice.mul(sqrtRatioB)));
    amount1 = new Big(liquidity).mul(sqrtPrice.minus(sqrtRatioA));
  }
  const amount0Human = amount0.div(10 ** Decimal0).toFixed(Decimal0);
  const amount1Human = amount1.div(10 ** Decimal1).toFixed(Decimal1);
  return [amount0Human, amount1Human];
}
