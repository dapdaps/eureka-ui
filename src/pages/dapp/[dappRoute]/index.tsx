import { useDebounceFn } from 'ahooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import dappConfig from '@/config/dapp';
import useAccount from '@/hooks/useAccount';

import { useDefaultLayout } from '@/hooks/useLayout';

import useDappInfo from '@/hooks/useDappInfo';
import { useChainsStore } from '@/stores/chains';
import DappView from '@/views/Dapp';
import type { NextPageWithLayout } from '@/utils/types';

// set dynamic routes for dapps in config file

export const DappPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dappPathname = router.query.dappRoute as string;
  const chains = useChainsStore((store: any) => store.chains);

  const { chainId, account } = useAccount();
  const { dapp, loading } = useDappInfo(dappPathname ? `dapp/${dappPathname}` : '');
  // const loading = false
  // const dapp = {
  //   "id": 95,
  //   "created_at": "2024-01-30T03:22:22.323000+00:00",
  //   "updated_at": "2024-02-17T10:21:59+00:00",
  //   "name": "Xfai",
  //   "description": "Xfai is a decentralized exchange (DEX), that is based on a system of of on-chain constant function market maker (CFMM) smart contracts.",
  //   "route": "dapp/xfai",
  //   "logo": "https://s3.amazonaws.com/dapdap.prod/images/xfai.png",
  //   "favorite": 0,
  //   "default_chain_id": 81457,
  //   "priority": 1,
  //   "tbd_token": "N",
  //   "recommend": true,
  //   "recommend_icon": "https://s3.amazonaws.com/dapdap.prod/images/dapps1.jpg",
  //   "tag": "xfai,linea,swap,dex,dapdap",
  //   "native_currency": "{\"name\":\"\",\"symbol\":\"\",\"decimals\":1,\"logo\":\"\"}",
  //   "theme": "{\"swap_color\":\"\"}",
  //   "dapp_category": [
  //     {
  //       "dapp_id": 95,
  //       "category_id": 2
  //     }
  //   ],
  //   "dapp_network": [
  //     {
  //       "dapp_id": 95,
  //       "network_id": 4,
  //       "chain_id": 81457,
  //       "dapp_src": "bluebiu.near/widget/Liquidity.BLASTOFF"
  //     }
  //   ]
  // }

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
      setLocalConfig(null);
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

    setLocalConfig({ ...result, theme: config.theme });
  }, [dappPathname]);

  const { run } = useDebounceFn(
    () => {
      const _chainId = chainId || dapp.default_chain_id;
      const isSupported = !!dapp.dapp_network?.find((_chain: any) => _chain.chain_id === _chainId);
      setIsChainSupported(isSupported && _chainId === chainId);
      setCurrentChain(
        chains.find((_chain: any) => _chain.chain_id === (isSupported ? _chainId : dapp.default_chain_id)),
      );
    },
    {
      wait: 500,
    },
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

  if (!dapp || !currentChain || (!dapp.default_chain_id && !dapp.default_network_id)) return <div />;

  if (!localConfig) return <div />;

  return ready && !loading ? (
    <DappView
      dapp={dapp}
      chainId={chainId}
      account={account}
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
