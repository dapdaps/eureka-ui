import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';

import type { PagerType, RewardRecordsType, Tab } from '../types';


export default function useUserRewardRecords(tab: Tab) {
  const { account } = useAccount()
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });
  const [userRewardRecords, setUserRewardRecords] = useState<RewardRecordsType | null>(null);
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false);
  const [pager, setPager] = useState<PagerType>({
    page: 1,
    page_size: 10
  })

  const queryUserRewardRecords = async (_pager: PagerType) => {
    if (loading) return;
    setLoading(true);
    setLoaded(false);
    try {
      const result = await get(`/api/user/reward/records`, {
        ..._pager
      });
      const data = (result.data || [])
      setUserRewardRecords(data);
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
        queryUserRewardRecords(pager)
      });
    },
    { wait: userRewardRecords ? 800 : 3000 },
  );

  useEffect(() => {
    (tab === "RewardHistory" || !loaded) && run();
  }, [account, tab]);

  return { loading, loaded, pager, setPager, userRewardRecords, queryUserRewardRecords };
}
