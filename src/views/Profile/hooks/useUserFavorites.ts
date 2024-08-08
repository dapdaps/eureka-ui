import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';
import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';
import { FavoriteType } from '../types';


export default function useUserFavorites() {
  const { account } = useAccount()
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });
  const [userFavorites, setUserFavorites] = useState<FavoriteType[]>([]);
  const [loading, setLoading] = useState(false);

  const queryUserFavorites = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`/api/user/favorites`);
      const data = (result.data || [])
      setUserFavorites(data);
      setLoading(false);
    } catch (err) {
      console.log(err, 'err');
    } finally {
      setLoading(false);
    }
  };


  const { run } = useDebounceFn(
    () => {
      account && check(queryUserFavorites);
    },
    { wait: userFavorites ? 800 : 3000 },
  );

  useEffect(() => {
    run();
  }, [account]);

  return { loading, userFavorites, queryUserFavorites };
}
