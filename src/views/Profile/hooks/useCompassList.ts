import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';

import type { Tab } from '../types';
type CompassType = any;
export default function useCompassList(tab: Tab) {
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const [compassList, setCompassList] = useState<any>([]);
  const [compassQuantity, setCompassQuantity] = useState<number>(0);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const queryCompassListByAccount = async (query: any) => {
    if (loading) return;
    setLoading(true);
    setLoaded(false);
    try {
      const result = await get(`/api/compass/list-by-account`, query);
      const data = (result.data || []).map((compass: CompassType) => {
        let reward = null,
          rule = null;
        try {
          reward = JSON.parse(compass.reward);
        } catch (error) {
          reward = [];
        }
        try {
          rule = JSON.parse(compass.rule);
        } catch (error) {
          rule = {};
        }
        return {
          ...compass,
          reward,
          rule
        };
      });
      setCompassList(data);
      setCompassQuantity(data.length);
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
      if (account) {
        check(() => {
          queryCompassListByAccount({
            status: 'ongoing'
          });
        });
      } else {
        setLoaded(true);
        setCompassList([]);
      }
    },
    { wait: compassList ? 800 : 3000 }
  );
  useEffect(() => {
    run();
  }, [account]);
  useEffect(() => {
    if (tab === 'InProgress') {
      run();
    } else {
      setLoaded(false);
      setCompassList([]);
    }
  }, [tab]);

  return { loading, loaded, compassList, compassQuantity, queryCompassListByAccount };
}
