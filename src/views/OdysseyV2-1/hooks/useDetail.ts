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

  const queryDetail = useCallback(async (currentDappId?: any, currentDappTimes?: any) => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const result = await get('/api/compass/v4/detail', { id: 6 });
      if (result.code === 0 && result.data) {
        setDetail({
          total_users: result.data.total_users,
          total_transactions: result.data.total_transactions,
          trading_volume: result.data.trading_volume,
          unclaimed_reward: result.data.user?.unclaimed_reward,
          total_reward: result.data.user?.total_reward,
        });
        console.log(JSON.parse(result.data.rule));
      } else {
        setDetail({});
      }
      if (currentDappId) {
        try {
          let _exploredAmount = 0;
          const _quests = quests;
          for (const questKey in _quests) {
            if (questKey === 'mode') continue;
            const arr = _quests[questKey];
            for (const it of arr) {
              if (it.id === currentDappId) {
                it.exploredAmount = currentDappTimes;
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
  }, []);

  const { run } = useDebounceFn(
    () => {
      if (!account) {
        queryDetail();
        return;
      }
      check(queryDetail);
    },
    { wait: detail ? 800 : 3000 },
  );

  useEffect(() => {
    run();
  }, [account]);

  return { detail: detail || {}, loading, queryDetail };
}
