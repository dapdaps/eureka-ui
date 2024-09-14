import type { Odyssey } from '@/components/DropdownSearchResultPanel/hooks/useDefaultSearch';
import { QUEST_PATH } from '@/config/quest';
import { get } from '@/utils/http';
import { StatusType } from '@/views/Odyssey/components/Tag';

interface Reward {
  name: string;
  value: string;
  logo_key: string;
}

export interface FormattedRewardList {
  logo_key: string;
  value: string;
  name: string;
  odysseys: Odyssey[];
}

export default function useDappReward() {
  const formatRewardList = (data: Odyssey[]): FormattedRewardList[] => {
    if (!data || !data.length) return [];
    const rewardList = data.reduce((result: FormattedRewardList[], item: Odyssey) => {
      const rewards: Reward[] = item.reward ? JSON.parse(item.reward) : [];

      rewards.forEach((reward) => {
        const existingReward = result.find((r) => r.logo_key === reward.logo_key);

        if (existingReward) {
          existingReward.odysseys.push({ ...item, reward_value: reward.value });
        } else {
          if (reward.name === 'USDC') {
            result.push({
              logo_key: reward.logo_key,
              value: reward.value,
              name: reward.name,
              odysseys: [
                {
                  ...item,
                  banner: '/images/odyssey/rango-banner-round.png',
                  link: '/bridge-x/rango',
                  status: StatusType.ongoing,
                  name: 'Rango Exchange X DapDap：Win USDC by Birdging via Rango on DapDap!',
                  reward_value: '$1000'
                },
                { ...item, reward_value: reward.value }
              ]
            });
          } else {
            result.push({
              logo_key: reward.logo_key,
              value: reward.value,
              name: reward.name,
              odysseys: [{ ...item, reward_value: reward.value }]
            });
          }
        }
      });
      return result;
    }, []);

    // add Rubic activity
    const rubicData: any = {
      banner: '/images/campaign/rubic-holdstation/link-banner.png',
      link: '/campaign/home?category=rubic-holdstation',
      status: StatusType.ongoing,
      name: 'Rubic x Holdstation Campaign：Play Lottery and Win Medals',
      reward_value: '$7500'
    };
    const usdtIdx = rewardList.findIndex((it) => it.logo_key === 'USDT');
    if (usdtIdx < 0) {
      rewardList.unshift({
        logo_key: 'USDT',
        name: 'USDT',
        value: '',
        odysseys: [rubicData]
      });
    }
    return rewardList;
  };

  const fetchRewardData = async () => {
    try {
      const result = await get(`${QUEST_PATH}/api/compass/reward-list`);
      return result?.data ?? [];
    } catch {
      return [];
    }
  };

  return {
    fetchRewardData,
    formatRewardList
  };
}
