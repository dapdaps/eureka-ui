import { useState } from 'react';

import { get } from '@/utils/http';

export default function useDappRank() {
  const [ranks, setRanks] = useState<any>([]);
  const [showRewards, setShowRewards] = useState<any>(false);
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(false);

  const queryRank = async (id?: number) => {
    if (!id) return;
    setLoading(true);
    setRanks([]);
    setUser(null);

    try {
      const result = await get(`/api/dapp/trade/rank?id=${id}`);

      setRanks(result.data.data);
      setShowRewards(!!result.data.is_draw);
      // setUser(result.data.user);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return { loading, ranks, user, queryRank, showRewards };
}
