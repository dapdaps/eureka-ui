import { useEffect, useState } from 'react';
import useAccount from '@/hooks/useAccount';
import { getPoolSlot } from '../utils/getPool';

export default function usePool(token0: string, token1: string, fee: number) {
  const { provider } = useAccount();
  const [pool, setPool] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!token0 || !token1 || !fee) return;
    const getPoolInfo = async () => {
      setLoading(true);
      try {
        const poolInfo = await getPoolSlot({ token0, token1, fee, provider });
        setPool(poolInfo);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    getPoolInfo();
  }, [token0, token1, fee]);
  return { pool, loading };
}
