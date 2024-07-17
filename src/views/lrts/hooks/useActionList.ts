import { useCallback, useEffect, useState } from 'react';

import { useLrtDataStore } from '@/stores/lrts';
import { get } from '@/utils/http';

export default function useActionList(params: any) {
  const [actionList, setActionList] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetchList = useCallback(async () => {
    try {
      setLoading(true);
      const result = await get('/api/action/list', {
        ...params,
      });

      if (result.code === 0 && result.data) {
        setActionList(result.data);
      } else {
        setActionList([]);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, []);

  return { actionList, loading };
}
