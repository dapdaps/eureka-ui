import { useCallback, useEffect, useState } from 'react';
import useAccount from '@/hooks/useAccount';
import Big from 'big.js';
import { AccessKey } from '../config';

export default function useDapps() {
  const [loading, setLoading] = useState(false);
  const [dapps, setDapps] = useState<any>();
  const { account } = useAccount();

  const fetchDapps = useCallback(async () => {
    try {
      setLoading(true);
      setDapps([]);
      const response = await fetch(`https://api.db3.app/api/balance/dapp/list?address=${account}`, {
        method: 'GET',
        headers: {
          AccessKey,
        },
      });
      const result = await response.json();
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

  useEffect(() => {
    if (account) {
      fetchDapps();
    } else {
      setLoading(false);
      setDapps([]);
    }
  }, [account]);

  return { loading, dapps };
}
