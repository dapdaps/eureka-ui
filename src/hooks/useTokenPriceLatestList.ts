import { useCallback, useEffect, useState } from 'react';

import { useTokenPriceLatestStore } from '@/stores/tokenPrice';
import { get } from '@/utils/http';

const DELAY = 1000 * 60 * 5;

export default function useTokenPriceLatestList() {
  const [pending, setPending] = useState(false);
  const tokenPriceStore = useTokenPriceLatestStore(store => store.set);
  const initializePriceLatest = useCallback(async () => {
    if (pending) {
      return;
    }
    setPending(true);
    try {
      const result = await get(`/api/token/price/latest`);
      const data = result.data || {};
      tokenPriceStore({
        list: data,
      });
      const timer = setTimeout(() => {
        clearTimeout(timer);
        initializePriceLatest();
      }, DELAY);
      setPending(false);
    } catch (err) {
      console.log(err, 'err');
      setPending(false);
    }
  }, [pending]);

  return { initializePriceLatest };
}
