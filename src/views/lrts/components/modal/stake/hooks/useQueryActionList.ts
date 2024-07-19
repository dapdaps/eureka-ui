import { get } from '@/utils/http';
import { useCallback, useState } from 'react';

type QueryType = {
  account: string;
  source?: string;
  template?: string;
  action_type?: string;
  page?: number;
  page_size?: number;
};
export default function useQueryActionList() {
  const [loading, setLoading] = useState(false);
  const [actionList, setActionList] = useState<any[]>([])

  const handleQueryActionList = useCallback(async (query: QueryType) => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get('/api/action/list', query);
      setActionList(result.data)
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  return { loading, actionList, handleQueryActionList };
}
