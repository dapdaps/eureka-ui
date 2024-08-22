import { useCallback, useState } from 'react';

import useToast from '@/hooks/useToast';

let timer: ReturnType<typeof setTimeout> | null = null;

export default function useQuote(cb: any) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const queryQuote = useCallback(
    async ({ from, to, amount, direction, anonymous }: any) => {
      if (loading) return;
      try {
        setLoading(true);
        const response = await fetch(
          `/shush/api/quote?from=${from}&to=${to}&amount=${amount}&anonymous=${anonymous}&direction=${direction}&fixed=true`,
        );
        const result = await response.json();
        if (result.status === 'success') {
          cb({ ...result.data, direction });
          if (timer) clearTimeout(timer);
          timer = setTimeout(
            () => {
              queryQuote({ from, to, amount, direction, anonymous });
            },
            5 * 60 * 1000,
          );
        } else {
          toast.fail({ title: result.message });
        }
        setLoading(false);
      } catch (err: any) {
        toast.fail({ title: err.message || 'Get price failed' });
        setLoading(false);
      }
    },
    [loading],
  );

  return { loading, queryQuote };
}
