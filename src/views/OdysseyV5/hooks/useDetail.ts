import { useDebounceFn } from 'ahooks';
import { useCallback, useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';

export default function useDetail(id: any, option: { quests: any[], setExploredAmount: any, setQuests: any }) {
  const { quests, setExploredAmount, setQuests } = option;

  const [detail, setDetail] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const queryDetail = useCallback(async (currentDappId?: any, currnetDappTimes?: any) => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const result = await get('/api/compass/v4/detail', { id });

      if (result.code === 0 && result.data) {
        setDetail({ ...result.data });
      } else {
        setDetail({});
      }
      if (currentDappId) {
        try {
          let _exploredAmount = 0;
          const _quests = quests;
          for (const arr of Object.values(_quests)) {
            for (const it of arr) {
              if (it.id === currentDappId) {
                it.exploredAmount = currnetDappTimes;
              }
              _exploredAmount += it.exploredAmount;
            }
          }
          setQuests(_quests);
          setExploredAmount(_exploredAmount);
        } catch (err) {
        }
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [quests, loading]);

  const { run } = useDebounceFn(
    () => {
      if (!account) {
        queryDetail();
        return;
      }
      check(queryDetail);
    },
    { wait: detail ? 600 : 3000 },
  );

  useEffect(() => {
    run();
  }, [account]);

  return { detail: detail || {}, loading, queryDetail };
}
