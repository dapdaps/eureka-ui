import { useDebounceFn } from 'ahooks';
import { useState } from 'react';

import useAuthCheck from '@/hooks/useAuthCheck';
import { post } from '@/utils/http';
export default function useMedalDiscord() {
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });
  const [loading, setLoading] = useState(false);
  const [updateMedal, setUpdateMedal] = useState(false);

  const postMedalDiscord = async () => {
    if (loading) return;
    setUpdateMedal(false);
    setLoading(true);
    try {
      const result = await post('/api/medal/discord');
      setUpdateMedal(result?.data?.update);
      setLoading(false);
    } catch (err) {
      console.log(err, 'err');
    } finally {
      setLoading(false);
    }
  };
  const { run } = useDebounceFn(
    () => {
      check(() => {
        postMedalDiscord();
      });
    },
    { wait: 1500, leading: true }
  );
  return { loading, run, updateMedal };
}
