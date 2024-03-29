import { useCallback, useEffect, useState } from 'react';
import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { get } from '@/utils/http';

export default function useDapps() {
  const [loading, setLoading] = useState(false);
  const [dapps, setDapps] = useState<any>();
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const fetchDapps = useCallback(async () => {
    try {
      setLoading(true);
      setDapps([]);
      const result = await get(`/db3`, { url: 'api/balance/dapp/list', params: JSON.stringify({ address: account }) });
      const _dapps: any = {};
      result?.data?.list.forEach((record: any) => {
        if (_dapps[record.id]) {
          _dapps[record.id].assets.push(record.assets);
        } else {
          _dapps[record.id] = { ...record, assets: [record.assets] };
        }
      });

      setDapps(
        Object.values(_dapps).map((record: any) => {
          let _totalBalance = new Big(0);
          record.assets.map((asset: any) => {
            asset.map((item: any) => {
              _totalBalance =
                item.type.toLowerCase() === 'borrow' ? _totalBalance.minus(item.usd) : _totalBalance.add(item.usd);
            });
          });
          record.usd = _totalBalance;
          return { ...record, usd: _totalBalance };
        }),
      );
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resultNetwork data:', error);
      setLoading(false);
      setDapps([]);
    }
  }, [account]);

  const { run } = useDebounceFn(
    () => {
      if (!account) {
        setLoading(false);
        setDapps([]);
      } else {
        check(fetchDapps);
      }
    },
    { wait: dapps ? 600 : 3000 },
  );

  useEffect(() => {
    run();
  }, [account]);

  return { loading, dapps };
}
