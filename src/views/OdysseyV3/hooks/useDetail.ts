import { useDebounceFn } from 'ahooks';
import { useCallback, useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';

export default function useDetail() {
  const [detail, setDetail] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const queryDetail = useCallback(async () => {
    try {
      setLoading(true);
      const result = await get('/api/compass/v3/detail', { id: 3 });
      if (result.code === 0 && result.data) {
        const _rules = JSON.parse(result.data.rule);
        let i = 0;
        _rules.forEach((rule: number) => {
          if (result.data.user?.total_reward - rule >= 0 && result.data.user?.total_reward > 0) {
            i++;
          }
        });
        setDetail({
          rules: _rules,
          available_rewards: result.data.user?.unclaimed_reward || 0,
          total_reward: result.data.user?.total_reward || 0,
          total_spins: result.data.user?.total_spins || 0,
          synthesizedIndex: i,
        });
      } else {
        setDetail({});
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
    { wait: detail ? 600 : 3000 },
  );

  useEffect(() => {
    run();
  }, [account]);

  return { detail: detail || {}, loading, queryDetail };
}
