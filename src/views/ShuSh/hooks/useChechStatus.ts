import { useCallback, useEffect,useState } from 'react';

import { useShushOrdersStore } from '@/stores/shush';

let timer: ReturnType<typeof setTimeout> | null = null;

export default function useChechStatus(auto: boolean) {
  const [statusResult, setStatusResult] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const getOrder = useShushOrdersStore((store: any) => store.getOrder);

  const queryStatus = useCallback(
    async (id: string) => {
      if (loading) return;
      try {
        setLoading(true);
        setStatusResult(null);
        const response = await fetch(`/shush/api/status?id=${id}`);
        const result = await response.json();
        setLoading(false);
        if (result.status === 'success') {
          const _data = result.data || {};
          const record = { ..._data, semi: getOrder(result.data.houdiniId)?.semi };
          setStatusResult(record);
          if (auto) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(
              () => {
                queryStatus(id);
              },
              1 * 60 * 1000,
            );
          }
          return record;
        }
      } catch (err) {
        setLoading(false);
      }
    },
    [loading],
  );

  useEffect(() => {
    if (timer) clearTimeout(timer);
  }, []);

  return { loading, statusResult, queryStatus };
}
