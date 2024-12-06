import { useCallback, useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';

const selectors = ['@AcrossProtocol', '@LynexFi', '@efrogs_on_linea', '@DapDapMeUp'];

const generateData = (data: any) => {
  if (!data || data.length === 0) return [];
  const filteredData = data
    .filter((it: any) => {
      if (!['twitter_follow'].includes(it.category)) {
        return false;
      }
      return selectors.some((selector) => it.name.includes(selector));
    })
    .map((item: any) => {
      const selector = selectors.find((s) => item.name.includes(s));
      return {
        ...item,
        twitterName: selector || ''
      };
    });

  return filteredData.sort((a: any, b: any) => {
    const indexA = selectors.findIndex((selector) => a.name.includes(selector));
    const indexB = selectors.findIndex((selector) => b.name.includes(selector));
    return indexA - indexB;
  });
};

export const useQuest = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { account, provider, chainId } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: false });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await get('/api/campaign/quest/list', { category: 'linea-marsh' });
      if (result.code === 0 && result.data) {
        setData(generateData(result.data));
      }
    } catch (err) {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [account, provider]);

  return { data, loading, check, account };
};
