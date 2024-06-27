import { useCallback, useEffect, useState, useRef } from 'react';
import useAccount from '@/hooks/useAccount';

export default function usePools() {
  const { account } = useAccount();

  const [pools, setPools] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const timer = useRef<any>();

  const queryList = useCallback(async () => {
    setLoading(true);
    setPools([]);
    try {
      setPools(pools);
      const response = await fetch(
        `https://api.thruster.finance/v2/user/positions?userAddress=${account}&chainId=81457`,
      );
      const result = await response.json();
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
      if (!account) {
        setPools([]);
        setLoading(false);
        return;
      }
      queryList();
    }, 500);
  }, [account]);

  return { pools, loading };
}
