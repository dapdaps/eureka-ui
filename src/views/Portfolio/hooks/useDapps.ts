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
      const result = await get(`/db3`, {
        url: 'api/balance/dapp/list',
        params: JSON.stringify({ address: '0xC25d79fc4970479B88068Ce8891eD9bE5799210D' }),
      });
      const _dapps: any = result?.data?.list
        // .filter((record: any) => record.name === 'juice')
        .map((record: any) => {
          let _totalBalance = new Big(0);
          let items: any = {};
          let _typeBalance: any = {};
          record.assets.forEach((item: any) => {
            let _typeTotalBalance = new Big(0);
            const _type = item.type || record.type;
            item.assets.forEach((asset: any) => {
              _totalBalance =
                _type.toLowerCase() === 'borrow'
                  ? _totalBalance.minus(asset.usd || 0)
                  : _totalBalance.add(asset.usd || 0);

              _typeTotalBalance =
                _type.toLowerCase() === 'borrow'
                  ? _typeTotalBalance.minus(asset.usd || 0)
                  : _typeTotalBalance.add(asset.usd || 0);
            });
            if (items[_type]) {
              items[_type].push(item);
              _typeBalance[_type] = _typeBalance[_type].add(_typeTotalBalance);
            } else {
              items[_type] = [item];
              _typeBalance[_type] = _typeTotalBalance;
            }
            item.usd = _typeTotalBalance;
          });

          return {
            ...record,
            assets: Object.keys(items).map((item: any) => ({
              type: item,
              assets: items[item],
              usd: _typeBalance[item],
            })),
            usd: _totalBalance,
          };
        });
      setDapps(_dapps);
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
