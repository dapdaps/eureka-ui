import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';

import popupsData, { IdToPath } from '@/config/all-in-one/chains';
import chainCofig from '@/config/chains';
import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';
import { CategoryList } from '@/views/AllDapps/config';

import type { Tab } from '../types';

type AirdropType = any
type NetworkType = any
type CategoryType = any

export default function useAirdropList(tab: Tab) {
  const { account } = useAccount()
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const [airdropList, setAirdropList] = useState<any>([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const queryAirdropListByAccount = async (query: any) => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`/api/airdrop/list-by-account`, query);
      const data = (result.data || [])
        .filter((airdrop: AirdropType) => {
          return airdrop?.completed_count < airdrop?.total_quest
        })
        .map((airdrop: AirdropType) => {
          if (airdrop?.category === 'dapp') {
            const ids = airdrop?.dapp?.network_ids?.split(',')
            const networks: NetworkType[] = []
            ids.forEach((id: number) => {
              const currChain = popupsData[IdToPath[id]]
              const chain = chainCofig[currChain?.chainId]
              chain && networks.push(chain)
            })
            airdrop.dapp.networks = networks
            const c_ids = airdrop?.dapp?.category_ids?.split(',')
            const categories: CategoryType[] = []
            c_ids.forEach((c_id: string) => {
              const category = CategoryList.find(_c => (_c.key + "") === c_id)
              category && categories.push(category)
            })
            airdrop.dapp.categories = categories
          }
          return airdrop
        })
      setAirdropList(data);
      setLoading(false);
      setLoaded(true);
    } catch (err) {
      console.log(err, 'err');
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  };

  const { run } = useDebounceFn(
    () => {
      account && check(() => {
        queryAirdropListByAccount({
          status: 'ongoing'
        })
      });
    },
    { wait: airdropList ? 800 : 3000 },
  );

  // useEffect(() => {
  //   (tab === 'InProgress' || !loaded) && run();
  // }, [account, tab]);
  useEffect(() => {
    run()
  }, [account])
  useEffect(() => {
    if (tab === 'InProgress') {
      run();
    } else {
      setLoaded(false)
      setAirdropList([])
    }
  }, [tab]);

  return { loading, loaded, airdropList, queryAirdropListByAccount };
}
