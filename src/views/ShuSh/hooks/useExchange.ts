import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import useToast from '@/hooks/useToast';
import { useShushOrdersStore } from '@/stores/shush';

export default function useExchange() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const addOrder = useShushOrdersStore((store: any) => store.addOrder);
  const toast = useToast();

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
        if (result.status === 'success') {
          router.push(`/shush?id=${result.data.id}`);
          addOrder({ id: result.data.id, semi: anonymous });
        } else {
          toast.fail({ title: result.message });
        }

        setLoading(false);
      } catch (err: any) {
        setLoading(false);
      }
    },
    [loading],
  );

  return { loading, queryTrade };
}
