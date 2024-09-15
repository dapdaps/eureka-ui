import Big from 'big.js';
import { useCallback, useState } from 'react';

import useToast from '@/hooks/useToast';
import { get } from '@/utils/http';
import type { Quest } from '@/views/Campaign/models';

export function useCheck() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleRefresh = useCallback(async (quest: Quest, cb?: (resData: RefreshRes) => void, data?: string) => {
    if (loading) return;
    setLoading(true);
    const toastId = toast.loading({
      title: data ? 'Action confirming' : 'Action refreshing'
    });
    try {
      const params = data ? { id: quest.id, data } : { id: quest.id };
      const result = await get(`/api/campaign/quest/check`, params);
      if (result.code !== 0) throw new Error(result.msg);
      setLoading(false);
      toast.dismiss(toastId);

      if (result.data) {
        cb && cb(result.data);

        toast.success({
          title: 'Action confirmed successfully'
        });
        return;
      }

      toast.fail({
        title: 'Action confirmed failed'
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.dismiss(toastId);
      toast.fail({
        title: data ? 'Action confirmed failed' : `Action refreshed failed`
      });
    }
  }, []);

  const checkCompleted = (quest: Quest) => {
    if (!quest) return false;
    return Big(quest.total_spins || 0)
      .div(quest.spins || 1)
      .gte(quest.times);
  };

  return { refreshing: loading, handleRefresh, checkCompleted };
}

interface RefreshRes {
  total_completed_times: number;
  total_spins: number;
}
