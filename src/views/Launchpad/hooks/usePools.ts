import { useCallback, useState } from 'react';

import { get } from '@/utils/http';

export default function usePools() {
  const [pools, setPools] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const queryPools = useCallback(async (query?: Record<string, any>) => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`/api/launchpad/pools`, query);
      setPools(result.data || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [loading]);


  return { loading, pools, queryPools };
}
