import { useDebounceFn } from 'ahooks';
import { useCallback, useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';

export default function useDetail(id: any) {
  const [detail, setDetail] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const queryDetail = useCallback(async () => {
    try {
      setLoading(true);
      const result = await get('/api/compass/v5/detail', { id });

      if (result.code === 0 && result.data) {
        setDetail({ ...result.data });
      } else {
        setDetail({});
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  const { run } = useDebounceFn(
    () => {
      if (!account) {
        queryDetail();
        return;
      }
      check(queryDetail);
    },
    { wait: detail ? 600 : 3000 },
  );

  useEffect(() => {
    run();
  }, [account]);

  return { detail: detail || {}, loading, queryDetail };
}
