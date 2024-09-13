import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';
import type { MedalType } from '@/views/Profile/types';

export const useMedals = ({ category, totalBonus }: any) => {
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const [data, setData] = useState<MedalType[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await get('/api/campaign/medals', { category });
      if (res.code !== 0) throw new Error(res.msg);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const { run: getDataDelay } = useDebounceFn(
    () => {
      if (!account) {
        getData();
        return;
      }
      check(getData);
    },
    { wait: data.length ? 600 : 3000 }
  );

  useEffect(() => {
    getDataDelay();
  }, [account]);

  return {
    data,
    loading
  };
};
