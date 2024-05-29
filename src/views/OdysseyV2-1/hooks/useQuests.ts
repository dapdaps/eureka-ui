import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { cloneDeep } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';

const defaultQuests: any = { social: [], bridge: [], swap: [], lending: [], staking: [] };

export default function useQuests() {
  const [quests, setQuests] = useState(null);
  const [questsList, setQuestsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const queryQuests = useCallback(async () => {
    try {
      setLoading(true);
      const result = await get('/api/compass/v2/quest_list', { id: 6 });
      setLoading(false);
      if (result.code !== 0 || !result.data?.length) {
        setQuests(defaultQuests);
        return;
      }
      const _result = cloneDeep(defaultQuests);

      setQuestsList(result.data);

      result.data.forEach((item: any) => {
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
        if (item.category_id === 5) {
          _result.staking.push(item);
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
    { wait: quests ? 800 : 3000 },
  );

  useEffect(() => {
    run();
  }, [account]);

  return { loading, quests: quests || defaultQuests, setQuests, questsList };
}
