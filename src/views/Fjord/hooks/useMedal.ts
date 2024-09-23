import { useCallback, useState } from 'react';

import { get } from '@/utils/http';
import type { MedalType } from '@/views/Profile/types';
export default function useMedal() {
  const [medal, setMedal] = useState<null | MedalType>(null);
  const [loading, setLoading] = useState(false);
  const queryMedal = useCallback(
    async (query: any) => {
      if (loading) return;
      setLoading(true);
      try {
        const result = await get('/api/medal', query);
        const data = result.data ? result.data[0] : null;
        setMedal(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    },
    [loading]
  );
  return { loading, medal, queryMedal };
}
