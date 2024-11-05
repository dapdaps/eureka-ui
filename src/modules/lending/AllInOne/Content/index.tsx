import { useCallback } from 'react';

import chainsConfig from '@/config/chains';
import GAS_LIMIT_RECOMMENDATIONS from '@/config/contract/gas-limit';
import multicallConfig from '@/config/contract/multicall';
import wethConfig from '@/config/contract/weth';
import { bridge as dappBridgeTheme } from '@/config/theme/dapp';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useSwitchChain from '@/hooks/useSwitchChain';
import useToast from '@/hooks/useToast';
import { StyledContainer } from '@/modules/lending/AllInOne/Content/styles';
import LendingAaveV3 from '@/modules/lending/components/AaveV3';
import LendingCompoundV3 from '@/modules/lending/components/CompoundV3';
import LendingContent from '@/modules/lending/components/Content';
import { DexType } from '@/modules/lending/models';
import { useLayoutStore } from '@/stores/layout';
import { usePriceStore } from '@/stores/price';
import { multicall } from '@/utils/multicall';
import refresh from '@/utils/refresh';

const DexComponentMap: Partial<Record<DexType, any>> = {
  [DexType.CompoundV3]: LendingCompoundV3,
  [DexType.AaveV3]: LendingAaveV3
};

const AllInOneContent = (props: Props) => {
  const { localConfig, currentDapp, currentTab, currentChain, currentPool, isHideSpinner } = props;

  const toast = useToast();
  const { chainId, account, provider } = useAccount();
  const prices = usePriceStore((store) => store.price);
  const { addAction } = useAddAction('all-in-one');
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

  console.log('AllInOne Content props: %o, currentChain: %o', props, currentChain);

  const componentProps = {
    chainId: localConfig.chainId,
    name: currentDapp.name,
    toast,
    account,
    provider,
    CHAIN_LIST: [currentChain],
    curChain: currentChain,
    defaultDex: currentDapp.name,
    // ...dapp,
    wethAddress: wethConfig[currentChain.chain_id],
    multicallAddress: multicallConfig[currentChain.chain_id],
    dexConfig: {
      ...currentDapp,
      theme: localConfig.theme,
      type: currentDapp.type || 'lending'
    },
    prices,
    addAction,
    bridgeCb,
    onSwitchChain: (params: any) => {
      if (Number(params.chainId) === chainId) {
        // setCurrentChain(chains.find((_chain: any) => _chain.chain_id === chainId));
        // setIsChainSupported(true);
      } else {
        switchChain(params);
      }
    },
    switchingChain: switching,
    nativeCurrency: chainsConfig[currentChain.chain_id].nativeCurrency,
    theme: { bridge: dappBridgeTheme[currentChain.chain_id] },
    multicall,
    isChainSupported: chainId === currentChain.chain_id,
    GAS_LIMIT_RECOMMENDATIONS,
    refresh,
    windowOpen: (url: any, target: any) => {
      window.open(url, target);
    }
  };

  const RenderLendingComponent: React.FC<any> = ({ type, ...props }) => {
    const Component: any = DexComponentMap[type as DexType] || LendingContent;

    return (
      <Component CHAIN_LIST={[currentChain]} curChain={currentChain} wethAddress={currentDapp.wethAddress} {...props} />
    );
  };

  return (
    <StyledContainer>
      <RenderLendingComponent
        type={currentDapp.type}
        chainIdNotSupport={!componentProps.isChainSupported}
        tab={currentTab}
        curPool={currentPool}
        isHideSpinner={isHideSpinner}
        {...componentProps}
      />
    </StyledContainer>
  );
};

export default AllInOneContent;

interface Props {
  localConfig: any;
  currentDapp: any;
  currentTab: any;
  currentChain: any;
  currentPool: any;
  isHideSpinner?: boolean;
}
