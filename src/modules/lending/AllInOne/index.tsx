import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import lendingConfig from '@/config/lending/networks';
import useAccount from '@/hooks/useAccount';
import AllInOneContent from '@/modules/lending/AllInOne/Content';
import AllInOneDapp from '@/modules/lending/AllInOne/Dapps';
import { StyledContainer } from '@/modules/lending/AllInOne/styles';
import AllInOneSwitchChain from '@/modules/lending/AllInOne/SwitchChain';
import { StyledButton } from '@/modules/lending/AllInOne/SwitchChain/styles';
import LendingCardTabs from '@/modules/lending/components/CardTabs';
import LendingPools from '@/modules/lending/components/Pools';
import { StyledHeader, StyledHeaderRight } from '@/modules/lending/Dex/styles';
import type { Pool, Tab } from '@/modules/lending/models';
import { DexType, TabKey } from '@/modules/lending/models';
import { useChainsStore } from '@/stores/chains';
import { StyledFlex } from '@/styled/styles';
import FlexTable from '@/views/AllInOne/components/FlexTable';

const AllInOneLending = (props: any) => {
  const { chain, isHideSpinner, isHideHeader, isHideSwitchChain } = props;

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

  const columns: any = [
    {
      title: 'Asset',
      dataIndex: 'asset',
      align: 'left',
      render: (text: any, record: any, index: any) => {
        return (
          <StyledFlex gap="8px" alignItems="center">
            <div className="">
              <img src={record.icon} />
            </div>
            {record.title}
          </StyledFlex>
        );
      }
    },
    {
      title: 'Total Supplied',
      dataIndex: 'totalSupplied',
      align: 'left',
      render: (text: any, record: any, index: any) => {
        return (
          <StyledFlex justifyContent="flex-start" alignItems="flex-start" flexDirection="column">
            <div className="text-[16px] text-white">{record.deposit}</div>
            <div className="text-[12px] text-[#979abe]">{record.borrowed}</div>
          </StyledFlex>
        );
      }
    },
    {
      title: 'Supply APY',
      dataIndex: 'supplyApy',
      align: 'left',
      render: (text: any, record: any, index: any) => {
        return (
          <StyledFlex justifyContent="flex-start" alignItems="flex-start" flexDirection="column">
            <div className="text-[16px] text-white">{record.depositApy}</div>
            <div className="text-[12px] text-[#979abe]">{record.borrowedApy}</div>
          </StyledFlex>
        );
      }
    },
    {
      title: 'Market Size',
      dataIndex: 'marketSize',
      align: 'left'
    }
  ];

  return (
    <RestTheme>
      {chainId === currentChain?.chain_id ? (
        <StyledContainer>
          {!isHideHeader && (
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
          )}
          {currentDapp && (
            <AllInOneContent
              key={refreshKey}
              localConfig={localConfig}
              currentChain={currentChain}
              currentDapp={currentDapp}
              currentTab={currentTab}
              currentPool={currentPool}
              isHideSpinner={isHideSpinner}
            />
          )}
        </StyledContainer>
      ) : isHideSwitchChain ? (
        <>
          <FlexTable
            columns={columns}
            list={[
              {
                icon: '/assets/tokens/default_icon.png',
                title: '--',
                deposit: '0.00',
                borrowed: '0.00',
                depositApy: '0.00%',
                borrowedApy: '0.00%',
                marketSize: '0.00'
              },
              {
                icon: '/assets/tokens/default_icon.png',
                title: '--',
                deposit: '0.00',
                borrowed: '0.00',
                depositApy: '0.00%',
                borrowedApy: '0.00%',
                marketSize: '0.00'
              }
            ]}
            rowAlign="center"
          />
          <StyledButton style={{ marginTop: 20 }}>Switch Network</StyledButton>
        </>
      ) : (
        <AllInOneSwitchChain currentChain={currentChain} />
      )}
    </RestTheme>
  );
};

export default AllInOneLending;
