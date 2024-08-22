import { useCallback, useState } from 'react';

import useToast from '@/hooks/useToast';
import { post } from '@/utils/http';

export default function useSynthesis(onSuccess: VoidFunction) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onSynthesis = useCallback(async () => {
    setLoading(true);
    try {
      const result = await post('/api/compass/synthesis', { id: 3 });
      if (result.code === 0) {
        onSuccess();
        toast.success({
          title: 'Synthesize successfully',
        });
      } else {
        toast.fail({
          title: result.msg || 'Synthesize failed',
        });
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  return { loading, onSynthesis };
}
