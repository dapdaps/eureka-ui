import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';
import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';
import { CategoryList, PageSize } from '@/views/AllDapps/config';
import chainCofig from '@/config/chains';

type AirdropType = any
type NetworkType = any
type CategoryType = any

export default function useAirdropList() {
  const { account } = useAccount()
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const [airdropList, setAirdropList] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const queryAirdropListByAccount = async (query: any) => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`/api/airdrop/list-by-account`, query);
      const data = (result.data || []).map((airdrop: AirdropType) => {
        if (airdrop?.category === 'dapp') {
          const ids = airdrop?.dapp?.network_ids?.split(',')
          const networks: NetworkType[] = []
          ids.forEach((id: number) => {
            const chain = chainCofig[id]
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
    } catch (err) {
      console.log(err, 'err');
    } finally {
      setLoading(false);
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

  useEffect(() => {
    run();
  }, [account]);

  return { loading, airdropList, queryAirdropListByAccount };
}
