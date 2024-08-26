import { useCallback, useState } from 'react';

import useToast from '@/hooks/useToast';
import { post } from '@/utils/http';

export default function useStart(onSuccess: VoidFunction) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onStartReport = useCallback(async () => {
    setLoading(true);
    try {
      const result = await post('/api/compass/flip', { id: 2 });
      if (result.code === 0) {
        onSuccess();
      } else {
        toast.fail({
          title: result.msg || 'Start failed',
        });
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  return { loading, onStartReport };
}
