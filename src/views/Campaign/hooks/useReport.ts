import { useCallback, useState } from 'react';

import { post } from '@/utils/http';

export default function useReport() {
  const [loading, setLoading] = useState(false);

  const handleReport = useCallback(async (id: number) => {
    if (loading) return false;
    setLoading(true);

    try {
      const res = await post('/api/campaign/source', {
        quest_id: id
      });
      if (res.code !== 0) {
        setLoading(false);
        return false;
      }
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      return false;
    }
  }, []);

  return { loading, handleReport };
}
