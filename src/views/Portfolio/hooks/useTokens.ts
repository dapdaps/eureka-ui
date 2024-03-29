import { useCallback, useEffect, useState } from 'react';
import useAccount from '@/hooks/useAccount';
import { AccessKey } from '../config';
import Big from 'big.js';

export default function useTokens() {
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState<any>();
  const [networks, setNetworks] = useState<any>();
  const [totalBalance, setTotalBalance] = useState<any>();
  const { account } = useAccount();

  const fetchTokens = useCallback(async () => {
    try {
      setLoading(true);
      setTokens([]);
      const response = await fetch(`https://api.db3.app/api/balance/list?address=${account}`, {
        method: 'GET',
        headers: {
          AccessKey,
        },
      });
      const result = await response.json();
      const _networks: any = {};
      let _totalBalance = new Big(0);
      result?.data?.list.forEach((record: any) => {
        if (_networks[record.chain_id]) {
          _networks[record.chain_id].usd += Number(record.usd);
        } else {
          _networks[record.chain_id] = {
            id: record.chain_id,
            usd: Number(record.usd),
          };
        }
        _totalBalance = _totalBalance.add(record.usd);
      });
      const _tokens = result?.data?.list.map((record: any) => {
        const percent = new Big(record.usd).div(_totalBalance).mul(100).toFixed(2);
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

  useEffect(() => {
    if (account) {
      fetchTokens();
    } else {
      setLoading(false);
    }
  }, [account]);

  return { loading, tokens, networks, totalBalance };
}
