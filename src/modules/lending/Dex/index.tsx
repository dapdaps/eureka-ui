import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import ChainWarningBox from '@/modules/components/ChainWarningBox';
import LendingAaveV3 from '@/modules/lending/components/AaveV3';
import LendingCardTabs from '@/modules/lending/components/CardTabs';
import LendingChains from '@/modules/lending/components/Chains';
import LendingCompoundV3 from '@/modules/lending/components/CompoundV3';
import LendingContent from '@/modules/lending/components/Content';
import LendingCreditPool from '@/modules/lending/components/CreditPool';
import LendingPools from '@/modules/lending/components/Pools';
import { StyledContainer, StyledHeader, StyledHeaderRight } from '@/modules/lending/Dex/styles';
import { useMultiState } from '@/modules/lending/hooks';
import type { DexProps, Pool, Tab } from '@/modules/lending/models';
import { TabKey } from '@/modules/lending/models';
import { DexType } from '@/modules/lending/models';

interface ILendingProps {
  chainIdNotSupport: boolean;
  toast: any;
  curPool: any;
}

interface RenderLendingComponentProps extends ILendingProps {
  type: DexType;
  tab?: string;
  refreshKey?: string;
  wethAddress?: string;
}

const DexComponentMap: Partial<Record<DexType, React.ComponentType<any>>> = {
  [DexType.CompoundV3]: LendingCompoundV3,
  [DexType.AaveV3]: LendingAaveV3,
  [DexType.CreditPool]: LendingCreditPool
};

const RenderLendingComponent: React.FC<RenderLendingComponentProps> = ({ type, refreshKey, wethAddress, ...props }) => {
  const Component: any = DexComponentMap[type] || LendingContent;

  return <Component key={refreshKey} wethAddress={wethAddress} {...props} />;
};

const LendingDex = (props: DexProps) => {
  const { CHAIN_LIST, curChain, chainId, account, dexConfig, onSwitchChain, switchingChain, isChainSupported, from } =
    props;

  const searchParams = useSearchParams();
  let defaultTab = searchParams.get('tab');

  console.log('dexConfig', dexConfig);

  console.log(
    '%cLendingDex props: %o, searchParams: %o, defaultTab: %s',
    'background: #DC0083; color: #fff;',
    props,
    searchParams,
    defaultTab
  );

  const { type, pools = [] } = dexConfig;
  if (dexConfig.defaultTab) {
    defaultTab = dexConfig.defaultTab;
  }

  if (dexConfig.defaultTab) {
    defaultTab = dexConfig.defaultTab;
  }

  const tabsArray = useMemo<Tab[]>(() => {
    if (type === DexType.BorrowAndEarn) {
      return [
        { key: TabKey.Market, label: 'Borrow', sort: 1 },
        { key: TabKey.Yours, label: 'Earn', sort: 2 }
      ];
    }
    if (dexConfig.type === DexType.Dolomite) {
      return [
        { key: TabKey.Market, label: 'Borrow', sort: 2 },
        { key: TabKey.Yours, label: 'Balances', sort: 1 }
      ];
    }
    if (dexConfig.type === DexType.InitCapital) {
      return [
        { key: TabKey.Market, label: 'Market', sort: 1 },
        { key: TabKey.Yours, label: 'Dashboard', sort: 2 }
      ];
    }
    return [
      { key: TabKey.Market, label: 'Market', sort: 1 },
      { key: TabKey.Yours, label: 'Yours', sort: 2 }
    ];
  }, [type]);

  const [state, updateState] = useMultiState<any>({
    tab: Object.values(TabKey).includes(defaultTab as TabKey) ? defaultTab : TabKey.Market,
    refreshKey: 1,
    curPool: pools[0]?.key
  });

  const handleTabChange = (tab: Tab) => {
    updateState({ tab: tab.key });
  };

  const handlePoolChange = (pool: Pool) => {
    updateState({ curPool: pool.key });
  };

  // FIXME There might be a better refresh way
  useEffect(() => {
    const timer = setTimeout(() => {
      updateState({ refreshKey: state.refreshKey + 1 });
    }, 600);

    return () => {
      clearTimeout(timer);
    };
  }, [chainId, account, state.curPool]);

  return (
    <StyledContainer style={dexConfig.theme}>
      <StyledHeader>
        {type !== DexType.CompoundV3 && type !== DexType.CreditPool && (
          <LendingCardTabs tabs={tabsArray} active={state.tab} onChange={handleTabChange} />
        )}
        {type === DexType.CreditPool && <div />}
        <StyledHeaderRight>
          {pools && pools.length > 0 && (
            <LendingPools pools={pools} curPool={state.curPool || pools[0]?.key} onSwitchPool={handlePoolChange} />
          )}
          <LendingChains chains={CHAIN_LIST} curChain={curChain} onSwitchChain={onSwitchChain} from={from} />
        </StyledHeaderRight>
      </StyledHeader>
      <RenderLendingComponent
        type={type}
        chainIdNotSupport={!isChainSupported}
        tab={state.tab}
        curPool={state.curPool || pools[0]?.key}
        {...props}
        wethAddress={dexConfig.wethAddress}
        refreshKey={state.refreshKey}
      />
      {!isChainSupported && (
        <ChainWarningBox
          chain={curChain}
          onSwitchChain={onSwitchChain}
          switchingChain={switchingChain}
          theme={dexConfig.theme?.button}
        />
      )}
    </StyledContainer>
  );
};

export default LendingDex;
