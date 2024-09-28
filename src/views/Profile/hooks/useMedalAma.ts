import { useDebounceFn } from 'ahooks';
import { useState } from 'react';

import useAuthCheck from '@/hooks/useAuthCheck';
import { post } from '@/utils/http';

export type DataType = {
  medal_id: number;
  code: string;
};
export default function useMedalAma() {
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const postMedalAma = async (data: DataType) => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await post('/api/medal/ama', data);
      setLoading(false);
      return result;
    } catch (err) {
      console.log(err, 'err');
    } finally {
      setLoading(false);
    }
  };
  return { loading, postMedalAma };
}
