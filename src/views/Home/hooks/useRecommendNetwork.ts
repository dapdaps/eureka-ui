import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';
import { CategoryList, PageSize } from '@/views/AllDapps/config';
export default function useRecommendNetwork() {
  const { account } = useAccount()
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const [recommendNetwork, setRecommendNetwork] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const queryRecommendNetwork = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get('/api/network/recommend');
      const data = (result.data || null);

      data?.top_volume?.dapps.forEach((dapp: any) => {
        dapp.categories = dapp?.dapp_category?.map((category: any) => {
          return CategoryList.find(_c => _c.key === category.category_id)
        })
      })
      data?.hottest?.dapps.forEach((dapp: any) => {
        dapp.categories = dapp?.dapp_category?.map((category: any) => {
          return CategoryList.find(_c => _c.key === category.category_id)
        })
      })
      setRecommendNetwork(data);
      setLoading(false);
    } catch (err) {
      console.log(err, 'err');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    queryRecommendNetwork()
  }, []);

  return { loading, recommendNetwork, queryRecommendNetwork };
}
