import { useDebounceFn } from 'ahooks';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

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
  const searchParams = useSearchParams();
  const updateCounter = useUpdaterStore((store) => store.updateCounter);

  const currentTab = useMemo(() => {
    return searchParams.get('tab');
  }, [searchParams, dappPathname]);

  const { chainId, account, provider } = useAccount();
  const { dapp, loading } = useDappInfo(dappPathname ? `dapp/${dappPathname}` : '', updateCounter);
  console.log(dappPathname, '<===useRouter');

  const [currentChain, setCurrentChain] = useState<any>();
  const [ready, setReady] = useState(false);
  const [localConfig, setLocalConfig] = useState<any>();
  const [isChainSupported, setIsChainSupported] = useState<boolean>();

  const dappChains = useMemo(() => {
    if (!chains?.length) return [];
    return dapp.dapp_network?.map((network: any) => chains.find((_chain: any) => _chain.id === network.network_id));
  }, [chains, dapp]);

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

  console.log('=localConfig', localConfig);

  console.log('===currentChain', currentChain);
  console.log('====dapp', dapp);
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
