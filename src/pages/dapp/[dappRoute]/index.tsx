import { useDebounceFn } from 'ahooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import dappConfig from '@/config/dapp';
import useAccount from '@/hooks/useAccount';
import useDappInfo from '@/hooks/useDappInfo';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useChainsStore } from '@/stores/chains';
import type { NextPageWithLayout } from '@/utils/types';
import DappView, { Empty } from '@/views/Dapp';

// set dynamic routes for dapps in config file

export const DappPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dappPathname = router.query.dappRoute as string;
  const chains = useChainsStore((store: any) => store.chains);

  const { chainId, account, provider } = useAccount();
  const { dapp, loading } = useDappInfo(dappPathname ? `dapp/${dappPathname}` : '');
  const [currentChain, setCurrentChain] = useState<any>();
  const [ready, setReady] = useState(false);
  const [localConfig, setLocalConfig] = useState<any>();
  const [isChainSupported, setIsChainSupported] = useState<boolean>();

  const dappChains = useMemo(() => {
    if (!chains?.length) return [];
    return dapp.dapp_network?.map((network: any) => chains.find((_chain: any) => _chain.id === network.network_id));
  }, [chains, dapp]);

  const getLocalConfig = useCallback(async () => {
    if (!dappPathname) {
      setLocalConfig(null);
      return;
    }

    const config = dappConfig[dappPathname];

    if (!config) {
      setLocalConfig({ name: '' });
      return;
    }
    let result: any = null;
    if (config.type === 'swap') {
      result = await import(`@/config/swap/dapps/${dappPathname}`);
    }
    if (config.type === 'lending') {
      result = (await import(`@/config/lending/dapps/${dappPathname}`))?.default;
    }
    if (config.type === 'staking') {
      result = (await import(`@/config/staking/dapps/${dappPathname}`))?.default;
    }
    if (config.type === 'liquidity') {
      result = (await import(`@/config/liquidity/dapps/${dappPathname}`))?.default;
    }
    if (config.type === 'pool') {
      result = (await import(`@/config/pool/dapps/${dappPathname}`))?.default;
    }

    setLocalConfig({ ...result, theme: config.theme, type: config.type });
  }, [dappPathname]);

  const { run } = useDebounceFn(
    () => {
      const _chainId = chainId || dapp.default_chain_id;
      const isSupported = !!dapp.dapp_network?.find((_chain: any) => _chain.chain_id === _chainId);
      setIsChainSupported(isSupported && _chainId === chainId);
      setCurrentChain(
        chains.find((_chain: any) => _chain.chain_id === (isSupported ? _chainId : dapp.default_chain_id))
      );
    },
    {
      wait: 500
    }
  );

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    getLocalConfig();
  }, [dappPathname]);

  useEffect(() => {
    run();
  }, [chainId, dapp]);
  const network = useMemo(() => {
    if (!dapp.dapp_network) return null;
    const _network = dapp.dapp_network?.find((_network: any) => _network.network_id === currentChain?.id);
    return _network || dapp.dapp_network[0];
  }, [currentChain, dapp]);

  if (localConfig?.name === '') return <Empty />;
  if (!currentChain || !localConfig || !dapp) return <div />;

  return ready && !loading ? (
    <DappView
      dapp={dapp}
      chainId={chainId}
      account={account}
      provider={provider}
      dappChains={dappChains}
      currentChain={currentChain}
      localConfig={localConfig}
      network={network}
      isChainSupported={isChainSupported}
      setIsChainSupported={setIsChainSupported}
      setCurrentChain={setCurrentChain}
      chains={chains}
    />
  ) : (
    <div />
  );
};

DappPage.getLayout = useDefaultLayout;

export default DappPage;
