import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';
import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';
import { FavoriteType, InviteListType } from '../types';
import { CategoryList } from '@/views/AllDapps/config';
import chainCofig from '@/config/chains';

// /api/invite/v1/list
export default function useInviteList() {
  const { account } = useAccount()
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });
  const [inviteList, setInviteList] = useState<InviteListType | null>(null);
  const [loading, setLoading] = useState(false);

  const queryInviteList = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`/api/invite/v1/list`);
      const data = (result.data || [])
      setInviteList(data);
      setLoading(false);
    } catch (err) {
      console.log(err, 'err');
    } finally {
      setLoading(false);
    }
  };
  const { run } = useDebounceFn(
    () => {
      account && check(queryInviteList);
    },
    { wait: inviteList ? 800 : 3000 },
  );

  useEffect(() => {
    run();
  }, [account]);

  return { loading, inviteList };
}
