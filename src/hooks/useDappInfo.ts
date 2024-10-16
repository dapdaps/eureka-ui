import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useDappStore } from '@/stores/dapp';
import { get } from '@/utils/http';

export const PoolsDAppList = [
  { route: 'dapp/thruster-finance', config: { dex: 'thruster-finance', pools: '' } },
  { route: 'dapp/kim-exchange', config: { dex: 'kim-exchange', pools: '' } },
  { route: 'dapp/lynex', config: { dex: 'lynex', pools: '', lock: '' } },
  { route: 'dapp/trader-joe', config: { dex: 'trader-joe', lend: 'trader-joe-lend' } }
];

export default function useDappInfo(pathname?: string) {
  // https://dapdap.atlassian.net/browse/DAP-64
  const searchParams = useSearchParams();
  PoolsDAppList.forEach((it) => {
    if (new RegExp(`^${it.route}$`).test(pathname || '')) {
      const tab = searchParams.get('tab');
      if (!tab || tab === 'dex') return;
      pathname = `${pathname}?tab=${tab}`;
    }
  });

  const [loading, setLoading] = useState(false);
  const dappStore: any = useDappStore();

  const queryDappInfo = useCallback(async () => {
    if (!pathname) return;
    dappStore.set({ dapp: null });
    try {
      setLoading(true);
      const result = await get(`/api/dapp?route=${pathname}`);
      if (result.code === 0) {
        dappStore.set({ dapp: result.data });
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!dappStore.dapp || dappStore.dapp.route !== pathname) {
      queryDappInfo();
    }
  }, [pathname]);

  return { dapp: dappStore.dapp || {}, loading };
}

export function useDappsInfo() {}
