import { get } from '@/utils/http';
import { useCallback, useState } from 'react';

type QueryType = {
  account: string | undefined;
  source?: string;
  template?: string;
  action_type?: string;
  page?: number;
  page_size?: number;
  action_tokens?: string;
};
export default function useQueryActionList() {
  const [loading, setLoading] = useState(false);
  const [actionList, setActionList] = useState<any[]>([])

  const queryActionList = useCallback(async (query: QueryType) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await get('/api/action/list', query);
      const result = response?.data
      setActionList(result.data)
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  return { loading, actionList, queryActionList };
}
