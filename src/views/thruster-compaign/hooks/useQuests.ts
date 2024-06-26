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
  social: [],
  password: [],
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
        } else if (item.source === 'Degen') {
          _result.degenTasks.push(item);
        } else if (item.category.startsWith('twitter')) {
          _result.social.push(item);
        } else if (item.category === 'password') {
          _result.password.push(item);
        } else {
          _result.frensTasks.push(item);
        }
        // if (
        //   item.category_id === 0 &&
        //   item.category !== 'twitter_retweet' &&
        //   ![
        //     'Particle',
        //     'Thruster',
        //     'Ring',
        //     'BladeSwap',
        //     'Juice',
        //     'Ambient',
        //     'Super Sushi Samurai',
        //     'Cap&Co',
        //     'Early',
        //     'Crypto Valleys',
        //     'Baja',
        //     'Fenix',
        //     'Andy',
        //     'strategy_particle_duo_ring_juice',
        //     'strategy_thruster_hyperlock',
        //     'strategy_juice',
        //     'strategy_renzo_thruster_hyperlock_particle',
        //     'strategy_thruster_orbit_juice',
        //     'strategy_thruster_thruster_hyperlock_particle',
        //   ].includes(item.source)
        // ) {
        //   _result.social.push(item);
        // }
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
