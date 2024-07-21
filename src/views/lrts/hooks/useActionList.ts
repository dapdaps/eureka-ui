import { useEffect, useState } from 'react';

import { get } from '@/utils/http';

export default function useActionList({ account, source }: any) {
  const [actionList, setActionList] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    try {
      setLoading(true);
      const result = await get('/api/action/list', {
        account,
        source,
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
  };

  useEffect(() => {
    fetchList();
  }, [account, source]);

  return { actionList, loading };
}
