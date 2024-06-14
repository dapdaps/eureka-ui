import { useDebounceFn } from 'ahooks';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get, post } from '@/utils/http';

export default function useDetail(id: any) {
  const [detail, setDetail] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { account } = useAccount();
  const router = useRouter();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const init = useCallback(async () => {
    if (router.query.from === 'parter' && id) {
      await post('/api/compass/invite', {
        id,
        source: 'parter',
      });
    }
    queryDetail();
  }, [id]);

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
      check(init);
    },
    { wait: detail ? 600 : 3000 },
  );

  useEffect(() => {
    run();
  }, [account]);

  return { detail: detail || {}, loading, queryDetail };
}
