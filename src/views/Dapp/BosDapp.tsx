import dynamic from 'next/dynamic';
import { useCallback } from 'react';

import { Spinner } from '@/components/lib/Spinner';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import chainsConfig from '@/config/chains';
import GAS_LIMIT_RECOMMENDATIONS from '@/config/contract/gas-limit';
import multicallConfig from '@/config/contract/multicall';
import wethConfig from '@/config/contract/weth';
import { bridge as dappBridgeTheme } from '@/config/theme/dapp';
import useAddAction from '@/hooks/useAddAction';
import useSwitchChain from '@/hooks/useSwitchChain';
import useToast from '@/hooks/useToast';
import LendingDex from '@/modules/lending/Dex';
import { useLayoutStore } from '@/stores/layout';
import { usePriceStore } from '@/stores/price';
import { multicall } from '@/utils/multicall';
import refresh from '@/utils/refresh';

export default function BosDapp({
  dapp,
  chainId,
  account,
  provider,
  dappChains,
  currentChain,
  localConfig,
  network,
  isChainSupported,
  setCurrentChain,
  setIsChainSupported,
  chains,
  props = {}
}: any) {
  const toast = useToast();
  const prices = usePriceStore((store) => store.price);
  const { addAction } = useAddAction('dapp');
  const setLayoutStore = useLayoutStore((store) => store.set);
  const { switching, switchChain } = useSwitchChain();

  const bridgeCb = useCallback(
    () =>
      setLayoutStore({
        defaultTab: 'bridge',
        showAccountSider: true
      }),
    []
  );

  const componentProps = {
    chainId,
    name: dapp.name,
    toast,
    account,
    provider,
    CHAIN_LIST: dappChains,
    curChain: currentChain,
    defaultDex: dapp.name,
    ...dapp,
    wethAddress: wethConfig[currentChain.chain_id],
    multicallAddress: multicallConfig[currentChain.chain_id],
    dexConfig: {
      ...localConfig?.basic,
      ...(currentChain?.chain_id && localConfig?.networks?.[currentChain.chain_id]
        ? localConfig.networks[currentChain.chain_id]
        : {}),
      theme: localConfig?.theme
    },
    prices,
    addAction,
    bridgeCb,
    onSwitchChain: (params: any) => {
      if (Number(params.chainId) === chainId) {
        setCurrentChain(chains.find((_chain: any) => _chain.chain_id === chainId));
        setIsChainSupported(true);
      } else {
        switchChain(params);
      }
    },
    switchingChain: switching,
    nativeCurrency: chainsConfig[currentChain.chain_id].nativeCurrency,
    theme: { bridge: dappBridgeTheme[currentChain.chain_id] },
    multicall,
    isChainSupported,
    GAS_LIMIT_RECOMMENDATIONS,
    refresh,
    windowOpen: (url: any, target: any) => {
      window.open(url, target);
    },
    ...props
  };

  const nativeComponents = ['lending', 'compound v3', 'aave-v3'];

  if (nativeComponents.includes(localConfig.type)) {
    return <LendingDex {...componentProps} />;
  }

  const DappNameList = [
    'Gamma',
    'RangeProtocol',
    'Arrakis',
    'Metavault',
    'Steer',
    'Juice',
    'BlastOff',
    'AgentFi',
    'Beefy',
    'Duo',
    'Kelp',
    'Ledgity',
    'Teahouse',
    'AthenaFinance',
    'AuraFinance',
    'Hyperlock',
    'Infrared',
    'ZerolendStake',
    'Pencil',
    'LoreStake',
    'Pencil'
  ];

  if (DappNameList.includes(localConfig?.basic?.name)) {
    const DynamicComponent = dynamic(() => import(`@/modules/${localConfig?.type}/${localConfig?.basic?.name}`), {
      ssr: false,
      loading: () => {
        return <Spinner />;
      }
    });
    return <DynamicComponent {...componentProps} />;
  }

  return <ComponentWrapperPage componentProps={componentProps} src={network?.dapp_src} />;
}
