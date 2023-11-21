import { useCallback, useEffect, useState } from 'react';
import useTokens from './useTokens';
import useAccount from '@/hooks/useAccount';
import { getTokenAddress } from '../utils';
import { getPosition, getTokenAmounts } from '../utils/getPosition';
import { getPoolInfo } from '../utils/getPool';

export default function useIncreaseDetail(tokenId?: string) {
  const { tokens } = useTokens();
  const [detail, setDetail] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { provider } = useAccount();
  const getIncreaseDetail = useCallback(async () => {
    if (!tokenId || !provider) return;
    try {
      setLoading(true);
      const position = await getPosition(tokenId, provider);
      const poolInfo = await getPoolInfo({
        token0: position.token0,
        token1: position.token1,
        fee: position.fee,
        provider,
      });
      const _token0 = tokens[getTokenAddress(position.token0)];
      const _token1 = tokens[getTokenAddress(position.token1)];
      const [liquidityToken0, liquidityToken1] = await getTokenAmounts({
        liquidity: position.liquidity,
        tickLower: position.tickLower,
        tickUpper: position.tickUpper,
        tick: poolInfo.currentTick,
        decimal0: _token0.decimals,
        decimal1: _token1.decimals,
        provider,
      });
      const status =
        position.tickLower <= poolInfo.currentTick && poolInfo.currentTick <= position.tickUpper ? 'in' : 'out';
      setDetail({
        token0: _token0,
        token1: _token1,
        liquidityToken0,
        liquidityToken1,
        tickLow: position.tickLower,
        tickHigh: position.tickUpper,
        status,
        tick: poolInfo.currentTick,
        fee: position.fee,
        tokenId: tokenId,
      });
      setLoading(false);
    } catch (err) {
      console.log(53);
      setLoading(false);
    }
  }, [tokenId, provider]);

  useEffect(() => {
    if (tokenId && provider) getIncreaseDetail();
  }, [tokenId, provider]);

  return {
    detail,
    loading,
  };
}
