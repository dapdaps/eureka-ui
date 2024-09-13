import { useEffect, useState } from 'react';

import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import { get } from '@/utils/http';

export const useBasic = ({ category, totalBonus }: any) => {
  const [data, setData] = useState({
    totalBonus: formateValueWithThousandSeparatorAndFont(totalBonus, 0, true, { prefix: '$' })
  });
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await get('/api/campaign', { category });
      if (res.code !== 0) return;
      setData({
        ...res.data,
        tradingVolume: formateValueWithThousandSeparatorAndFont(res.data.trading_volume, 2, true, {
          prefix: '$',
          isShort: true
        }),
        totalTickets: formateValueWithThousandSeparatorAndFont(res.data.total_spins, 0, true),
        totalBonus: formateValueWithThousandSeparatorAndFont(totalBonus, 0, true, { prefix: '$' })
      });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    loading
  };
};
