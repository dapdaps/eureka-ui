import { useEffect, useState } from 'react';

import { get } from '@/utils/http';

export default function useActionList({ account, source, page }: any) {
  const [actionList, setActionList] = useState<any>();
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    try {
      setLoading(true);
      const result = await get('/api/action/list', {
        page,
        source,
        account,
      });

      if (result.code === 0 && result.data) {
        setActionList(result.data);
        setCount(result.data?.total?.count);
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
  }, [account, source, page]);

  return { actionList, count, loading };
}
