import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import lendingConfig from '@/config/lending/networks';
import useAccount from '@/hooks/useAccount';
import AllInOneContent from '@/modules/lending/AllInOne/Content';
import AllInOneDapp from '@/modules/lending/AllInOne/Dapps';
import { StyledContainer } from '@/modules/lending/AllInOne/styles';
import AllInOneSwitchChain from '@/modules/lending/AllInOne/SwitchChain';
import LendingCardTabs from '@/modules/lending/components/CardTabs';
import LendingPools from '@/modules/lending/components/Pools';
import { StyledHeader, StyledHeaderRight } from '@/modules/lending/Dex/styles';
import type { Pool, Tab } from '@/modules/lending/models';
import { DexType, TabKey } from '@/modules/lending/models';
import { useChainsStore } from '@/stores/chains';

const AllInOneLending = (props: any) => {
  const { chain } = props;

  const chains = useChainsStore((store: any) => store.chains);
  const { chainId } = useAccount();

  const [localConfig, setLocalConfig] = useState<any>({ dapps: {} });
  const [currentDapp, setCurrentDapp] = useState<any>();
  const [refreshKey, setRefreshKey] = useState<number>(1);
  const [currentTab, setCurrentTab] = useState<TabKey>(TabKey.Market);
  const [currentPool, setCurrentPool] = useState<any>();

  const tabsArray = useMemo<Tab[]>(() => {
    if (currentDapp?.type === DexType.BorrowAndEarn) {
      return [
        { key: TabKey.Market, label: 'Borrow' },
        { key: TabKey.Yours, label: 'Earn' }
      ];
    }
    return [
      { key: TabKey.Market, label: 'Market' },
      { key: TabKey.Yours, label: 'Yours' }
    ];
  }, [currentDapp]);

  const RestTheme = chain.menuConfig.Lending?.Theme ?? styled.div``;
  const currentChain = chains.find((c: any) => c.chain_id === localConfig.chainId);

  const handleTabChange = (tab: Tab) => {
    setCurrentTab(tab.key);
  };

  const handleCurrentDapp = (dapp: any) => {
    setCurrentDapp(dapp);
    setRefreshKey(refreshKey + 1);
    dapp.pools && setCurrentPool(dapp.pools[0]?.key);
  };

  const handlePoolChange = (pool: Pool) => {
    setCurrentPool(pool.key);
  };

  useEffect(() => {
    const _tabConfig = lendingConfig[chain?.chainId];
    setLocalConfig(_tabConfig);
    const { dapps, defaultDapp } = _tabConfig;
    setCurrentDapp(dapps[defaultDapp]);
    dapps[defaultDapp].pools && setCurrentPool(dapps[defaultDapp].pools[0]?.key);
  }, [chain]);

  return (
    <RestTheme>
      {chainId === currentChain?.chain_id ? (
        <StyledContainer>
          <StyledHeader>
            <LendingCardTabs tabs={tabsArray} active={currentTab} onChange={handleTabChange} />
            <StyledHeaderRight style={{ gap: 10 }}>
              {currentDapp?.pools && currentDapp.pools.length > 0 && (
                <LendingPools pools={currentDapp.pools} curPool={currentPool} onSwitchPool={handlePoolChange} />
              )}
              <AllInOneDapp
                currentDapp={currentDapp}
                onCurrentDapp={handleCurrentDapp}
                list={Object.values(localConfig.dapps) || []}
              />
            </StyledHeaderRight>
          </StyledHeader>
          {currentDapp && (
            <AllInOneContent
              key={refreshKey}
              localConfig={localConfig}
              currentChain={currentChain}
              currentDapp={currentDapp}
              currentTab={currentTab}
              currentPool={currentPool}
            />
          )}
        </StyledContainer>
      ) : (
        <AllInOneSwitchChain currentChain={currentChain} />
      )}
    </RestTheme>
  );
};

export default AllInOneLending;
