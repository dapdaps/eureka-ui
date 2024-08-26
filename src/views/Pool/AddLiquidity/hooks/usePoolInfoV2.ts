import Big from 'big.js';
import { Contract } from 'ethers';
import { useCallback, useEffect,useState } from 'react';

import multicallAddresses from '@/config/contract/multicall';
import useAccount from '@/hooks/useAccount';
import { multicall } from '@/utils/multicall';

import factoryAbi from '../../abi/factoryV2';
import poolAbi from '../../abi/poolV2';
import useDappConfig from '../../hooks/useDappConfig';
import { wrapNativeToken } from '../../utils/token';

export default function usePoolInfoV2({ token0, token1, fee }: any) {
  const [info, setInfo] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { chainId, provider } = useAccount();
  const { contracts } = useDappConfig();

  const queryPool = useCallback(async () => {
    if (!chainId) return;
    setLoading(true);

    try {
      const _contracts = contracts[chainId];
      const factoryAddress = fee === 0.3 ? _contracts.Factory3 : _contracts.Factory10;
      const FactoryContract = new Contract(factoryAddress, factoryAbi, provider);
      const poolAddress = await FactoryContract.getPair(
        wrapNativeToken(token0).address,
        wrapNativeToken(token1).address,
      );

      if (!poolAddress || poolAddress === '0x0000000000000000000000000000000000000000') {
        setInfo(null);
        setLoading(false);
        return;
      }

      const calls = [
        {
          address: poolAddress,
          name: 'getReserves',
        },
      ];

      const multicallAddress = multicallAddresses[chainId];

      const [reserves] = await multicall({
        abi: poolAbi,
        calls: calls,
        options: {},
        multicallAddress,
        provider,
      });

      setInfo({
        reserve0: reserves ? (Big(reserves[0] || 0).eq(0) ? 0 : reserves[0]) : 0,
        reserve1: reserves ? (Big(reserves[1] || 0).eq(0) ? 0 : reserves[1]) : 0,
        routerAddress: fee === 0.3 ? _contracts.Router3 : _contracts.Router10,
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

  return { info, loading, queryPool };
}
