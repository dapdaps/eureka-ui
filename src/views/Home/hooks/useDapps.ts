import { useState, useEffect, useCallback } from 'react';
import { get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';
import { CategoryList } from '@/views/AllDapps/config';
import chainCofig from '@/config/chains';

const useDapps = () => {
  const [featuredDapps, setFeaturedDapps] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<any>();

  const queryDapps = useCallback(async (_category?: any) => {
    setLoading(true);
    const params: Record<string, any> = {
      tbd_token: false,
      is_favorite: false,
      page_size: 10,
      page: 1,
    };
    if (category) {
      params.category_ids = _category || category;
    }
    try {
      const response = await get(`${QUEST_PATH}/api/dapp/filter_list`, params);
      const data = response.data?.data || [];
      data.forEach((dapp: any) => {
        //#region format categories
        dapp.categories = [];
        dapp.category_ids && dapp.category_ids.forEach((it: any) => {
          const curr = CategoryList.find((_it) => _it.key === it);
          curr && dapp.categories.push(curr);
        });
        //#endregion
        //#region format networks
        dapp.networks = [];
        dapp.dapp_network && dapp.dapp_network.forEach((it: any) => {
          const curr = chainCofig[it.chain_id];
          curr && dapp.networks.push({ ...curr });
        });
        //#endregion
      });
      setFeaturedDapps(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [category, loading]);

  const onSelectCategory = (_category: any) => {
    setCategory(_category);
    queryDapps(_category);
  };

  useEffect(() => {
    queryDapps()
  }, []);

  return { loading, featuredDapps, category, onSelectCategory };
};

export default useDapps;
