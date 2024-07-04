import { useCallback, useState } from 'react';

import { get } from '@/utils/http';

export default function useUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const queryUser = useCallback(async (query?: Record<string, any>) => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`/api/launchpad/user`, query);
      setUser(result.data || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [loading]);


  return { loading, user, queryUser };
}
