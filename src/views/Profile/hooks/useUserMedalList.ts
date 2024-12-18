import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';

import type { MedalType, Tab } from '../types';

export default function useUserMedalList(tab: Tab) {
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const [userMedalList, setUserMedalList] = useState<MedalType[]>([]);
  const [userMedalQuantity, setUserMedalQuantity] = useState<number>(0);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const queryUserMedalList = async (query: any) => {
    if (loading) return;
    setLoading(true);
    setLoaded(false);
    try {
      const result = await get(`/api/medal/list-by-account`, query);
      const data = (result.data || []).filter((medal: MedalType) => {
        return Number(medal?.completed_percent) < 100;
      });
      setUserMedalList(data);
      setUserMedalQuantity(data.length);
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
      if (account) {
        check(() => {
          queryUserMedalList({
            status: 'in_process'
          });
        });
      } else {
        setLoaded(true);
        setUserMedalList([]);
      }
    },
    { wait: userMedalList ? 800 : 3000 }
  );
  useEffect(() => {
    run();
  }, [account]);
  useEffect(() => {
    if (tab === 'InProgress') {
      run();
    } else {
      setLoaded(false);
      setUserMedalList([]);
    }
  }, [tab]);

  return { loading, loaded, userMedalList, userMedalQuantity, queryUserMedalList };
}
