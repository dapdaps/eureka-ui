import { useEffect, useMemo } from 'react';
import JSBI from 'jsbi';
import usePool from './usePool';
import useAllV3Ticks from './useAllV3Ticks';
import { useAddLiquidityStore } from '@/stores/addLiquidity';
import { TickProcessed, ChartEntry, getActiveTick, PRICE_FIXED_DIGITS, computeSurroundingTicks  } from '../utils/chartMath';
import mockData from './mock.json';
import  { tickToPriceDecimal } from '../utils/chartMath';
import  { tickToPrice } from '../utils/tickMath';
// import { FeeAmount, nearestUsableTick, Pool, TICK_SPACINGS, tickToPrice, priceToClosestTick } from '@uniswap/v3-sdk';

export default function usePoolActiveLiquidity(reverse:boolean) {
  /**
   * computeSurroundingTicks 需要验证
   */
  const addLiquidityStore: any = useAddLiquidityStore();
  const { token0, token1, fee } = addLiquidityStore;
  // get pool
  const { pool } = usePool(token0?.address, token1?.address, fee) as any;
  const { poolAddress, currentTick, liquidity } = pool || {};
  
  // get all v3 ticks
  const { ticks, loading } = useAllV3Ticks(poolAddress) as any;

  // get active tick
  const activeTick = useMemo(() => getActiveTick(currentTick, fee), [currentTick, fee]) as any;
  if (!pool || loading ) return null;
  const baseData = {
    fee,
    current: tickToPrice({
      tick: currentTick,
      decimals0: reverse ? token1.decimals: token0.decimals,
      decimals1: reverse ? token0.decimals: token1.decimals,
      isReverse: !reverse,
      isNumber: true,
    })
  }
  if (!+baseData.current) return null;

  // get pivot
  const pivot = ticks.findIndex(({ tick } : any ) => tick > activeTick) - 1;
  if (pivot < 0 || !ticks.length) return baseData;

  // process ticks 
  const activeTickProcessed: TickProcessed = {
    liquidityActive: liquidity ?? 0,
    tick: activeTick,
    liquidityNet: Number(ticks[pivot].tick) === activeTick ? JSBI.BigInt(ticks[pivot].liquidityNet) : JSBI.BigInt(0),
    price0: tickToPrice({
      tick: activeTick,
      decimals0: reverse ? token1.decimals: token0.decimals,
      decimals1: reverse ? token0.decimals: token1.decimals,
      isReverse: !reverse,
      isNumber: true,
    }),
  }
  const subsequentTicks = computeSurroundingTicks(token0, token1, activeTickProcessed, ticks, pivot, true, reverse)
  const previousTicks = computeSurroundingTicks(token0, token1, activeTickProcessed, ticks, pivot, false, reverse)
  const ticksProcessed = previousTicks.concat(activeTickProcessed).concat(subsequentTicks)
  const formattedData = formatData(ticksProcessed);
  // const formattedData = mockData.data as any;
  return { data:formattedData, ...baseData };
}
function formatData(data: TickProcessed[]) {
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