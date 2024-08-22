import { useCallback, useState } from 'react';

import useToast from '@/hooks/useToast';
import { post } from '@/utils/http';

export default function useClaim() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onClaim = async (id: number, onSuccess: VoidFunction) => {
    setLoading(true);
    try {
      const result = await post('/api/compass/claim', {
        id
      });
      if (result.code === 0) {
        toast.success({
          title: 'Claim successfully',
        });
        onSuccess && onSuccess()
      } else {
        toast.fail({
          title: result.msg || 'Claim failed',
        });
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return { loading, onClaim };
}
