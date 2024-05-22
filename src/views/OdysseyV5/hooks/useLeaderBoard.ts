import { useDebounceFn } from "ahooks";
import { useCallback, useEffect, useState } from 'react';

import useAccount from "@/hooks/useAccount";
import useAuthCheck from "@/hooks/useAuthCheck";
import { get } from '@/utils/http';

export default function useLeaderBoard(id: any) {
  const [ranks, setRanks] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await get('/api/compass/leaderboard', { id });

      if (result.code === 0 && result.data) {
        const _rank = (result.data?.data ?? []).slice(0, 10);
        const _user = result.data?.user;
        setRanks({ data: _rank, user: _user});
      } else {
        setRanks({});
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  const { run } = useDebounceFn(() => {
    if (!account) {
      fetchData();
      return;
    }
    check(fetchData);
  }, { wait: ranks ? 600 : 3000 });

  useEffect(() => {
    if (!id) return;
    run();
  }, [id, account]);

  return { ranks, loading, fetchData };
}
