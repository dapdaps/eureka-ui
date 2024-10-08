import { useCallback } from 'react';

import chainCofig from '@/config/chains';
import { QUEST_PATH } from '@/config/quest';
import { useChainsStore } from '@/stores/chains';
import { get } from '@/utils/http';

export default function useInitialDataWithoutAuth() {
  const chainsStore: any = useChainsStore();

  const queryChains = useCallback(async () => {
    if (chainsStore.chains?.length) return;
    try {
      const res = await get(`${QUEST_PATH}/api/network/list`);
      const chainList = [];
      // filter out unsupported chains
      for (const chain of res.data) {
        if (!chainCofig[chain.chain_id]) continue;
        chainList.push(chain);
      }
      chainsStore.set({ chains: chainList });
    } catch (err) {}
  }, []);

  const getInitialDataWithoutAuth = () => {
    queryChains();
  };

  return { getInitialDataWithoutAuth };
}
