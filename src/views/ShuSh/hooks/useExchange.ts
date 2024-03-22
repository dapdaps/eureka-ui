import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useShushOrdersStore } from '@/stores/shush';

export default function useExchange() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setSemi = useShushOrdersStore((store: any) => store.setSemi);

  const queryTrade = useCallback(
    async ({ from, to, amount, anonymous, addressTo, direction }: any) => {
      if (loading) return;
      try {
        setLoading(true);
        const response = await fetch(`/shush/api/exchange`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `amount=${amount}&from=${from}&to=${to}&anonymous=${anonymous}&fixed=${true}&direction=${direction}&addressTo=${addressTo}&receiverTag=${''}`,
        });
        const result = await response.json();
        if (result.data.id) {
          router.push(`/shush?id=${result.data.id}`);
          setSemi(result.data.id, anonymous);
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    },
    [loading],
  );

  return { loading, queryTrade };
}
