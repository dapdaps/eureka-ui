import { useCallback, useEffect,useState } from 'react';

import multicallAddresses from '@/config/contract/multicall';
import useAccount from '@/hooks/useAccount';
import { multicall } from '@/utils/multicall';

import poolAbi from '../abi/pool';

export default function usePoolInfo(address: string) {
  const [info, setInfo] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { chainId, provider } = useAccount();

  const queryPool = useCallback(async () => {
    if (!chainId) return;
    setLoading(true);

    try {
      const calls = [
        {
          address: address,
          name: 'globalState',
        },
        {
          address: address,
          name: 'liquidity',
        },
      ];

      const multicallAddress = multicallAddresses[chainId];

      const [globalState, liquidity] = await multicall({
        abi: poolAbi,
        calls: calls,
        options: {},
        multicallAddress,
        provider,
      });
      setInfo({
        currentTick: globalState.tick,
        liquidity: liquidity.toString(),
      });

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setInfo(null);
    }
  }, [address, chainId]);

  useEffect(() => {
    if (!address || !chainId) return;

    queryPool();
  }, [address, chainId]);

  return { info, loading };
}
