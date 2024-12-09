import { useEffect, useState } from 'react';

import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import { get } from '@/utils/http';

import { useDetailStore } from './useDetailStore';

export const useBasic = ({ category }: any) => {
  const [data, setData] = useState<any>({
    tradingVolume: '-',
    tradingTransactions: '-',
    totalPrize: '$5000+',
    totalCompetitors: '-'
  });
  const [loading, setLoading] = useState(false);

  const setDetail = useDetailStore((store) => store.set);

  const getData = async () => {
    if (!category) {
      return;
    }
    setLoading(true);
    try {
      const res = await get('/api/campaign', { category });
      if (res.code !== 0) return;
      setData((prev: any) => ({
        ...prev,
        tradingVolume: formateValueWithThousandSeparatorAndFont(res.data.trading_volume, 2, true, {
          prefix: '$',
          isShort: true
        }),
        tradingTransactions: formateValueWithThousandSeparatorAndFont(res.data.total_transactions, 0, true),
        totalCompetitors: formateValueWithThousandSeparatorAndFont(res.data.total_users, 0, true)
      }));
      setDetail({
        detail: res.data
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    loading
  };
};
