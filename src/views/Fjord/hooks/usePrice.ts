import { useCallback, useState } from 'react';

import { get } from '@/utils/http';
export default function usePrice() {
  const [priceData, setPriceData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const queryPrice = useCallback(async (query: any) => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get('/api/launchpad/price', query);
      const data = (result.data || []).map((price: any) => {
        return {
          ...price,
          time: +price.timestamp
        }
      })
      setPriceData(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [loading]);
  return { loading, priceData, queryPrice };
}
