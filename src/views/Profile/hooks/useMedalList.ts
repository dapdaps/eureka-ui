import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';
import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';
import { MedalType } from '../types';


export default function useMedalList() {
  const { account } = useAccount()
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const [medalList, setMedalList] = useState<MedalType[]>([]);
  const [loading, setLoading] = useState(false);

  const queryMedalList = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`/api/medal/list`);
      const data = (result.data || [])
      setMedalList(data);
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
        queryMedalList()
      });
    },
    { wait: medalList ? 800 : 3000 },
  );

  useEffect(() => {
    run();
  }, [account]);
  return { loading, medalList, queryMedalList };
}
