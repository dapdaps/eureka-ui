import { useCallback, useState } from 'react';

import useToast from '@/hooks/useToast';
import { post } from '@/utils/http';

export default function useParticleReport(onSuccess: VoidFunction) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onStartReport = useCallback(async () => {
    setLoading(true);
    try {
      const result = await post('/api/compass/v4/particle', {});
      if (result.code === 0) {
        onSuccess();
      } else {
        toast.fail({
          title: result.msg || 'Report failed',
        });
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  return { loading, onStartReport };
}
