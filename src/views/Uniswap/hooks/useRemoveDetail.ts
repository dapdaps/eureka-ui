import { useMemo, useState, useCallback, useEffect } from 'react';
import { usePositionsStore } from '@/stores/positions';
import { useCachedPoolsStore } from '@/stores/pools';
import useTokens from './useTokens';
import useAccount from '@/hooks/useAccount';
import config from '@/config/uniswap/linea';
import { cloneDeep } from 'lodash';
import { getTokenAddress } from '../utils';
import { getPositionCollect, getTokenAmounts } from '../utils/getPosition';

export default function useRemoveDetail(tokenId?: string) {
  const { provider, account } = useAccount();
  const positionsStore: any = usePositionsStore();
  const poolsStore: any = useCachedPoolsStore();
  const { tokens } = useTokens();
  const [token0, setToken0] = useState<any>();
  const [token1, setToken1] = useState<any>();
  const [collectData, setCollectData] = useState<any>();

  const detail = useMemo(() => {
    if (!tokenId) return null;
    const position = positionsStore.getPosition(tokenId) || {};
    const pool = poolsStore.getPool(tokenId) || {};
    const _token0 = tokens[getTokenAddress(pool.token0)];
    const _token1 = tokens[getTokenAddress(pool.token1)];
    const useNative = _token0.address === 'native' ? _token0 : _token1.address === 'native' ? _token1 : undefined;
    const [liquidityToken0, liquidityToken1] = getTokenAmounts({
      liquidity: position.liquidity,
      sqrtPriceX96: pool.sqrtPriceX96,
      tickLow: position.tickLower,
      tickHigh: position.tickUpper,
      Decimal0: _token0.decimals,
      Decimal1: _token1.decimals,
      currentTick: pool.currentTick,
    });
    const status = position.tickLower <= pool.currentTick && pool.currentTick <= position.tickUpper ? 'in' : 'out';
    setToken0(_token0);
    setToken1(_token1);
    return {
      token0: cloneDeep(_token0),
      token1: cloneDeep(_token1),
      liquidityToken0,
      liquidityToken1,
      tickLow: position.tickLower,
      tickHigh: position.tickUpper,
      status,
      tick: pool.currentTick,
      fee: position.fee,
      tokenId: tokenId,
      liquidity: position.liquidity,
      useNative,
    };
  }, [tokenId]);
  const getCollectData = useCallback(async () => {
    try {
      if (!tokenId || !account || !provider || !token0 || !token1) return;
      const collectInfo = await getPositionCollect([tokenId, account], provider);
      setCollectData({
        collectToken0: collectInfo.amount0 / 10 ** token0.decimals,
        collectToken1: collectInfo.amount1 / 10 ** token1.decimals,
      });
    } catch (err) {}
  }, [account, tokenId, provider, token0, token1]);

  const changeToWeth = useCallback(
    (flag: boolean) => {
      if (!detail) return;
      if (token0.address === 'native' || token0.address === config.wethToken.address) {
        setToken0(flag ? config.wethToken : detail.token0);
      }
      if (token1.address === 'native' || token1.address === config.wethToken.address) {
        setToken1(flag ? config.wethToken : detail.token1);
      }
    },
    [token0, token1, detail],
  );
  useEffect(() => {
    getCollectData();
  }, [account, tokenId, provider, detail]);
  return { token0, token1, detail, collectData, changeToWeth };
}
