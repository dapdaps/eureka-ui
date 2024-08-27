import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';

import chainCofig from '@/config/chains';
import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';
import { CategoryList } from '@/views/AllDapps/config';

import type { DappType, FavoriteType, Tab } from '../types';


export default function useUserFavorites(tab: Tab) {
  const { account } = useAccount()
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });
  const [userFavorites, setUserFavorites] = useState<FavoriteType | null>(null);
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false);

  const queryUserFavorites = async () => {
    if (loading) return;
    setLoading(true);
    setLoaded(false)
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
      setLoaded(true)
    } catch (err) {
      console.log(err, 'err');
    } finally {
      setLoading(false);
      setLoaded(true)
    }
  };


  const { run } = useDebounceFn(
    () => {
      account && check(queryUserFavorites);
    },
    { wait: userFavorites ? 800 : 3000 },
  );

  // useEffect(() => {
  //   (tab === "FavoriteApps" || !loaded) && run();
  // }, [account, tab]);

  useEffect(() => {
    run()
  }, [account])
  useEffect(() => {
    (tab === 'FavoriteApps') && run();
  }, [tab]);

  return { loading, loaded, userFavorites, queryUserFavorites };
}
