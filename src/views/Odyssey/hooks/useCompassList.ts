import { get } from '@/utils/http';
import { useCallback, useEffect, useState } from 'react';

export default function useCompassList(campaign_id?: string) {
  const [compassList, setCompassList] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const queryCompassList = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`/api/compass/list`, {
        status: "all"
      });
      const data = result.data || [];
      setCompassList(data.sort((a: any, b: any) => b.id - a.id));
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    queryCompassList();
  }, []);

  return { loading, compassList };
}
