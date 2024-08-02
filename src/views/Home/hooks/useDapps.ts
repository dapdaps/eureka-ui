import { useState, useEffect, useCallback } from 'react';
import { get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';
import { CategoryList } from '@/views/AllDapps/config';
import chainCofig from '@/config/chains';
import useDappReward from '@/views/AllDapps/hooks/useDappReward';

const useDapps = () => {
  const [featuredDapps, setFeaturedDapps] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<any>();

  const { fetchRewardData } = useDappReward();

  const queryDapps = useCallback(async (_category?: any) => {
    setLoading(true);
    const params: any = {};
    if (category) {
      params.category_ids = _category || category;
    }
    try {
      const response = await get(`${QUEST_PATH}/api/dapp/recommend`,  params);

      console.log(response);
      const rewardList = await fetchRewardData() ?? [];
      const data = response?.data ?? [];
      data.forEach((dapp: any) => {
        //#region format categories
        dapp.categories = [];
        dapp.dapp_category && dapp.dapp_category.forEach((it: any) => {
          const curr = CategoryList.find((_it) => _it.key === it.category_id);
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
      data.forEach((dapp: any) => {
        dapp.rewards = [];
        if (dapp?.networks && dapp.networks.length) {
          rewardList.forEach((item: any) => {
            const _reward = dapp.networks.find((network: any) => item.chains_id == network.chainId);
            if (_reward) {
              dapp.rewards.push(item);
            }
          })
        }
      })
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
