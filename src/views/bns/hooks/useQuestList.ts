import { useDebounceFn } from 'ahooks';
import { useCallback, useEffect, useState } from 'react';

import { QUEST_PATH } from '@/config/quest';
import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';

export default function useQuestList(campaign_id?: string) {
  const [questList, setQuestList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const queryQuests = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`${QUEST_PATH}/api/quest/list?campaign_id=${campaign_id}`);
      const data = result.data;
      setQuestList(data ? data.sort((prev: any, next: any) => prev.quest_category_id - next.quest_category_id) : []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [loading, campaign_id]);

  const { run } = useDebounceFn(
    () => {
      if (!account) {
        queryQuests();
        return;
      }
      check(queryQuests);
    },
    { wait: questList.length ? 800 : 3000 },
  );

  useEffect(() => {
    if (!campaign_id) return;
    run();
  }, [campaign_id, account]);

  return { loading, questList };
}
