import { useDebounceFn } from 'ahooks';
import { cloneDeep } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';

import { GOLD_QUESTS } from '../const';

const defaultQuests: any = { social: [], bridge: [], swap: [], lending: [], liquidity: [], golds: [] };

export default function useQuests(id: any) {
  const [quests, setQuests] = useState(null);
  const [loading, setLoading] = useState(true);
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const queryQuests = useCallback(async () => {
    try {
      setLoading(true);
      const result = await get('/api/compass/v2/quest_list', { id });
      setLoading(false);
      if (result.code !== 0 || !result.data?.length) {
        setQuests(defaultQuests);
        return;
      }
      const _result = cloneDeep(defaultQuests);

      const _unlockedAmount = result.data.filter((item: any) => item.total_spins > 0).length;

      _result.unlockedAmount = _unlockedAmount;

      result.data.forEach((item: any) => {
        if (GOLD_QUESTS.includes(item.name)) {
          _result.golds.push(item);
        }
        if (item.category_id === 0 && item.category !== 'twitter_retweet') {
          _result.social.push(item);
        }
        if (item.category_id === 1) {
          _result.bridge.push(item);
        }
        if (item.category_id === 2) {
          _result.swap.push(item);
        }
        if (item.category_id === 3) {
          _result.lending.push(item);
        }
        if (item.category_id === 4) {
          _result.liquidity.push(item);
        }
      });
      setQuests(_result);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  const { run } = useDebounceFn(
    () => {
      if (!account) {
        queryQuests();
        return;
      }
      check(queryQuests);
    },
    { wait: quests ? 600 : 3000 },
  );

  useEffect(() => {
    run();
  }, [account]);

  return { loading, quests: quests || defaultQuests };
}
