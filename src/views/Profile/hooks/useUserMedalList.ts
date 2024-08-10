import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';
import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';
import { MedalType } from '../types';


export default function useMedalList() {
  const { account } = useAccount()
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const [userMedalList, setUserMedalList] = useState<MedalType[]>([]);
  const [loading, setLoading] = useState(false);

  const queryUserMedalList = async (query: any) => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`/api/medal/list-by-account`, query);
      const data = (result.data || [])
      setUserMedalList(data);
      setLoading(false);
    } catch (err) {
      console.log(err, 'err');
    } finally {
      setLoading(false);
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
    run();
  }, [account]);

  return { loading, userMedalList, queryUserMedalList };
}
