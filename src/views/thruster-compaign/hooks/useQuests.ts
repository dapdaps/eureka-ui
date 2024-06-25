import { useDebounceFn } from 'ahooks';
import { cloneDeep } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';

const defaultQuests: any = {
  degenTasks: [],
  chadTasks: [],
  frensTasks: [],
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

      // const _unlockedAmount = result.data.filter((item: any) => item.total_spins > 0).length;

      // _result.unlockedAmount = _unlockedAmount;

      result.data.forEach((item: any) => {
        // if (DappsConfig[item.source]) {
        //   _result.spins.push({ ...DappsConfig[item.source], id: item.id, step: item.step });
        // }
        if (item.source === 'Chad') {
          _result.chadTasks.push(item);
        }
        if (item.source === 'Degen') {
          _result.degenTasks.push(item);
        }

        _result.frensTasks.push(item);
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

  return { loading, quests: quests || defaultQuests, queryQuests };
}
