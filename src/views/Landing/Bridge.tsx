import { memo, useMemo } from 'react';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { LANDING_CHAINS } from '@/config/bridge/chains';
import configChains from '@/config/chains';
import useAddAction from '@/hooks/useAddAction';
import { useChainsStore } from '@/stores/chains';

import { CHAIN_ID, FROM_CHAIN_ID } from './config';

const Bridge = ({ onSuccess }: { onSuccess: VoidFunction }) => {
  const chains = useChainsStore((store: any) => store.chains);
  const { addAction } = useAddAction('landing');
  const supportChains = useMemo(() => {
    return Object.keys(LANDING_CHAINS).map((_chainId) =>
      chains.find((_chain: any) => _chain.chain_id === Number(_chainId)),
    );
  }, [chains]);
  const currentChain = useMemo(() => {
    return configChains[FROM_CHAIN_ID];
  }, [chains]);
  return (
    <ComponentWrapperPage
      componentProps={{
        chains: supportChains,
        currentChain: { ...currentChain, src: LANDING_CHAINS[CHAIN_ID] },
        addAction: (data: any) => {
          addAction(data);
          onSuccess();
        },
        from: 'landing',
        defaultChainId: FROM_CHAIN_ID,
      }}
      src={'dapdapbos.near/widget/BridgeEntry'}
    />
  );
};

export default memo(Bridge);
