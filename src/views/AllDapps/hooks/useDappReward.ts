import type { Odyssey } from '@/components/DropdownSearchResultPanel/hooks/useDefaultSearch';
import { QUEST_PATH } from '@/config/quest';
import { CampaignData } from '@/data/campaign';
import { get } from '@/utils/http';

interface Reward {
  name: string;
  value: string;
  logo_key: string;
}

export interface FormattedRewardList {
  logo_key: string;
  value: string;
  name: string;
  odysseys: any[];
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
          return;
        }
        result.push({
          logo_key: reward.logo_key,
          value: reward.value,
          name: reward.name,
          odysseys: [{ ...item, reward_value: reward.value }]
        });
      });
      return result;
    }, []);

    // add static campaign data
    Object.values(CampaignData).forEach((campaign) => {
      if (!campaign.odyssey) return;
      campaign.odyssey.forEach((ody) => {
        if (!ody.reward) return;
        if (ody.status !== 'ongoing') return;
        const odyRewards = JSON.parse(ody.reward);
        odyRewards
          .filter((r: any) => !!r.logo_key)
          .forEach((r: any) => {
            const rIdx = rewardList.findIndex((it) => it.name === r.logo_key);
            if (rIdx > -1) {
              if (rewardList[rIdx].odysseys.some((it) => it.id === ody.id)) {
                return;
              }
              rewardList[rIdx].odysseys.unshift(ody as any);
              return;
            }
            rewardList.unshift({
              logo_key: r.logo_key,
              name: r.name,
              value: r.value,
              odysseys: [ody as any]
            });
          });
      });
    });
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
