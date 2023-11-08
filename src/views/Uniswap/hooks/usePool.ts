import { useEffect, useState } from 'react';
import useAccount from '@/hooks/useAccount';
import { getPoolInfo } from '../utils/getPool';
import { useCachedPoolsStore } from '@/stores/pools';

export default function usePool(token0: string, token1: string, fee: number, tokenId?: string) {
  const { provider } = useAccount();
  const [pool, setPool] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const cachedPoolsStore: any = useCachedPoolsStore();
  useEffect(() => {
    if (!token0 || !token1 || !fee) return;
    const getInfo = async () => {
      if (tokenId && cachedPoolsStore.getPool(tokenId)) {
        setPool(cachedPoolsStore.getPool(tokenId));
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const poolInfo = await getPoolInfo({ token0, token1, fee, provider });

        if (tokenId) {
          cachedPoolsStore.setPool({ ...poolInfo, id: tokenId });
        }
        setPool(poolInfo);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    getInfo();
  }, [token0, token1, fee]);
  return { pool, loading };
}
