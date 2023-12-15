import { useCallback, useEffect, useState } from 'react';
import useAccount from '@/hooks/useAccount';
import useTokens from './useTokens';

import { getPosition, getPositionCollect, getTokenAmounts } from '../utils/getPosition';
import { getPoolSlot } from '../utils/getPool';
import { getTokenURI } from '../utils/getNft';
import { getTokenAddress } from '../utils';

export default function useDetail(tokenId: string) {
  const [detail, setDetail] = useState<any>();
  const [collectData, setCollectData] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const { provider, account } = useAccount();

  const { tokens } = useTokens();

  const getDetail = async () => {
    if (!tokenId || !account) return;
    setLoading(true);
    try {
      const position = await getPosition(tokenId, provider);
      const [pool, collectInfo, tokenURI] = await Promise.all([
        getPoolSlot({
          token0: position.token0,
          token1: position.token1,
          fee: position.fee,
          provider,
        }),
        getPositionCollect([tokenId, account], provider),
        getTokenURI(tokenId, provider),
      ]);
      console.log('pool', pool);
      const _token0 = tokens[getTokenAddress(position.token0)];
      const _token1 = tokens[getTokenAddress(position.token1)];

      const [liquidityToken0, liquidityToken1] = await getTokenAmounts({
        liquidity: position.liquidity,
        tickLower: position.tickLower,
        tickUpper: position.tickUpper,
        tick: pool.tick,
        decimal0: _token0.decimals,
        decimal1: _token1.decimals,
        provider,
      });
      const _detail: { [key: string]: any } = {
        fee: position.fee,
        token0: _token0,
        token1: _token1,
        liquidityToken0,
        liquidityToken1,
        liquidity: position.liquidity,
        tokenURI,
        tickLow: position.tickLower,
        tickHigh: position.tickUpper,
        tick: pool.tick,
        tokenId: tokenId,
      };
      if (position.liquidity.eq(0)) {
        _detail.status = 'removed';
      } else {
        _detail.status = pool.tick < position.tickLower || pool.tick >= position.tickUpper ? 'out' : 'in';
      }
      setDetail(_detail);
      setCollectData({
        collectToken0: collectInfo.amount0 / 10 ** _token0.decimals,
        collectToken1: collectInfo.amount1 / 10 ** _token1.decimals,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const getCollectData = useCallback(async () => {
    if (!tokenId || !account || !provider || !detail) return;
    const collectInfo = await getPositionCollect([tokenId, account], provider);
    setCollectData({
      collectToken0: collectInfo.amount0 / 10 ** detail.token0.decimals,
      collectToken1: collectInfo.amount1 / 10 ** detail.token1.decimals,
    });
  }, [account, tokenId, provider, detail]);

  useEffect(() => {
    getDetail();
    getCollectData();
  }, [provider]);

  return { detail, loading, collectData, getCollectData };
}
