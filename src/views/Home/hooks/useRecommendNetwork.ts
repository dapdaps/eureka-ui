import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';
import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';
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
      setRecommendNetwork(data);
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
        queryRecommendNetwork()
      });
    },
    { wait: recommendNetwork ? 800 : 3000 },
  );

  useEffect(() => {
    run();
  }, [account]);

  return { loading, recommendNetwork, queryRecommendNetwork };
}
