import { Contract } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';

import factoryAbi from '../../abi/factory';
import poolAbi from '../../abi/pool';
import positionAbi from '../../abi/position';
import useDappConfig from '../../hooks/useDappConfig';

export default function usePoolDetail(tokenId: string) {
  const [detail, setDetail] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { contracts } = useDappConfig();
  const { chainId, provider } = useAccount();

  const queryDetail = useCallback(async () => {
    if (!tokenId || !chainId || !contracts[chainId]) {
      return;
    }

    setLoading(true);
    try {
      const { PositionManager, Factory } = contracts[chainId];
      const PositionContract = new Contract(PositionManager, positionAbi, provider);
      const position = await PositionContract.positions(tokenId);
      const FactoryContract = new Contract(Factory, factoryAbi, provider);
      const poolAddress = await FactoryContract.getPool(position.token0, position.token1, position.fee);
      const PoolContract = new Contract(poolAddress, poolAbi, provider);
      const pool = await PoolContract.slot0();
      const _detail: { [key: string]: any } = {
        fee: position.fee,
        token0: position.token0,
        token1: position.token1,
        liquidity: position.liquidity,
        tickLower: position.tickLower,
        tickUpper: position.tickUpper,
        currentTick: pool.tick,
        tokenId: tokenId,
        chainId,
      };
      if (position.liquidity.eq(0)) {
        _detail.status = 'removed';
      } else {
        _detail.status = pool.tick < position.tickLower || pool.tick >= position.tickUpper ? 'out' : 'in';
      }

      setDetail(_detail);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setDetail(null);
    }
  }, [tokenId, chainId]);

  useEffect(() => {
    queryDetail();
  }, [tokenId, chainId]);

  return { detail, loading, queryDetail };
}
