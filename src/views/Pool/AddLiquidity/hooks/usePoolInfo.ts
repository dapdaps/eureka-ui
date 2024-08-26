import { Contract } from 'ethers';
import { useCallback, useEffect,useState } from 'react';

import multicallAddresses from '@/config/contract/multicall';
import useAccount from '@/hooks/useAccount';
import { multicall } from '@/utils/multicall';

import factoryAbi from '../../abi/factory';
import poolAbi from '../../abi/pool';
import useDappConfig from '../../hooks/useDappConfig';
import { wrapNativeToken } from '../../utils/token';

export default function usePoolInfo({ token0, token1, fee }: any) {
  const [info, setInfo] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { chainId, provider } = useAccount();
  const { contracts } = useDappConfig();

  const queryPool = useCallback(async () => {
    if (!chainId) return;
    setLoading(true);

    try {
      const { Factory, PositionManager } = contracts[chainId];
      const FactoryContract = new Contract(Factory, factoryAbi, provider);
      const poolAddress = await FactoryContract.getPool(
        wrapNativeToken(token0).address,
        wrapNativeToken(token1).address,
        fee,
      );

      if (!poolAddress || poolAddress === '0x0000000000000000000000000000000000000000') {
        setInfo(null);
        setLoading(false);
        return;
      }

      const calls = [
        {
          address: poolAddress,
          name: 'slot0',
        },
        { address: poolAddress, name: 'tickSpacing' },
        {
          address: poolAddress,
          name: 'token0',
        },
        {
          address: poolAddress,
          name: 'token1',
        },
        {
          address: poolAddress,
          name: 'liquidity',
        },
      ];

      const multicallAddress = multicallAddresses[chainId];

      const [slot0, tickSpacing, _token0, _token1, liquidity] = await multicall({
        abi: poolAbi,
        calls: calls,
        options: {},
        multicallAddress,
        provider,
      });

      setInfo({
        currentTick: slot0.tick,
        tickSpacing: tickSpacing[0],
        token0: _token0[0],
        token1: _token1[0],
        sqrtPriceX96: slot0.sqrtPriceX96.toString(),
        poolAddress,
        liquidity: liquidity ? liquidity.toString() : '0',
        positionManager: PositionManager,
      });

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setInfo(null);
    }
  }, [token0, token1, fee, chainId]);

  useEffect(() => {
    if (!token0 || !token1 || !fee) return;
    queryPool();
  }, [token0, token1, fee, chainId]);

  return { info, loading };
}
