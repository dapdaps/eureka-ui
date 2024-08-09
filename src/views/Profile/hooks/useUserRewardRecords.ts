import chainCofig from '@/config/chains';
import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';
import { CategoryList } from '@/views/AllDapps/config';
import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';
import { DappCategoryType, DappNetworkType, FavoriteType, PagerType, RewardRecordsType } from '../types';


export default function useUserRewardRecords() {
  const { account } = useAccount()
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });
  const [userRewardRecords, setUserRewardRecords] = useState<RewardRecordsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [pager, setPager] = useState<PagerType>({
    page: 1,
    page_size: 10
  })

  const queryUserRewardRecords = async (_pager: PagerType) => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`/api/user/reward/records`, {
        ..._pager
      });
      const data = (result.data || [])
      setUserRewardRecords(data);
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
        queryUserRewardRecords(pager)
      });
    },
    { wait: userRewardRecords ? 800 : 3000 },
  );

  useEffect(() => {
    run();
  }, [account]);

  return { loading, pager, setPager, userRewardRecords, queryUserRewardRecords };
}
