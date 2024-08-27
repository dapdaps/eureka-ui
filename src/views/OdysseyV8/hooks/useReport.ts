import { useCallback, useState } from 'react';

import { post } from '@/utils/http';

export default function useReport(isV2?: boolean) {
  const [loading, setLoading] = useState(false);

  const handleReport = useCallback(async (id: string, step?: number) => {
    if (loading) return;
    setLoading(true);

    try {
      await post(isV2 ? '/api/compass/v2/source' : '/api/compass/source', {
        quest_id: id,
        step,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  return { loading, handleReport };
}
