import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';
import type { Quest } from '@/views/Campaign/models';

export const useQuests = ({ category }: any) => {
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const [data, setData] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async (isRefresh?: boolean) => {
    if (!isRefresh) {
      setLoading(true);
    }
    try {
      const res = await get('/api/campaign/quest/list', { category });
      if (res.code !== 0) throw new Error(res.msg);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
    if (!isRefresh) {
      setLoading(false);
    }
  };

  const updateData = (id: number, values: Partial<Quest>) => {
    const _data = data.slice();
    const curr = _data.find((it) => it.id === id);
    if (!curr) return;
    curr.total_spins = values?.total_spins as number;
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
    loading,
    updateData,
    getData
  };
};
