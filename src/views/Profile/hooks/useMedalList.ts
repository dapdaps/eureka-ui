import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';

import type { MedalType } from '../types';

export default function useMedalList(updater?: number) {
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const [medalList, setMedalList] = useState<MedalType[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const queryMedalList = async () => {
    if (loading) return;
    setLoading(true);
    setLoaded(false);
    try {
      const result = await get(`/api/medal/list`);
      const data = result.data || [];
      setMedalList(data);
      setLoading(false);
      setLoaded(true);
    } catch (err) {
      console.log(err, 'err');
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  };
  const { run } = useDebounceFn(
    () => {
      account &&
        check(() => {
          queryMedalList();
        });
    },
    { wait: medalList ? 800 : 3000 }
  );

  useEffect(() => {
    run();
  }, [account, updater]);
  return { loading, loaded, medalList, queryMedalList };
}
