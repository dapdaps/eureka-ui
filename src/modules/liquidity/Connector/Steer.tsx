// @ts-nocheck
import Big from 'big.js';
import dynamic from 'next/dynamic';
import { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import useSteer from '@/hooks/useSteer';
import ChainWarningBox from '@/modules/components/ChainWarningBox';
import Spinner from '@/modules/components/Spinner';
import { useDynamicLoader, useMultiState } from '@/modules/hooks';
import { asyncFetch } from '@/utils/http';

import Filter from '../Bridge/Filter';
import List from '../Bridge/List';
import SteerDetail from '../Bridge/Steer/Detail';
import { Column, PoolPercentage, StrategyTxt, StyledDashedUndeline, StyledVaultImage, SvgIcon, TdTxt } from '../styles';
import type { ColunmListType } from '../types';

// import Contracts from "@steerprotocol/contracts/deployments/metis.json"

const UnKnownSvgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  overflow: hidden;
  svg {
    min-width: 24px;
    min-height: 24px;
  }
`;
const IconRight = (
  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="10" viewBox="0 0 8 10" fill="none">
    <path
      d="M7.18407 4.21913C7.68448 4.61945 7.68448 5.38054 7.18407 5.78087L2.28485 9.70024C1.63009 10.2241 0.660156 9.75788 0.660156 8.91937L0.660156 1.08062C0.660156 0.242118 1.63009 -0.224055 2.28485 0.299756L7.18407 4.21913Z"
      fill="#979ABE"
    />
  </svg>
);
const UnKnownSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <path d="M12 17h.01"></path>
  </svg>
);
export default function Connector(props: any) {
  const columnList: ColunmListType = [
    {
      width: '25%',
      key: 'pool',
      label: 'Pool',
      type: 'slot',
      render: (data: any) => {
        return (
          <>
            <StyledVaultImage>
              {ICON_VAULT_MAP[data.token0] ? (
                <img style={{ marginRight: -6 }} src={ICON_VAULT_MAP[data.token0]} alt={data.token0} />
              ) : (
                <UnKnownSvgContainer style={{ marginRight: -6 }}>{UnKnownSvg}</UnKnownSvgContainer>
              )}
              {ICON_VAULT_MAP[data.token1] ? (
                <img src={ICON_VAULT_MAP[data.token1]} alt={data.token1} />
              ) : (
                <UnKnownSvgContainer style={{ marginRight: -6 }}>{UnKnownSvg}</UnKnownSvgContainer>
              )}
            </StyledVaultImage>
            <TdTxt>
              {data.token0} / {data.token1}
            </TdTxt>
            <PoolPercentage>{data.fee}%</PoolPercentage>
          </>
        );
      }
    },
    {
      width: '10%',
      key: 'chain',
      label: 'Chain',
      type: 'slot',
      render: () => <img style={{ width: 26 }} src={curChain.logo} alt={curChain.name} />
    },
    {
      width: '20%',
      key: 'amm',
      label: 'AMM',
      type: 'slot',
      render: () => {
        return (
          <>
            <img src={ammImage} alt={ammName} style={{ width: 22 }} />
            <TdTxt>{ammName}</TdTxt>
          </>
        );
      }
    },
    {
      width: '10%',
      key: 'strategy',
      label: 'Strategy',
      type: 'slot',
      render: (data: any) => {
        return <StrategyTxt>{data.strategy2 ? data.strategy2 : data.strategy}</StrategyTxt>;
      }
    },
    {
      width: '10%',
      key: 'tvlUSD',
      label: 'TVL',
      type: 'slot',
      render: (data: any) => {
        return <TdTxt>{formatFiat(data.tvlUSD)}</TdTxt>;
      }
    },
    {
      width: '10%',
      key: 'Fee APR',
      label: 'Fee APR',
      type: 'slot',
      render: (data: any) => {
        return (
          <StyledDashedUndeline>
            <TdTxt>{data?.feeApr}</TdTxt>
          </StyledDashedUndeline>
        );
      }
    },
    {
      width: '15%',
      direction: 'column',
      key: 'liquidity',
      label: 'Your Liquidity',
      type: 'slot',
      render: (data: any, index: number) => {
        return (
          <>
            <TdTxt>
              {Big(data?.liquidity ?? 0).gt(0)
                ? `${Big(data?.liquidity ?? 0).lt(0.01) ? '<$0.01' : formatFiat(data.liquidity)}`
                : '-'}
            </TdTxt>
            {Big(data?.balance ?? 0).gt(0) && (
              <TdTxt className="gray">
                {Big(data?.balance ?? 0).lt(0.01) ? '<0.01' : Big(data.balance).toFixed(2)} LP
              </TdTxt>
            )}
            <SvgIcon className={['icon-right', index === state.dataIndex ? 'rotate' : ''].join(' ')}>
              {IconRight}
            </SvgIcon>
          </>
        );
      }
    }
  ];

  const [state, updateState] = useMultiState<any>({
    allData: null,
    loading: false,
    dataList: [],
    filterList: [],
    dataIndex: -1,
    categoryIndex: 0,
    chainIndex: 0,
    token: '',
    updater: 0
  });
  const {
    from,
    toast,
    prices,
    account,
    provider,
    markets,
    isDapps,
    curChain,
    dexConfig,
    defaultDex,
    CHAIN_LIST,
    addAction,
    currentMarket,
    multicallAddress,
    isChainSupported,
    onSwitchChain,
    onChangeMarket
  } = props;

  const sender = account;
  const [Data] = useDynamicLoader({ path: '/liquidity/Datas', name: 'Steer' });
  const formatFiat = (value: string) => {
    const number = Number(value).toLocaleString('en', {
      currency: 'USD',
      style: 'currency',
      compactDisplay: 'short',
      notation: 'compact',
      maximumFractionDigits: 2
    });
    return number;
  };

  const formatPercent = (value: any) => {
    return `${Number(value * 100).toLocaleString('en', {
      maximumFractionDigits: 2
    })}%`;
  };
  const {
    pairs,
    addresses,
    ammName,
    ammImage,
    proxyAddress,
    ALL_DATA_URL,
    FEE_APR_URL,
    ICON_VAULT_MAP,
    LAST_SNAP_SHOT_DATA_URL
  } = dexConfig;

  const { dataList, contracts, loading: loadingMore } = useSteer(ammName);

  async function fetchAllData() {
    updateState({
      loading: true
    });
    const query = `{
      vaults(first: 500){
        id
        name
        token0
        token1
        pool
        weeklyFeeAPR
        token0Symbol
        token0Decimals
        token0Balance
        token1Balance
        totalValueLockedToken0
        totalValueLockedToken1
        feeTier
        strategyToken {
          id
          name
          creator
          admin
          executionBundle
        }
        beaconName
        payloadIpfs
        deployer
      }
    }`;
    console.log('====ALL_DATA_URL', ALL_DATA_URL);
    asyncFetch(ALL_DATA_URL, {
      method: 'POST',
      body: JSON.stringify({
        query,
        variables: {}
      })
    }).then((res) => {
      updateState({
        allData: res?.data?.vaults ?? [],
        loading: false
      });
    });
  }

  function handleChangeDataIndex(index: number) {
    state.dataIndex === index
      ? updateState({
          dataIndex: -1
        })
      : updateState({
          dataIndex: index
        });
  }
  function handleChangeCategoryIndex(index: number) {
    updateState({
      categoryIndex: index
    });
    refetch();
  }
  function handleChangeChainIndex(index: number) {
    const chain = CHAIN_LIST[index];
    onSwitchChain({
      chainId: `0x${Number(chain.chain_id).toString(16)}`
    });
  }
  function handleSearchInput(event: any) {
    updateState({
      token: event.target.value
    });
  }
  function refetch() {
    fetchAllData();
  }

  useEffect(() => {
    if (state.dataList || dataList) {
      let filterList = [];
      const _dataList = [...(state?.dataList || []), ...(dataList || [])];
      if (state.categoryIndex === 0) {
        filterList = _dataList.filter((data) => {
          const source = data?.id?.toUpperCase();
          const target = (state.token || '').toUpperCase();
          return source?.indexOf(target) > -1;
        });
      } else if (state.categoryIndex === 1) {
        _dataList.forEach((data) => {
          if (Big(data?.liquidity ?? 0).gt(0)) {
            filterList.push(data);
          }
        });
      }

      updateState({
        filterList
      });
    }
  }, [state.dataList, state.token, dataList, state.categoryIndex, state?.updater]);

  useEffect(() => {
    const index = CHAIN_LIST ? CHAIN_LIST?.findIndex((chain) => chain.id === curChain.id) : -1;
    if (index > -1) {
      updateState({
        chainIndex: index,
        allData: null,
        dataList: [],
        categoryIndex: 0,
        userPositions: null
      });
    }
    if (curChain) {
      fetchAllData();
    }
  }, [curChain]);

  useEffect(() => {
    console.log('====loadingMore', loadingMore);
  }, [loadingMore]);

  return !sender || (!isChainSupported && !isDapps) ? (
    <ChainWarningBox chain={curChain} onSwitchChain={onSwitchChain} theme={dexConfig.theme?.button} />
  ) : state.loading ? (
    <Spinner />
  ) : (
    <Column>
      {state.allData && Data && (
        <Data
          {...{
            pairs,
            sender,
            provider,
            addresses,
            allData: state.allData,
            prices,
            curChain,
            FEE_APR_URL,
            multicallAddress,
            onLoad: (data) => {
              updateState({
                dataList: data.dataList,
                loading: false,
                updater: new Date().getTime()
              });
            }
          }}
        />
      )}
      <Filter
        {...{
          from,
          isDapps,
          markets,
          currentMarket,
          token: state.token,
          chains: CHAIN_LIST,
          categoryIndex: state.categoryIndex,
          chainIndex: state.chainIndex,
          onSearchInput: handleSearchInput,
          onChangeCategoryIndex: handleChangeCategoryIndex,
          onChangeChainIndex: handleChangeChainIndex,
          onChangeMarket
        }}
      />
      <List
        {...{
          from,
          toast,
          prices,
          refetch,
          curChain,
          loadingMore,
          Detail: SteerDetail,
          columnList,
          userPositions: state.userPositions,
          dataIndex: state.dataIndex,
          defaultDex,
          onChangeDataIndex: handleChangeDataIndex,
          dataList: state.filterList,
          contracts,
          addresses,
          addAction,
          proxyAddress,
          multicallAddress,
          ICON_VAULT_MAP
        }}
      />
    </Column>
  );
}
