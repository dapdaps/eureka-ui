import { useDebounceFn } from 'ahooks';
import { cloneDeep } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';

import { GOLD_QUESTS } from '../const';

const defaultQuests: any = {
  social: [],
  bridge: [],
  swap: [],
  lending: [],
  liquidity: [],
  golds: [],
  staking: [],
  yield: [],
};

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
          if (item.name === 'Particle') {
            item.gold_order = 1;
          } else if (item.name === 'Ring Protocol') {
            item.gold_order = 3;
          } else if (item.name === 'BladeSwap') {
            item.gold_order = 5;
          } else if (item.name === 'Ambient') {
            item.gold_order = 7;
          } else if (item.name === 'MetaStreet') {
            item.gold_order = 9;
          } else {
            item.gold_order = 10;
          }
          _result.golds.push(item);
        }
        if (item.category_id === 0 && item.category !== 'twitter_retweet') {
          _result.social.push(item);
        }
        if (item.category_id === 1) {
          _result.bridge.push(item);
        }
        if (item.category_id === 2) {
          if (item.name === 'Thruster Finance') {
            item.order = 1;
          } else if (item.name === 'Ring Protocol') {
            item.order = 2;
          } else if (item.name === 'Ambient') {
            item.order = 3;
          } else {
            item.order = 6;
          }

          _result.swap.push(item);
        }
        if (item.category_id === 3) {
          _result.lending.push(item);
        }
        if (item.category_id === 4) {
          _result.liquidity.push(item);
        }
        if (item.category_id === 5) {
          _result.staking.push(item);
        }
        if (item.category_id === 6) {
          if (item.name !== 'Particle' && item.name !== 'MetaStreet') {
            _result.yield.push(item);
          }
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
