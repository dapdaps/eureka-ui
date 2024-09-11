import { useEffect, useMemo } from 'react';

import useToast from '@/hooks/useToast';
import ChainWarningBox from '@/modules/components/ChainWarningBox';
import LendingCardTabs from '@/modules/lending/components/CardTabs';
import LendingChains from '@/modules/lending/components/Chains';
import LendingCompoundV3 from '@/modules/lending/components/CompoundV3';
import LendingContent from '@/modules/lending/components/Content';
import LendingPools from '@/modules/lending/components/Pools';
import { StyledContainer, StyledHeader, StyledHeaderRight } from '@/modules/lending/Dex/styles';
import { useMultiState } from '@/modules/lending/hooks';
import type { DexProps, Pool, Tab } from '@/modules/lending/models';
import { TabKey } from '@/modules/lending/models';
import { DexType } from '@/modules/lending/models';

const LendingDex = (props: DexProps) => {
  const {
    CHAIN_LIST,
    curChain,
    chainId,
    account,
    dexConfig,
    onSwitchChain,
    switchingChain,
    isChainSupported,
    from,
  } = props;

  console.log('%cLendingDex props: %o', 'background: #DC0083; color: #fff;', props);

  const toast = useToast();

  const { type, pools = [] } = dexConfig;

  const tabsArray = useMemo<Tab[]>(() => {
    if (type === DexType.BorrowAndEarn) {
      return [
        { key: TabKey.Market, label: 'Borrow' },
        { key: TabKey.Yours, label: 'Earn' },
      ];
    }
    return [
      { key: TabKey.Market, label: 'Market' },
      { key: TabKey.Yours, label: 'Yours' },
    ];
  }, [type]);

  const [state, updateState] = useMultiState<any>({
    tab: TabKey.Market,
    refreshKey: 1,
    curPool: pools[0]?.key,
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
        <LendingCardTabs
          tabs={tabsArray}
          active={state.tab}
          onChange={handleTabChange}
        />
        <StyledHeaderRight>
          {
            pools && pools.length > 0 && (
              <LendingPools
                pools={pools}
                curPool={state.curPool}
                onSwitchPool={handlePoolChange}
              />
            )
          }
          <LendingChains
            chains={CHAIN_LIST}
            curChain={curChain}
            onSwitchChain={onSwitchChain}
            from={from}
          />
        </StyledHeaderRight>
      </StyledHeader>
      {type === DexType.CompoundV3 && (
        <LendingCompoundV3
          key={state.refreshKey}
          {...props}
          chainIdNotSupport={!isChainSupported}
          toast={toast}
          curPool={state.curPool}
        />
      )}
      {
        ![DexType.CompoundV3].includes(type) && (
          <LendingContent
            key={state.refreshKey}
            {...props}
            chainIdNotSupport={!isChainSupported}
            tab={state.tab}
            toast={toast}
            curPool={state.curPool}
          />
        )
      }
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
