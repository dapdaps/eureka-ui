import { useDebounceFn } from 'ahooks';
import { useCallback, useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { balanceShortFormated } from '@/utils/balance';
import { get } from '@/utils/http';
import { CategoryList } from '@/views/Portfolio/config';

export default function useTvls() {
  const [loading, setLoading] = useState(false);
  const [tvls, setTvls] = useState<any>(Object.values(CategoryList));

  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const tvlsFormatter = (data = []) => {
    const res = [];
    for (const cg of Object.values(CategoryList)) {
      const curr: any = data.find((it: any) => it.protocol === cg.protocol);
      res.push({
        ...cg,
        tradingVolume: curr?.trading_volume || cg.usd,
        usd: balanceShortFormated(curr?.trading_volume || cg.usd, 2),
        executions: curr?.txns || cg.executions
      });
    }
    setTvls(res);
  };

  const fetchTvls = useCallback(async () => {
    try {
      setLoading(true);
      const result = await get(`/db3`, {
        url: 'api/account/protocol/volume',
        params: JSON.stringify({ address: account })
      });
      const data = result?.data?.list ?? [];
      tvlsFormatter(data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching tvls data:', error);
      tvlsFormatter([]);
      setLoading(false);
    }
  }, [account]);

  const { run } = useDebounceFn(
    () => {
      if (!account) {
        setLoading(false);
        setTvls([]);
      } else {
        check(fetchTvls);
      }
    },
    { wait: 3000 }
  );

  useEffect(() => {
    run();
  }, [account]);

  return {
    tvls,
    loading
  };
}
