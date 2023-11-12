import { useMemo } from 'react';
import { usePositionsStore } from '@/stores/positions';
import { useCachedPoolsStore } from '@/stores/pools';
import useTokens from './useTokens';
import { getTokenAddress } from '../utils';

export default function useIncreaseDetail(tokenId?: string) {
  const positionsStore: any = usePositionsStore();
  const poolsStore: any = useCachedPoolsStore();
  const { tokens } = useTokens();

  return useMemo(() => {
    if (!tokenId) return;
    const position = positionsStore.getPosition(tokenId) || {};
    const pool = poolsStore.getPool(tokenId) || {};
    const _token0 = tokens[getTokenAddress(pool.token0)];
    const _token1 = tokens[getTokenAddress(pool.token1)];
    const status = position.tickLower <= pool.currentTick && pool.currentTick <= position.tickUpper ? 'in' : 'out';
    return {
      token0: _token0,
      token1: _token1,
      liquidityToken0: position.liquidityToken0,
      liquidityToken1: position.liquidityToken1,
      tickLow: position.tickLower,
      tickHigh: position.tickUpper,
      status,
      tick: pool.currentTick,
      fee: position.fee,
      tokenId: tokenId,
    };
  }, [tokenId]);
}
