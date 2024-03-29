import { useCallback, useEffect, useState } from 'react';

export default function usePrices() {
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState<any>();

  const queryPrices = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      const response = await fetch(`/shush/api/prices`);
      const result = await response.json();
      setPrices(result.data.prices || {});
      setLoading(false);
      if (result.status === 'success') {
        setTimeout(
          () => {
            queryPrices();
          },
          5 * 60 * 1000,
        );
      }
    } catch (err) {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    queryPrices();
  }, []);

  return { loading, prices };
}
