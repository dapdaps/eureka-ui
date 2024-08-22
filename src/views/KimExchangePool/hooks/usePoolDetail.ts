import { Contract } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useDappConfig from '@/views/Pool/hooks/useDappConfig';

import poolAbi from '../abi/pool';
import positionAbi from '../abi/positions';
import { getPairByTokens, revertTokenAddress } from '../token';

export default function usePoolDetail(tokenId: string) {
  const [detail, setDetail] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { contracts, pairs, tokens } = useDappConfig();
  const { chainId, provider } = useAccount();

  const queryDetail = useCallback(async () => {
    if (!tokenId || !chainId || !contracts[chainId]) {
      return;
    }
    setLoading(true);
    try {
      const { PositionManager } = contracts[chainId];
      const PositionContract = new Contract(PositionManager, positionAbi, provider);
      const position = await PositionContract.positions(tokenId);
      const _token0 = revertTokenAddress(position.token0, chainId);
      const _token1 = revertTokenAddress(position.token1, chainId);
      const pair = getPairByTokens({
        token0: position.token0.toLowerCase(),
        token1: position.token1.toLowerCase(),
        pairs: Object.values(pairs),
        chainId,
      });
      const PoolContract = new Contract(pair.address, poolAbi, provider);
      const pool = await PoolContract.globalState();
      const _tokens = tokens[chainId];
      setDetail({
        liquidity: position.liquidity,
        tickLower: position.tickLower,
        tickUpper: position.tickUpper,
        currentTick: pool.tick,
        address: pair.address,
        token0: _tokens[_token0],
        token1: _tokens[_token1],
        tickSpacing: pair.tickSpacing,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setDetail(null);
    }
  }, [tokenId, chainId]);

  useEffect(() => {
    queryDetail();
  }, [tokenId, chainId]);

  return { detail, loading, queryDetail };
}
