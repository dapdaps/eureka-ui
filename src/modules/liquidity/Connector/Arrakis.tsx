// @ts-nocheck
import Big from 'big.js';
import { useEffect } from 'react';

import ChainWarningBox from '@/modules/components/ChainWarningBox';
import Spinner from '@/modules/components/Spinner';
import { useDynamicLoader, useMultiState } from '@/modules/hooks';
import { asyncFetch } from '@/utils/http';

import ArrakisDetail from '../Bridge/Arrakis/Detail';
import Filter from '../Bridge/Filter';
import List from '../Bridge/List';
import { Column, PoolPercentage, StrategyTxt, StyledDashedUndeline, StyledVaultImage, SvgIcon, TdTxt } from '../styles';
import type { ColunmListType } from '../types';

const IconRight = (
  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="10" viewBox="0 0 8 10" fill="none">
    <path
      d="M7.18407 4.21913C7.68448 4.61945 7.68448 5.38054 7.18407 5.78087L2.28485 9.70024C1.63009 10.2241 0.660156 9.75788 0.660156 8.91937L0.660156 1.08062C0.660156 0.242118 1.63009 -0.224055 2.28485 0.299756L7.18407 4.21913Z"
      fill="#979ABE"
    />
  </svg>
);
export default function ArrakisConnector(props: any) {
  const columnList: ColunmListType = [
    {
      width: '40%',
      key: 'pool',
      label: 'Pool',
      type: 'slot',
      render: (data: any) => {
        return (
          <>
            <StyledVaultImage>
              <img style={{ marginRight: -6 }} src={ICON_VAULT_MAP[data.token0]} alt={data.token0} />
              <img src={ICON_VAULT_MAP[data.token1]} alt={data.token1} />
            </StyledVaultImage>
            <TdTxt>
              {data.token0} / {data.token1}
            </TdTxt>
            <PoolPercentage>{data?.initialData?.feeTier}%</PoolPercentage>
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
      width: '15%',
      key: 'Fee APR',
      label: 'Fee APR',
      type: 'slot',
      render: (data: any) => {
        return (
          <StyledDashedUndeline>
            <TdTxt>{data.feeApr}</TdTxt>
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
    token: ''
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
  const [Data] = useDynamicLoader({ path: '/liquidity/Datas', name: 'Arrakis' });
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
  const { pairs, addresses, proxyAddress, ALL_DATA_URL, ICON_VAULT_MAP, USER_DATA_BASE, LAST_SNAP_SHOT_DATA_URL } =
    dexConfig;
  function fetchAllData() {
    updateState({
      loading: true
    });

    asyncFetch(ALL_DATA_URL).then((res) => {
      updateState({
        allData: res?.vaults ?? [],
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
    if (state.dataList) {
      let filterList = [];
      if (state.categoryIndex === 0) {
        filterList = state.dataList.filter((data: any) => {
          const source = data.id.toUpperCase();
          const target = (state.token || '').toUpperCase();
          return source.indexOf(target) > -1;
        });
      } else if (state.categoryIndex === 1 && state.userPositions) {
        state.dataList.forEach((data: any) => {
          if (Big(data?.liquidity ?? 0).gt(0) && state.userPositions && addresses[data.id] in state.userPositions) {
            filterList.push(data);
          }
        });
      }
      updateState({
        filterList
      });
    }
  }, [state.dataList, state.token, state.categoryIndex]);

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
            addresses,
            allData: state.allData,
            prices,
            curChain,
            provider,
            multicallAddress,
            LAST_SNAP_SHOT_DATA_URL,
            onLoad: (data: any) => {
              updateState({
                dataList: data.dataList,
                loading: false
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
          Detail: ArrakisDetail,
          columnList,
          userPositions: state.userPositions,
          dataIndex: state.dataIndex,
          defaultDex,
          onChangeDataIndex: handleChangeDataIndex,
          dataList: state.filterList,
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
