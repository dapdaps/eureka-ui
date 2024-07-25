import { useCallback, useEffect, useState } from 'react';

import { get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';

export default function useNetworks() {
  const [loading, setLoading] = useState(false);
  const [networkList, setNetworkList] = useState<any[]>([]);

  const fetchNetworkData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const resultNetwork = await get(`${QUEST_PATH}/api/network/list`);
      setNetworkList(resultNetwork.data || []);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching resultNetwork data:', error);
    }
  };

  useEffect(() => {
    fetchNetworkData();
  }, []);

  return { loading, networkList };
}
