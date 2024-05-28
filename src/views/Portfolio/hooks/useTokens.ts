import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { useCallback, useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { get } from '@/utils/http';

export default function useTokens() {
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState<any>([]);
  const [networks, setNetworks] = useState<any>();
  const [totalBalance, setTotalBalance] = useState<any>();
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const fetchTokens = useCallback(async () => {
    try {
      setLoading(true);
      setTokens([]);
      const result = await get(`/db3`, { url: 'api/balance/list', params: JSON.stringify({ address: account }) });
      // result.data.list = [
      //   {
      //     id: 57149967,
      //     address: '0x4300000000000000000000000000000000000004',
      //     chain_id: 81457,
      //     symbol: 'WETH',
      //     price: '3850.640000000',
      //     amount: '0.00003191477472727',
      //     usd: '0.122892308155814953',
      //   },
      // ];
      const _data = result?.data?.list ?? [];
      const _networks: any = {};
      let _totalBalance = new Big(0);
      _data.forEach((record: any) => {
        if (_networks[record.chain_id]) {
          _networks[record.chain_id].usd += Number(record.usd || 0);
        } else {
          _networks[record.chain_id] = {
            id: record.chain_id,
            usd: Number(record.usd || 0),
          };
        }
        _totalBalance = _totalBalance.add(record.usd || 0);
      });

      setLoading(false);
      setTokens(_data);
      setNetworks(Object.values(_networks));
      setTotalBalance(_totalBalance);
    } catch (error) {
      console.error('Error fetching resultNetwork data:', error);
      setNetworks([]);
      setLoading(false);
      setTotalBalance(undefined);
      setTokens([]);
    }
  }, [account]);

  const { run } = useDebounceFn(
    () => {
      if (!account) {
        setNetworks([]);
        setLoading(false);
        setTotalBalance(undefined);
        setTokens([]);
      } else {
        check(fetchTokens);
      }
    },
    { wait: tokens ? 600 : 3000 },
  );

  useEffect(() => {
    run();
  }, [account]);

  return { loading, tokens, networks, totalBalance };
}
