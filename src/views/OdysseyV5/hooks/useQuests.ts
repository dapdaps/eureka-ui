import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
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
  mode: [],
};

// Static DApp Data
const defaultModeQuest = [
  {
    id: 'static_quest_1',
    name: 'S1 | Ironclad',
    description: 'Join Ironclad Launchpad via DapDap on S1 for Whitelist Rewards!',
    extra_data: 'mode',
    spins: 1,
    times: 1,
    total_spins: 0,
    operators: [
      {
        'dapp_id': 'static_quest_11',
        'dapp_name': 'S1',
        'dapp_logo': '/images/odyssey/v5/mastery/temp/s1-rect.svg',
        'default_chain_id': 0,
        'route': 'dapp/swap-mode',
        'theme': '{"swap_color":""}',
        'dapp_network': [],
      },
      {
        'dapp_id': 179,
        'dapp_name': 'Ironclad',
        'dapp_logo': '/images/odyssey/v5/mastery/temp/ironclad-rect.svg',
        'default_chain_id': 34443,
        'route': 'dapp/ironclad-finance',
        'theme': '{"swap_color":""}',
        'dapp_network': [],
      },
    ],
    earned: [
      {
        key: 1,
        icon: '/images/odyssey/v5/mastery/temp/white-list.svg',
        text: 'WHITELIST',
        lightText: '50-100'
      },
    ],
    requirements: [
      'Register on S1: Sign up using <a href="https://www.s1.xyz/projects/ironclad" target="_blank" class="primary-text">DapDap\'s referral link.<a>',
      'Participate in Ironclad Launchpad: Complete KYC.',
      'Enter Whitelist Draw: When registrations exceed 500, everyone who participated has a chance to win whitelist rewards',
    ],
    submit: 'Sign Up',
    website: 'https://www.s1.xyz/projects/ironclad',
  },
];

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

      result.data.forEach((item: any) => {
        item.exploredAmount = new Big(item.total_spins).div(item.spins).toNumber() || 0;

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
        // ⚠️ be careful, mode will not participate in calculating the number of total times
        if (item.extra_data === 'mode') {
          _result.mode.push(item);
        }
      });
      _result.mode.push(defaultModeQuest[0]);
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

  return { loading, quests: quests || defaultQuests, setQuests };
}
