import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';
import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';
export default function useAirdropList(campaign_id?: string) {
  const { account } = useAccount()
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const [airdropList, setAirdropList] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const queryAirdropListByAccount = async (query) => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`/api/airdrop/list-by-account`, query);
      const data = result.data || []
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
