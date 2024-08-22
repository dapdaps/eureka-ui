import { useDebounceFn } from 'ahooks';
import { useCallback,useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';

const useSummary = (chainId: number) => {
  const [info, setInfo] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const queryInfo = useCallback(
    async (_page?: number) => {
      try {
        setLoading(true);
        const response = await get(`/api/action/summary/my?chain_id=${chainId}&account_id=${account}`);
        setInfo(response?.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    },
    [chainId, account],
  );

  const { run } = useDebounceFn(
    () => {
      if (!chainId) return;
      if (!account) {
        setInfo(null);
        setLoading(false);
      } else {
        check(queryInfo);
      }
    },
    { wait: info ? 600 : 3000 },
  );

  useEffect(() => {
    run();
  }, [chainId, account]);

  return { loading, info };
};

export default useSummary;
