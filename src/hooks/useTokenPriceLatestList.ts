import { useCallback, useEffect, useState } from 'react';
import { useTokenPriceLatestStore } from '@/stores/tokenPrice';
import { get } from '@/utils/http';

export default function useTokenPriceLatestList() {
  const [tokenPriceLatest, setTokenPriceLatest] = useState<any>({});
  const tokenPriceStore = useTokenPriceLatestStore(store => store.set);
  const fetchList = useCallback(async () => {
    tokenPriceStore({
      loading: true,
    })
    try {
      const result = await get(`/api/token/price/latest`);
      const data = result.data || {};
      setTokenPriceLatest(data);
      tokenPriceStore({
        list: data,
      })
      tokenPriceStore({
        loading: false,
      })
    } catch (err) {
      console.log(err, 'err');
    } finally {
      tokenPriceStore({
        loading: false,
      })
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, []);

  return { tokenPriceLatest };
}
