import Big from 'big.js';
import { useCallback, useEffect, useState } from 'react';

import weth from '@/config/contract/weth';
import useDappConfig from '@/views/Pool/hooks/useDappConfig';

import { fetchApr, fetchCampaigns,fetchTvl } from '../fetch';

export default function usePools() {
  const [pools, setPools] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { pairs, tokens, currentChain } = useDappConfig();
  const queryPools = useCallback(async () => {
    const pools = Object.keys(pairs);
    try {
      setLoading(true);
      const [tvl, apr, campaigns] = await Promise.all([fetchTvl(pools), fetchApr(), fetchCampaigns()]);

      const _pools = Object.values(pairs).map((item: any) => {
        const { tokens: pairTokens, boost, event, kim, xkim } = item;
        const campaign = (campaigns as any)[item.address];
        let marketApr = 0;
        Object.values(campaign).forEach((record: any) => {
          marketApr += Number(record.apr);
        });
        const chainId = currentChain.chain_id;
        const _tokens = tokens[chainId];
        const tvlItem = tvl.find((slip: any) => slip.id === item.address);
        return {
          tvl: tvlItem.totalValueLockedUSD,
          address: tvlItem.id,
          token0: _tokens[pairTokens[0] === weth[chainId] ? 'native' : pairTokens[0]],
          token1: _tokens[pairTokens[1] === weth[chainId] ? 'native' : pairTokens[1]],
          feeApr: Big(apr[item.address]).toFixed(2),
          marketApr: Big(marketApr).toFixed(2),
          apr: Big(apr[item.address]).add(marketApr).toFixed(2),
          boost,
          event,
          kim,
          xkim,
        };
      });
      setPools(_pools);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setPools([]);
    }
  }, [pairs]);

  useEffect(() => {
    queryPools();
  }, []);

  return { pools, loading };
}
