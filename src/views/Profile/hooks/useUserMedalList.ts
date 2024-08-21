import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';
import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';
import { MedalType, Tab } from '../types';


export default function useMedalList(tab: Tab) {
  const { account } = useAccount()
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const [userMedalList, setUserMedalList] = useState<MedalType[]>([]);
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false);

  const queryUserMedalList = async (query: any) => {
    if (loading) return;
    setLoading(true);
    setLoaded(false);
    try {
      const result = await get(`/api/medal/list-by-account`, query);
      const data = (result.data || [])
        .filter((medal: MedalType) => {
          return Number(medal?.completed_percent) < 100
        })
      setUserMedalList(data);
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
      account && check(() => {
        queryUserMedalList({
          status: 'in_process'
        })
      });
    },
    { wait: userMedalList ? 800 : 3000 },
  );

  useEffect(() => {
    (tab === 'InProgress' || !loaded) && run();
  }, [account, tab]);

  return { loading, loaded, userMedalList, queryUserMedalList };
}
