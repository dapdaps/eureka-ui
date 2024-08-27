import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';

export const IntervalList = [
  {
    key: 1,
    value: 1,
    label: 'Day',
  },
  {
    key: 2,
    value: 2,
    label: 'Month',
  },
];

export function useWorth() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Worth[]>([]);
  const [total, setTotal] = useState<Big.Big>(Big(0));
  const [today, setToday] = useState<string>('0.00');
  const [increase, setIncrease] = useState<Big.Big>(Big(0));
  const [type, setType] = useState<number>(IntervalList[0].value);

  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const getList = async () => {
    setLoading(true);
    try {
      const result = await get(`/db3`, { url: 'api/account/worth', params: JSON.stringify({ address: account }) });
      let _list: any = result?.data?.list ?? [];
      let _total = Big(0);
      let _diff = Big(0);
      _list.forEach((it: any) => {
        it.day_time = it.day_time * 1000;
        _total = Big(_total).plus(Big(it.worth));
      });
      _list = _list.sort((a: any, b: any) => b.day_time - a.day_time);
      if (_list.length > 1) {
        const last = Big(_list[0].worth);
        const prev = Big(_list[1].worth);
        if (Big(prev).gt(0)) {
          _diff = last.minus(prev).div(prev).times(100);
          setIncrease(_diff);
        }
      }
      setTotal(_total);
      const _today = _list[_list.length - 1] ? _list[_list.length - 1].worth : '0.00';
      setToday(Big(_today).toFixed(2));
      setList(_list);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleType = (value: number) => {
    if (value === type) return;
    setType(value);
  };

  const { run } = useDebounceFn(
    () => {
      if (!account) {
        return;
      }
      check(getList);
    },
    { wait: list.length ? 600 : 3000 },
  );

  useEffect(() => {
    run();
  }, [account]);

  return {
    loading,
    list,
    total,
    increase,
    type,
    handleType,
    today,
  };
}

interface Worth {
  worth: string;
  day_time: number;
}
