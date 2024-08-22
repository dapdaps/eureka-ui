import { useEffect, useState } from 'react';

import { QUEST_PATH } from '@/config/quest';
import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';

export default function useChainDappMedal (category: string, id: number) {

  const [loading, setLoading] = useState<boolean>(false);
  const [medalList, setMedalList] = useState<any>([]);
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await get(`${QUEST_PATH}/api/medal`, { category, id });
      setMedalList(response?.data ?? []);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!category || !id) return;
    if (account) {
      check(fetchData);
      return;
    }
    fetchData();
  }, [category, id, account]);


  return {
    loading,
    medalList,
    account
  }
}