import { useCallback, useEffect, useState } from 'react';
import { get } from '@/utils/http';
import { useDebounceFn } from 'ahooks';
import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';

export default function useDetail() {
  const [detail, setDetail] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const queryDetail = async (id: number) => {
    try {
      setLoading(true);
      const url: any = {
        1: "/api/compass",
        2: "/api/compass/v2/detail",
        3: "/api/compass/v3/detail"
      }[id]
      const result = await get(url, { id });
      if (result.code === 0 && result.data) {
        setDetail({
          total_users: result.data.total_users,
          total_players: result.data.total_players,
          claimed_reward: result.data.claimed_reward,
          available_spins: result.data.user?.available_spins,
          unclaimed_reward: result.data.user?.unclaimed_reward,
          total_spins: result.data.user?.total_spins,
        });
      } else {
        setDetail({});
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  return { detail: detail || {}, loading, queryDetail };
}
