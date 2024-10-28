import { Contract } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';

import factoryAbi from '../../abi/factory';
import factoryAlgebraAbi from '../../abi/factoryAlgebra';
import poolAbi from '../../abi/pool';
import poolAlgebraAbi from '../../abi/poolAlgebra';
import poolScribe from '../../abi/poolScribe';
import positionAbi from '../../abi/position';
import positionAlgebraAbi from '../../abi/positionAlgebra';
import positionScribe from '../../abi/positionScribe';
import useDappConfig from '../../hooks/useDappConfig';

export default function usePoolDetail(tokenId: string) {
  const [detail, setDetail] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { contracts, poolType, basic } = useDappConfig();
  const { chainId, provider } = useAccount();

  const queryDetail = useCallback(async () => {
    if (!tokenId || !chainId || !contracts[chainId]) {
      return;
    }

    setLoading(true);
    try {
      const { PositionManager, Factory } = contracts[chainId];
      const PositionContract = new Contract(
        PositionManager,
        basic.name === 'Scribe' ? positionScribe : poolType === 'algebra' ? positionAlgebraAbi : positionAbi,
        provider
      );
      const position = await PositionContract.positions(tokenId);
      const FactoryContract = new Contract(Factory, poolType === 'algebra' ? factoryAlgebraAbi : factoryAbi, provider);
      const poolAddress =
        poolType === 'algebra'
          ? await FactoryContract.poolByPair(position.token0, position.token1)
          : await FactoryContract.getPool(position.token0, position.token1, position.fee);
      const PoolContract = new Contract(
        poolAddress,
        basic.name === 'Scribe' ? poolScribe : poolType === 'algebra' ? poolAlgebraAbi : poolAbi,
        provider
      );
      const pool = poolType === 'algebra' ? await PoolContract.globalState() : await PoolContract.slot0();
      const _detail: { [key: string]: any } = {
        fee: position.fee || pool.fee || pool.lastFee,
        token0: position.token0,
        token1: position.token1,
        liquidity: position.liquidity,
        tickLower: position.tickLower,
        tickUpper: position.tickUpper,
        currentTick: pool.tick,
        tokenId: tokenId,
        chainId,
        tickSpacing: pool.tickSpacing
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
