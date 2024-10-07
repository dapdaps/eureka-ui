import { Contract } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import { multicall, multicallAddresses } from '@/utils/multicall';

import factoryAbi from '../../abi/factory';
import factoryAlgebraAbi from '../../abi/factoryAlgebra';
import poolAbi from '../../abi/pool';
import poolAlgebraAbi from '../../abi/poolAlgebra';
import useDappConfig from '../../hooks/useDappConfig';
import { wrapNativeToken } from '../../utils/token';

export default function usePoolInfo({ token0, token1, fee }: any) {
  const [info, setInfo] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { chainId, provider } = useAccount();
  const { contracts, poolType } = useDappConfig();

  const queryAlgebraPool = useCallback(async () => {
    if (!chainId) return;
    setLoading(true);

    try {
      const { Factory, PositionManager } = contracts[chainId];
      const FactoryContract = new Contract(Factory, factoryAlgebraAbi, provider);
      const poolAddress = await FactoryContract.poolByPair(
        wrapNativeToken(token0).address,
        wrapNativeToken(token1).address
      );

      if (!poolAddress || poolAddress === '0x0000000000000000000000000000000000000000') {
        setInfo(null);
        setLoading(false);
        return;
      }

      const calls = [
        {
          address: poolAddress,
          name: 'globalState'
        },
        { address: poolAddress, name: 'tickSpacing' },
        {
          address: poolAddress,
          name: 'token0'
        },
        {
          address: poolAddress,
          name: 'token1'
        },
        {
          address: poolAddress,
          name: 'liquidity'
        }
      ];

      const multicallAddress = multicallAddresses[chainId];

      const [slot0, tickSpacing, _token0, _token1, liquidity] = await multicall({
        abi: poolAlgebraAbi,
        calls: calls,
        options: {},
        multicallAddress,
        provider
      });

      setInfo({
        currentTick: slot0.tick,
        tickSpacing: tickSpacing[0],
        token0: _token0[0],
        token1: _token1[0],
        sqrtPriceX96: slot0.price.toString(),
        poolAddress,
        liquidity: liquidity ? liquidity.toString() : '0',
        fee: slot0.fee,
        positionManager: PositionManager
      });

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setInfo(null);
    }
  }, [token0, token1, chainId]);

  const queryPool = useCallback(async () => {
    if (!chainId) return;
    setLoading(true);

    try {
      const { Factory, PositionManager } = contracts[chainId];
      const FactoryContract = new Contract(Factory, factoryAbi, provider);
      const poolAddress = await FactoryContract.getPool(
        wrapNativeToken(token0).address,
        wrapNativeToken(token1).address,
        fee
      );

      if (!poolAddress || poolAddress === '0x0000000000000000000000000000000000000000') {
        setInfo(null);
        setLoading(false);
        return;
      }

      const calls = [
        {
          address: poolAddress,
          name: 'slot0'
        },
        { address: poolAddress, name: 'tickSpacing' },
        {
          address: poolAddress,
          name: 'token0'
        },
        {
          address: poolAddress,
          name: 'token1'
        },
        {
          address: poolAddress,
          name: 'liquidity'
        }
      ];

      const multicallAddress = multicallAddresses[chainId];

      const [slot0, tickSpacing, _token0, _token1, liquidity] = await multicall({
        abi: poolAbi,
        calls: calls,
        options: {},
        multicallAddress,
        provider
      });

      setInfo({
        currentTick: slot0.tick,
        tickSpacing: tickSpacing[0],
        token0: _token0[0],
        token1: _token1[0],
        sqrtPriceX96: slot0.sqrtPriceX96.toString(),
        poolAddress,
        liquidity: liquidity ? liquidity.toString() : '0',
        positionManager: PositionManager
      });

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setInfo(null);
    }
  }, [token0, token1, fee, chainId]);

  useEffect(() => {
    if (!token0 || !token1) return;
    if (poolType === 'algebra') {
      queryAlgebraPool();
    }
    if (fee) queryPool();
  }, [token0, token1, fee, chainId]);

  return { info, loading };
}
