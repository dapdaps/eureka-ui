import { useDebounceFn } from 'ahooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get, post } from '@/utils/http';

export default function useDetail(id: any, cb: any) {
  const [detail, setDetail] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { account } = useAccount();
  const [parter, setParter] = useState('');
  const [isGotSpins, setIsGotSpins] = useState(false);
  const [showSpinsResultModal, setShowSpinsResultModal] = useState(false);
  const router = useRouter();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const init = useCallback(async () => {
    if (router.query.from && id) {
      const result = await post('/api/compass/invite', {
        id,
        source: router.query.from,
      });
      setIsGotSpins(result.data?.status === 'success');
      setParter(result.data?.source);
      setShowSpinsResultModal(true);
    }
    queryDetail();
    cb?.();
  }, [id, cb]);

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

  return {
    detail: detail || {},
    loading,
    parter,
    isGotSpins,
    showSpinsResultModal,
    setShowSpinsResultModal,
    queryDetail,
  };
}
