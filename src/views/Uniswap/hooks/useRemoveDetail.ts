import { useState, useCallback, useEffect } from 'react';
import useTokens from './useTokens';
import useAccount from '@/hooks/useAccount';
import config from '@/config/uniswap';
import { getPosition, getPositionCollect, getTokenAmounts } from '../utils/getPosition';
import { getTokenAddress } from '../utils';
import { getPoolInfo } from '../utils/getPool';

export default function useRemoveDetail(tokenId?: string) {
  const { provider, account } = useAccount();
  const { tokens } = useTokens();
  const [token0, setToken0] = useState<any>();
  const [token1, setToken1] = useState<any>();
  const [collectData, setCollectData] = useState<any>();
  const [detail, setDetail] = useState<any>();
  const [loading, setLoading] = useState(false);

  const getRemoveDetail = useCallback(async () => {
    if (!tokenId || !provider) return;
    try {
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
        currentTick: poolInfo.currentTick,
        token0: _token0,
        token1: _token1,
      });
      const status =
        position.tickLower <= poolInfo.currentTick && poolInfo.currentTick <= position.tickUpper ? 'in' : 'out';
      const useNative = _token0.address === 'native' ? _token0 : _token1.address === 'native' ? _token1 : undefined;
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
        liquidity: position.liquidity,
        useNative,
      });
      setLoading(false);
      setToken0(_token0);
      setToken1(_token1);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [tokenId, provider]);
  const getCollectInfo = useCallback(async () => {
    if (!tokenId || !account || !token0 || !token1 || !provider) return;
    const collectInfo = await getPositionCollect([tokenId, account], provider);
    setCollectData({
      collectToken0: collectInfo.amount0 / 10 ** token0.decimals,
      collectToken1: collectInfo.amount1 / 10 ** token1.decimals,
    });
  }, [tokenId, account, token0, token1, provider]);

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
    getRemoveDetail();
  }, [tokenId, provider]);

  useEffect(() => {
    getCollectInfo();
  }, [tokenId, account, token0, token1, provider]);

  return { token0, token1, detail, loading, collectData, changeToWeth };
}
