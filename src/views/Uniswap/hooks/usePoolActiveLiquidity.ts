import { useEffect, useMemo, useCallback } from 'react';
import { FeeAmount, nearestUsableTick, Pool, TICK_SPACINGS, tickToPrice } from '@uniswap/v3-sdk';
import { Token } from '@uniswap/sdk-core'
import JSBI from 'jsbi';
import usePool from './usePool';
import useAllV3Ticks from './useAllV3Ticks';
import { useAddLiquidityStore } from '@/stores/addLiquidity';
import { TickProcessed, ChartEntry, Ticks  } from '../utils/chartMath';
import mockData from './mock.json';
const PRICE_FIXED_DIGITS = 8;

export default function usePoolActiveLiquidity() {
  /**
   * 欠缺的数据 pool 的 liquidity
   * Token 是否缺少字段
   */
  const addLiquidityStore: any = useAddLiquidityStore();
  const { token0, token1, fee } = addLiquidityStore;
  // get pool
  // const { pool, loading } = usePool(token0?.address, token1?.address, fee) as any;
  // console.log('00000000-pool', pool);
  // console.log('9999999-data', data);
  // // get all v3 ticks
  // const ticks = useAllV3Ticks() as any;
  // console.log('1111111-ticks', ticks);
  
  // // get active tick
  // const activeTick = useMemo(() => getActiveTick(pool?.currentTick, fee), [pool, fee]) as any;
  
  // // get pivot
  // const pivot = ticks.findIndex(({ tick } : any ) => tick > activeTick) - 1;

  // // process ticks 
  // const activeTickProcessed: TickProcessed = {
  //   liquidityActive: JSBI.BigInt(pool?.liquidity ?? 0),
  //   tick: activeTick,
  //   liquidityNet: Number(ticks[pivot].tick) === activeTick ? JSBI.BigInt(ticks[pivot].liquidityNet) : JSBI.BigInt(0),
  //   price0: tickToPrice(token0, token1, activeTick).toFixed(PRICE_FIXED_DIGITS), // todo 可以用custom
  // }
  // const subsequentTicks = computeSurroundingTicks(token0, token1, activeTickProcessed, ticks, pivot, true)
  // const previousTicks = computeSurroundingTicks(token0, token1, activeTickProcessed, ticks, pivot, false)
  // const ticksProcessed = previousTicks.concat(activeTickProcessed).concat(subsequentTicks)
  const data = mockData.data as any;
  function formatData() {
    if (!data?.length) {
      return undefined
    }

    const newData: ChartEntry[] = []
    for (let i = 0; i < data.length; i++) {
      const t: TickProcessed = data[i];
      const chartEntry = {
        activeLiquidity: parseFloat(t.liquidityActive.toString()),
        price0: parseFloat(t.price0),
      }

      if (chartEntry.activeLiquidity > 0) {
        newData.push(chartEntry)
      }
    }

    return newData
  }
  const formattedData = data;
  return formattedData;
}

const getActiveTick = (tickCurrent: number | undefined, feeAmount: FeeAmount | undefined) =>
  tickCurrent && feeAmount ? Math.floor(tickCurrent / TICK_SPACINGS[feeAmount]) * TICK_SPACINGS[feeAmount] : undefined
function computeSurroundingTicks(
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
      price0: tickToPrice(token0, token1, tick).toFixed(PRICE_FIXED_DIGITS),
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