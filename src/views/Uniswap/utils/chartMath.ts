import { FeeAmount, nearestUsableTick, Pool, TICK_SPACINGS } from '@uniswap/v3-sdk';
import { Token } from '@uniswap/sdk-core'
import JSBI from 'jsbi';
import Big from 'big.js';

export const ZOOM_LEVELS: Record<FeeAmount, ZoomLevels> = {
  [FeeAmount.LOWEST]: {
    initialMin: 0.999,
    initialMax: 1.001,
    min: 0.00001,
    max: 1.5,
  },
  [FeeAmount.LOW]: {
    initialMin: 0.999,
    initialMax: 1.001,
    min: 0.00001,
    max: 1.5,
  },
  [FeeAmount.MEDIUM]: {
    // initialMin: 0.5,
    // initialMax: 2,
    initialMin: 0.00001,
    initialMax: 2.5,
    min: 0.00001,
    max: 20,
  },
  [FeeAmount.HIGH]: {
    initialMin: 0.5,
    initialMax: 2,
    min: 0.00001,
    max: 20,
  },
}

export interface ZoomLevels {
  initialMin: number
  initialMax: number
  min: number
  max: number
}
export const getActiveTick = (tickCurrent: number | undefined, feeAmount: FeeAmount | undefined) =>
  tickCurrent!== undefined && feeAmount ? Math.floor(tickCurrent / TICK_SPACINGS[feeAmount]) * TICK_SPACINGS[feeAmount] : undefined

export function tickToPriceDecimal({ tick, decimals0, decimals1, isReverse }: any) {
  const price0 = new Big(1.0001 ** tick).div(10 ** (decimals1 - decimals0));
  const price1 = new Big(1).div(price0.eq(0) ? 1 : price0);
  if (isReverse) {
    return price0;
  }
  return price1;
}
export const PRICE_FIXED_DIGITS = 8;
export function computeSurroundingTicks(
  token0: Token,
  token1: Token,
  activeTickProcessed: TickProcessed,
  sortedTickData: Ticks,
  pivot: number,
  ascending: boolean
): TickProcessed[] {
  let previousTickProcessed: TickProcessed = {
    ...activeTickProcessed,
  }
  // Iterate outwards (either up or down depending on direction) from the active tick,
  // building active liquidity for every tick.
  let processedTicks: TickProcessed[] = []
  for (let i = pivot + (ascending ? 1 : -1); ascending ? i < sortedTickData.length : i >= 0; ascending ? i++ : i--) {
    const tick = Number(sortedTickData[i].tick)
    const currentTickProcessed: TickProcessed = {
      liquidityActive: previousTickProcessed.liquidityActive,
      tick,
      liquidityNet: JSBI.BigInt(sortedTickData[i].liquidityNet),
      price0: tickToPriceDecimal({tick, decimals0: token0.decimals, decimals1: token1.decimals}).toFixed(PRICE_FIXED_DIGITS)
    }

    // Update the active liquidity.
    // If we are iterating ascending and we found an initialized tick we immediately apply
    // it to the current processed tick we are building.
    // If we are iterating descending, we don't want to apply the net liquidity until the following tick.
    if (ascending) {
      currentTickProcessed.liquidityActive = JSBI.add(
        previousTickProcessed.liquidityActive,
        JSBI.BigInt(sortedTickData[i].liquidityNet)
      )
    } else if (!ascending && JSBI.notEqual(previousTickProcessed.liquidityNet, JSBI.BigInt(0))) {
      // We are iterating descending, so look at the previous tick and apply any net liquidity.
      currentTickProcessed.liquidityActive = JSBI.subtract(
        previousTickProcessed.liquidityActive,
        previousTickProcessed.liquidityNet
      )
    }

    processedTicks.push(currentTickProcessed)
    previousTickProcessed = currentTickProcessed
  }

  if (!ascending) {
    processedTicks = processedTicks.reverse()
  }

  return processedTicks
}

export interface TickProcessed {
  tick: number
  liquidityActive: JSBI
  liquidityNet: JSBI
  price0: string
}
export interface ChartEntry {
  activeLiquidity: number
  price0: number
}
export type Ticks = Array<{ __typename?: 'Tick', liquidityNet: any, price0: any, price1: any, tick: any }>;
