import { useEffect, useRef, useState } from 'react';

import useAccount from '@/hooks/useAccount';

import useDappConfig from '../../hooks/useDappConfig';
import getAlgebraPools from '../getAlgebraPools';
import getThrusterPools from '../getThrusterPools';
import getV3Pools from '../getV3Pools';

export default function usePools() {
  const { account, provider } = useAccount();
  const { chainId, contracts, poolType, basic } = useDappConfig();
  const [pools, setPools] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const timer = useRef<any>();

  const queryList = async () => {
    if (!account) return;
    setPools([]);
    setLoading(true);
    try {
      let _pools: any = [];
      if (poolType === 'algebra') {
        _pools = await getAlgebraPools({
          contracts,
          chainId,
          account,
          provider
        });
      }
      if (basic.name === 'Thruster Finance') {
        _pools = await getThrusterPools({
          account,
          chainId
        });
      }
      if (basic.name === 'Nile') {
        _pools = await getV3Pools({
          contracts,
          chainId,
          account,
          provider
        });
      }
      setPools(_pools);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (!account) {
        setPools([]);
        setLoading(false);
        return;
      }
      queryList();
    }, 500);
  }, [account, chainId]);

  return { pools, loading };
}
