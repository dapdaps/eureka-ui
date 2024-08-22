import { useCallback, useEffect, useState } from 'react';

import { useShushTokensStore } from '@/stores/shush';

export default function useNetworksAndTokens() {
  const [loading, setLoading] = useState(false);
  const shushTokensStore: any = useShushTokensStore();

  const queryData = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(`/shush/order/1?_data=root`);
      const result = await response.json();
      const _tokens = result.tokens?.reduce((acc: any, token: any) => ({ ...acc, [token.id]: token }), {});
      shushTokensStore.set({ networks: result.networks, tokens: _tokens });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    if (!shushTokensStore.tokens) queryData();
  }, []);

  return { networks: shushTokensStore.networks || [], tokens: shushTokensStore.tokens || {}, loading };
}
