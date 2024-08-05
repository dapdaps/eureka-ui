import {get} from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';

export default function useDappReward() {

  const fetchRewardData = async () => {

    try {
      const result = await get(`${QUEST_PATH}/api/compass/reward-list`);
      return result?.data ?? [];
    } catch {
      return [];
    }
  }

  return {
    fetchRewardData
  }
}