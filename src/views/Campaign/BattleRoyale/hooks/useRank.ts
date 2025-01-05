import { useCallback, useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';

const generateMockData = () => {
  const mockData = [];
  for (let i = 0; i < 100; i++) {
    const tradingVolume = Math.random() * 100 + (10 - i) * 2000 - Math.random() * 100 * i;
    mockData.push({
      rank: i + 1,
      trading_volume: tradingVolume,
      actual_trading_volume: (Number(tradingVolume) * 0.9).toFixed(6),
      account: {
        id: 464 + i,
        address: `0x8c7f311f5174b636bc1849e523810b1e9a4b7a${i.toString(16).padStart(2, '0')}`,
        avatar: `https://assets.dapdap.net/avatar/0x8c7f311f5174b636bc1849e523810b1e9a4b7a${i.toString(16).padStart(2, '0')}1727337347899`
      }
    });
  }
  return mockData;
};

export default function useRank() {
  const [ranks, setRanks] = useState<any>();
  const [userRank, setUserRank] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { account, chainId } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // const result = await get('/api/campaign/leaderboard', { category: 'battle-royale' });
      const result = {
        code: 0,
        msg: 'success',
        data: {
          data: generateMockData(),
          user: account
            ? {
                rank: Math.floor(Math.random() * 100) + 1,
                trading_volume: (Math.random() * 10).toFixed(6),
                actual_trading_volume: (Math.random() * 9).toFixed(6),
                account: {
                  id: 999,
                  address: account,
                  avatar: `https://assets.dapdap.net/avatar/${account}1727337347899`
                }
              }
            : null
        }
      };

      if (result.code === 0 && result.data) {
        setRanks(result.data.data || []);
        setUserRank(result.data.user);
      } else {
        setRanks([]);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setRanks([]);
    }
  }, [account]);

  useEffect(() => {
    check(fetchData);
  }, [account, chainId]);

  return { ranks, userRank, loading };
}
