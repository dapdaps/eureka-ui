import { useState, useCallback, useEffect } from 'react';
import { useShushOrdersStore } from '@/stores/shush';

let timer: ReturnType<typeof setTimeout> | null = null;

export default function useChechStatus(auto: boolean) {
  const [statusResult, setStatusResult] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const shushOrdersStore: any = useShushOrdersStore();

  const queryStatus = useCallback(
    async (id: string) => {
      if (loading) return;
      try {
        setLoading(true);
        const response = await fetch(`/shush/api/status?id=${id}`);
        const result = await response.json();
        if (result.status === 'success') {
          const _data = result.data || {};
          const record = { ..._data, semi: shushOrdersStore.semis[result.data.houdiniId] };
          setStatusResult(record);
          if (!shushOrdersStore.orders[record.houdiniId]) {
            shushOrdersStore.addOrder(record);
          }
          shushOrdersStore.addStatus(record.houdiniId, record.status);
          if (auto) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(
              () => {
                queryStatus(id);
              },
              1 * 60 * 1000,
            );
          }
        }
        setLoading(false);
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
