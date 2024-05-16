import { useCallback, useEffect, useState } from 'react';

import { get } from '@/utils/http';

export default function useLeaderBoard(id: any) {
  const [ranks, setRanks] = useState<any>();
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await get('/api/compass/leaderboard', { id });

      if (result.code === 0 && result.data) {
        setRanks({ ...result.data });
      } else {
        setRanks({});
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    fetchData();
  }, [id]);

  return { ranks, loading, fetchData };
}
