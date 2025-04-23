import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { useCallback, useEffect } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import type { Network } from '@/hooks/useNetworks';
import { usePortfolioBalanceStore } from '@/stores/portfolio-balance';
import { get } from '@/utils/http';

export default function useTokens(props: { networkList: Network[]; isInitLoad?: boolean }) {
  const { networkList, isInitLoad = true } = props;

  const { account } = useAccount();
  const { loading, tokens, networks, totalBalance, setLoading, setTokens, setNetworks, setTotalBalance } =
    usePortfolioBalanceStore();

  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const fetchTokens = useCallback(async () => {
    setLoading(true);
    try {
      setTokens([]);
      const result = await get(`/api.db3.app/api/balance/list`, { address: account }, { skipFormatUrl: true });
      const _data = result?.data?.list ?? [];
      const _networks: { [k: string]: NetworkItem } = {};
      networkList.forEach((n) => {
        _networks[n.chain_id] = {
          icon: n.logo,
          id: n.chain_id,
          name: n.name,
          usd: Big(0)
        };
      });
      let _totalBalance = new Big(0);
      _data.forEach((record: any) => {
        record.chainLogo = _networks[record.chain_id]?.icon;
        if (_networks[record.chain_id]) {
          _networks[record.chain_id].usd = Big(_networks[record.chain_id].usd).plus(record.usd || 0);
        }
        _totalBalance = _totalBalance.add(record.usd || 0);
      });
      setTokens(_data);
      setNetworks(
        Object.values(_networks).sort((a, b) => {
          return Big(b.usd).toNumber() - Big(a.usd).toNumber();
        })
      );
      setTotalBalance(_totalBalance);
    } catch (error) {
      console.error('Error fetching resultNetwork data:', error);
      setNetworks([]);
      setTotalBalance(undefined);
      setTokens([]);
    }
    setLoading(false);
  }, [account, networkList]);

  const { run } = useDebounceFn(
    () => {
      if (!account || !networkList.length) {
        setNetworks([]);
        setLoading(false);
        setTotalBalance(undefined);
        setTokens([]);
      } else {
        check(fetchTokens);
      }
    },
    { wait: tokens.length > 0 ? 600 : 3000 }
  );

  useEffect(() => {
    if (!isInitLoad) return;
    run();
  }, [account, networkList]);

  return { loading, tokens, networks, totalBalance };
}

export interface NetworkItem {
  icon: string;
  id: number;
  name: string;
  usd: Big.Big;
}
