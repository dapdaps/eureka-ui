import { useCallback, useEffect, useRef,useState } from 'react';

import useAccount from '@/hooks/useAccount';

import useDappConfig from '../../hooks/useDappConfig';

export default function usePools() {
  const { account } = useAccount();
  const { chainId } = useDappConfig();
  const [pools, setPools] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const timer = useRef<any>();

  const queryList = useCallback(async () => {
    if (!account) return;
    setPools([]);
    setLoading(true);
    try {
      setPools(pools);
      const response = await fetch(
        `https://api.thruster.finance/v2/user/positions?userAddress=${account?.toLowerCase()}&chainId=81457`,
      );
      const result = await response.json();
      setPools(result?.reduce ? result : []);
      setPools(result);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [account]);

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (!account || chainId !== 81457) {
        setPools([]);
        setLoading(false);
        return;
      }
      queryList();
    }, 500);
  }, [account, chainId]);

  return { pools, loading };
}
