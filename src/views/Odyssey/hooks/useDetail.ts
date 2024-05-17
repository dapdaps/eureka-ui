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
      const result = await get("/api/compass/reward", { id });
      if (result.code === 0 && result.data) {
        setDetail({
          unclaimed_reward: result.data?.unclaimed_reward,
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
