import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useDappStore } from '@/stores/dapp';
import { get } from '@/utils/http';

export const PoolsDAppList = [
  { route: 'dapp/thruster-finance', config: { dex: 'thruster-finance', pools: '' } },
  { route: 'dapp/kim-exchange', config: { dex: 'kim-exchange', pools: '' } },
  { route: 'dapp/lynex', config: { dex: 'lynex', pools: '', lock: '' } },
  { route: 'dapp/trader-joe', config: { dex: 'trader-joe', lend: 'trader-joe-lend' } },
  { route: 'dapp/zerolend', config: { lend: 'zerolend', stake: 'zerolend-stake' } },
  { route: 'dapp/lore', config: { stake: 'lore-stake', lend: 'lore' } },
  { route: 'dapp/teahouse-finance', config: { pools: 'teahouse-finance', earn: '' } },
  { route: 'dapp/xy-finance', config: { dex: 'xy-finance', bridge: 'xy-bridge' } }
];

export default function useDappInfo(pathname?: string, updateCounter?: number) {
  // https://dapdap.atlassian.net/browse/DAP-64
  const searchParams = useSearchParams();
  PoolsDAppList.forEach((it) => {
    if (new RegExp(`^${it.route}$`).test(pathname || '')) {
      const tab = searchParams.get('tab');
      if (!tab || tab === 'dex' || (it.route === 'dapp/teahouse-finance' && tab === 'pools')) {
        return;
      }
      pathname = `${pathname}?tab=${tab}`;
      const params = new URLSearchParams();
      params.set('tab', tab);
      const chain = searchParams.get('chain');
      if (chain) {
        params.set('chain', chain);
      }
      const queryString = params.toString();
      if (queryString) {
        pathname = `${pathname}?${queryString}`;
      }
    }
  });

  const [loading, setLoading] = useState(false);
  const dappStore: any = useDappStore();

  const queryDappInfo = useCallback(async () => {
    if (!pathname) return;
    dappStore.set({ dapp: null });
    try {
      setLoading(true);
      const result = await get(`/api/dapp?route=${encodeURIComponent(pathname)}`);
      if (result.code === 0) {
        dappStore.set({ dapp: result.data });
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [pathname]);

  useEffect(() => {
    queryDappInfo();
  }, [pathname, updateCounter]);

  return { dapp: dappStore.dapp || {}, loading };
}

export function useDappsInfo() {}
