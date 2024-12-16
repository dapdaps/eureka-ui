import { useCallback, useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';

const selectors = {
  twitter: ['@AcrossProtocol', '@LynexFi', '@efrogs_on_linea', '@DapDapMeUp', '@CROAK_on_linea'],
  telegram: ['@efrogs_on_linea', '@CROAK_on_linea']
};

const getProjectName = (name: string) => {
  const match = name.match(/@([^_]+)/);
  return match ? match[1].toLowerCase() : '';
};

const generateData = (data: any) => {
  if (!data || data.length === 0) return [];
  const filteredData = data
    .filter((it: any) => {
      if (!['twitter_follow', 'telegram_join'].includes(it.category)) {
        return false;
      }
      const relevantSelectors = it.category === 'twitter_follow' ? selectors.twitter : selectors.telegram;
      return relevantSelectors.some((selector) => it.name.includes(selector));
    })
    .map((item: any) => {
      const relevantSelectors = item.category === 'twitter_follow' ? selectors.twitter : selectors.telegram;
      const selector = relevantSelectors.find((s) => item.name.includes(s));
      return {
        ...item,
        twitterName: selector || '',
        projectName: getProjectName(selector || '')
      };
    });

  return filteredData.sort((a: any, b: any) => {
    if (a.projectName === b.projectName) {
      return a.category === 'twitter_follow' ? -1 : 1;
    }
    return a.projectName.localeCompare(b.projectName);
  });
};

export const useQuest = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { account, provider, chainId } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });
  const [updater, setUpdater] = useState(0);

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
    check(fetchData);
  }, [account, provider, updater]);

  return { data, loading, check, account, setUpdater };
};
