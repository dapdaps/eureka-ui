import { useCallback, useState } from 'react';

import { get } from '@/utils/http';
export default function usePool() {
  const [pool, setPool] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const queryPool = useCallback(async (query: any) => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get('/api/launchpad/pool', query);
      const data = result.data || null
      setPool(data);
      setLoading(false);
    } catch (err) {
      console.log('=err', err)
      setLoading(false);
    }
  }, [loading]);
  return { loading, pool, queryPool };
}
