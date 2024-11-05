import { useDebounceFn } from 'ahooks';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import chainCofig from '@/config/chains';
import dappConfig from '@/config/dapp';
import useAccount from '@/hooks/useAccount';
import useDappInfo, { PoolsDAppList } from '@/hooks/useDappInfo';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useChainsStore } from '@/stores/chains';
import { useUpdaterStore } from '@/stores/update';
import type { NextPageWithLayout } from '@/utils/types';
import DappView, { Empty } from '@/views/Dapp';

// set dynamic routes for dapps in config file

const BridgeDappList = ['xy-bridge'];

export const DappPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dappPathname = router.query.dappRoute as string;
  const chains = useChainsStore((store: any) => store.chains);
  const chainsFull = useMemo(() => {
    if (!chains?.length) return [];
    const hasEthereum = chains.some((it: any) => it.id === 1);
    if (!hasEthereum) {
      const ethereum = chainCofig[1];
      return [
        ...chains,
        {
          ...ethereum,
          id: 16,
          chain_id: ethereum.chainId,
          block_explorer: ethereum.blockExplorers,
          logo: ethereum.icon,
          name: ethereum.chainName,
          native_currency: JSON.stringify(ethereum.nativeCurrency),
          rpc: JSON.stringify(ethereum.rpcUrls),
          tbd_token: 'N',
          technology: 'Ethereum'
        }
      ];
    }
    return chains;
  }, [chains]);
  const searchParams = useSearchParams();
  const updateCounter = useUpdaterStore((store) => store.updateCounter);

  const currentTab = useMemo(() => {
    return searchParams.get('tab');
  }, [searchParams, dappPathname]);

  const { chainId, account, provider } = useAccount();
  const { dapp, loading } = useDappInfo(dappPathname ? `dapp/${dappPathname}` : '', updateCounter);

  const [currentChain, setCurrentChain] = useState<any>();
  const [ready, setReady] = useState(false);
  const [localConfig, setLocalConfig] = useState<any>();
  const [isChainSupported, setIsChainSupported] = useState<boolean>();

  const dappChains = useMemo(() => {
    if (!chainsFull.length) return [];
    return dapp.dapp_network?.map((network: any) => chainsFull.find((_chain: any) => _chain.id === network.network_id));
  }, [chainsFull, dapp]);

  const { run } = useDebounceFn(
    () => {
      const _chainId = chainId || dapp.default_chain_id;
      const isSupported = !!dapp.dapp_network?.find((_chain: any) => _chain.chain_id === _chainId);
      setIsChainSupported(isSupported && _chainId === chainId);
      const _currentChain = chainsFull.find(
        (_chain: any) => _chain.chain_id === (isSupported ? _chainId : dapp.default_chain_id)
      );
      setCurrentChain(_currentChain);
    },
    {
      wait: 200
    }
  );

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    const CONFIG_TYPE_MAP = {
      swap: (pathname: string) => import(`@/config/swap/dapps/${pathname}`),
      lending: (pathname: string) => import(`@/config/lending/dapps/${pathname}`).then((res) => res.default),
      staking: (pathname: string) => import(`@/config/staking/dapps/${pathname}`).then((res) => res.default),
      liquidity: (pathname: string) => import(`@/config/liquidity/dapps/${pathname}`).then((res) => res.default),
      pool: (pathname: string) => import(`@/config/pool/dapps/${pathname}`).then((res) => res.default)
    } as const;

    const getLocalConfig = async () => {
      try {
        if (!dappPathname) {
          setLocalConfig(null);
          return;
        }

        let configDAppPathname = dappPathname;
        const matchedPool = PoolsDAppList.find((it) => new RegExp(`^${it.route}$`).test(`dapp/${dappPathname}` || ''));

        if (matchedPool) {
          const configNames = matchedPool.config as any;
          if (currentTab && currentTab !== 'dex' && configNames[currentTab]) {
            configDAppPathname = configNames[currentTab];
          }
        }

        if (BridgeDappList.includes(configDAppPathname)) {
          setLocalConfig({ name: configDAppPathname, type: 'bridge' });
          return;
        }

        const config = dappConfig[configDAppPathname];
        if (!config) {
          setLocalConfig({ name: '' });
          return;
        }

        const configLoader = CONFIG_TYPE_MAP[config.type as keyof typeof CONFIG_TYPE_MAP];
        if (!configLoader) {
          console.warn(`Unsupported config type: ${config.type}`);
          setLocalConfig({ name: '' });
          return;
        }

        const result = await configLoader(configDAppPathname);
        setLocalConfig({
          ...result,
          theme: config.theme,
          type: config.type
        });
      } catch (error) {
        console.error('Failed to load local config:', error);
        setLocalConfig({ name: '' });
      }
    };

    getLocalConfig();
  }, [dappPathname, currentTab, updateCounter]);

  useEffect(() => {
    run();
  }, [chainId, dapp, updateCounter]);

  const network = useMemo(() => {
    if (!dapp.dapp_network) return null;
    const _network = dapp.dapp_network?.find((_network: any) => _network.network_id === currentChain?.id);
    return _network || dapp.dapp_network[0];
  }, [currentChain, dapp, updateCounter]);

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
      chains={chainsFull}
    />
  ) : (
    <div />
  );
};

DappPage.getLayout = useDefaultLayout;

export default DappPage;
