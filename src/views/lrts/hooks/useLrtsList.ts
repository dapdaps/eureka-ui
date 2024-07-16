import { useCallback, useEffect, useState } from 'react';

import { useLrtDataStore } from '@/stores/lrts';
import { get } from '@/utils/http';

export default function useLrtsList() {
  const [lstList, setLstList] = useState<any>();
  const [lrtList, setLrtList] = useState<any>();
  const [loading, setLoading] = useState(true);

  const lrtsData = useLrtDataStore((store: any) => store.data);
  const setLrtDataStore = useLrtDataStore((store: any) => store.set);

  const fetchLst = useCallback(async () => {
    try {
      setLoading(true);
      const result = await get('/api/lrts/lst/list');

      if (result.code === 0 && result.data) {
        setLstList(result.data);
      } else {
        setLstList([]);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);
  const fetchLrt = useCallback(async () => {
    try {
      setLoading(true);
      const result = await get('/api/lrts/lrt/list');

      if (result.code === 0 && result.data) {
        setLrtList(result.data);
      } else {
        setLrtList([]);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLst();
    fetchLrt();
  }, []);

  useEffect(() => {
    if (!lstList) return;
    const _data = [...lrtsData];
    _data.forEach((lst: any) => {
      const _lstToken = lstList.find((item: any) => item.symbol === lst.token.symbol);
      lst.tvl = _lstToken?.tvl || 0;
      lst.apr = _lstToken?.apr || 0;
      // if (Array.isArray(lst.lrtTokens)) {
      //   lst.lrtTokens.forEach((lrt: any) => {
      //     const _lrtToken = lstList.find((item: any) => item.symbol === lrt.token.symbol);
      //     if (lrt.token) {
      //       lrt.tvl = _lrtToken?.tvl || 0;
      //       lrt.apr = _lrtToken?.apr || 0;
      //     }
      //   });
      // }
    });
    setLrtDataStore({
      data: _data,
    });
  }, [lstList]);

  useEffect(() => {
    if (!lrtList) return;
    // const _lrtTokens = lrtsData.map((item: any) => item.lrtTokens).flat();

    const _data = [...lrtsData];
    _data.forEach((lst: any) => {
      if (Array.isArray(lst.lrtTokens)) {
        lst.lrtTokens.forEach((lrt: any) => {
          const _lrtToken = lrtList.find((item: any) => item.symbol === lrt.token.symbol);

          lrt.tvl = _lrtToken?.tvl || 0;
          lrt.apr = _lrtToken?.apr || 0;
        });
      }
    });
    setLrtDataStore({
      data: _data,
    });
  }, [lrtList]);

  return { lstList, loading };
}
