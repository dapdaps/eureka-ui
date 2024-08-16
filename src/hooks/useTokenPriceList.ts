import { useCallback, useEffect, useState } from 'react';
import { useTokenPriceListStore } from '@/stores/tokenPrice';
import { get } from '@/utils/http';

export default function useTokenPriceList() {
  const [tokenPriceList, setTokenPriceList] = useState<any>({});
  const tokenPriceStore = useTokenPriceListStore(store => store.set);
  const fetchList = useCallback(async () => {
    tokenPriceStore({
      loading: true,
    })
    try {
      const result = await get(`/api/token/price/latest`);
      const data = result.data || {};
      setTokenPriceList(data);
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

  return { tokenPriceList };
}
