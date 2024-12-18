import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { QUEST_PATH } from '@/config/quest';
import { useDappStore } from '@/stores/dapp';
import { get } from '@/utils/http';

export default function useDappOpen() {
  const router = useRouter();
  const setDapp = useDappStore((store: any) => store.set);
  const open = useCallback(
    async ({
      dapp,
      from,
      isCurrentTab = true,
    }: {
      dapp: any;
      from: 'home' | 'quest' | 'alldapps';
      isCurrentTab?: boolean;
    }) => {
      let _dapp = {} as any;
      if (from === 'quest') {
        _dapp = {
          dapp_network: dapp.dapp_network,
          default_chain_id: dapp.dapp_network[0].chain_id,
          name: dapp.dapp_name,
          logo: dapp.dapp_logo,
          route: dapp.route,
          theme: dapp.theme,
        };
        setDapp({ dapp: _dapp });
      }
      if (from === 'home') {
        _dapp.route = dapp.route;
        setDapp({ dapp });
      }

      if (from === 'alldapps') {
        const result = await get(`${QUEST_PATH}/api/dapp?id=${dapp.id}`);
        _dapp = result.data;
        setDapp({ dapp: _dapp });
      }
      if (isCurrentTab) {
        router.push(!_dapp.route.startsWith('/') ? `/${_dapp.route}` : _dapp.route);
      } else {
        window.open(!_dapp.route.startsWith('/') ? `/${_dapp.route}` : _dapp.route, '_blank');
      }
    },
    [],
  );
  return { open };
}
