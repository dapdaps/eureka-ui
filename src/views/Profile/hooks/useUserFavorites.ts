import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';
import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';
import { DappType, FavoriteType } from '../types';
import { CategoryList } from '@/views/AllDapps/config';
import chainCofig from '@/config/chains';


export default function useUserFavorites() {
  const { account } = useAccount()
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });
  const [userFavorites, setUserFavorites] = useState<FavoriteType | null>(null);
  const [loading, setLoading] = useState(false);

  const queryUserFavorites = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`/api/user/favorites`);
      const data = (result.data || [])
      data?.dapps?.forEach((dapp: DappType) => {
        dapp.categories = []
        dapp?.dapp_category?.forEach(category => {
          const _c = CategoryList.find(_c => _c.key === category?.category_id)
          _c && dapp.categories?.push(_c)
        })
        dapp.networks = []
        dapp?.dapp_network?.forEach(network => {
          const _n = chainCofig[network?.chain_id]
          _n && dapp.networks?.push(_n)
        })
      });
      console.log('===data', data)
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
