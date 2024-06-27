import { useCallback, useState } from 'react';
import { get } from '@/utils/http';

export default function useRewards(id: string) {
  const [loading, setLoading] = useState(false);
  const [rewards, setRewards] = useState<any>();

  const query = useCallback(async () => {
    try {
      setLoading(true);
      const result = await get('/api/compass/reward', { id });

      if (result.code === 0 && result.data?.rewards) {
        setRewards(result.data.rewards);
      } else {
        setRewards({});
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setRewards({});
    }
  }, [id]);

  return { rewards, loading, query };
}
