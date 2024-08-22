import { useCallback, useState } from 'react';

import { AUTH_TOKENS,get } from '@/utils/http';

export default function useUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const queryUser = useCallback(async (query?: Record<string, any>) => {
    if (loading) return;
    setLoading(true);
    try {
      const tokens = JSON.parse(window.sessionStorage.getItem(AUTH_TOKENS) || '{}')
      if (tokens && tokens.access_token) {
        const result = await get(`/api/launchpad/user`, query);
        setUser(result.data || []);
        setLoading(false);
      } else {
        setTimeout(() => {
          queryUser()
        }, 500)
      }
    } catch (err) {
      setLoading(false);
    }
  }, [loading]);


  return { loading, user, queryUser };
}
