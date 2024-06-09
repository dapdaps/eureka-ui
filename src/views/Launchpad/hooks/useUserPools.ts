import { useCallback, useState } from 'react';

import { get } from '@/utils/http';

export default function useUserPools() {
  const [userPools, setUserPools] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const queryUserPools = useCallback(async (query?: Record<string, any>) => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`/api/launchpad/user/pools`, query);
      setUserPools(result.data || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [loading]);


  return { loading, userPools, queryUserPools };
}
