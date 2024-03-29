import { useCallback, useEffect, useState } from 'react';
import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { useDebounceFn } from 'ahooks';
import { get } from '@/utils/http';
import Big from 'big.js';

export default function useTokens() {
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState<any>();
  const [networks, setNetworks] = useState<any>();
  const [totalBalance, setTotalBalance] = useState<any>();
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const fetchTokens = useCallback(async () => {
    try {
      setLoading(true);
      setTokens([]);
      const result = await get(`/db3`, { url: 'api/balance/list', params: JSON.stringify({ address: account }) });
      const _networks: any = {};
      let _totalBalance = new Big(0);
      result?.data?.list.forEach((record: any) => {
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
      const _tokens = result?.data?.list.map((record: any) => {
        const percent = _totalBalance.eq(0) ? '0' : new Big(record.usd || 0).div(_totalBalance).mul(100).toFixed(2);
        return { ...record, percent };
      });
      setLoading(false);
      setTokens(_tokens);
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
