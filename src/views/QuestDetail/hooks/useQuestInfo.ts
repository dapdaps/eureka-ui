import { useDebounceFn } from 'ahooks';
import { useCallback, useEffect, useState } from 'react';

import { QUEST_PATH } from '@/config/quest';
import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';

export default function useQuestInfo(id?: string, source?: string) {
  const [info, setInfo] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const queryQuestInfo = useCallback(async () => {
    try {
      setLoading(true);
      const params = id ? `id=${id}` : `source=${source}`;
      const result = await get(`${QUEST_PATH}/api/quest?${params}`);
      const data = result.data || [];
      setInfo(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [id, source, loading]);

  const { run } = useDebounceFn(
    () => {
      if (!id && !source) return;
      if (!account) {
        queryQuestInfo();
      } else {
        check(queryQuestInfo);
      }
    },
    { wait: info ? 800 : 3000 },
  );

  useEffect(() => {
    run();
  }, [account, id, source]);

  return { loading, info };
}
