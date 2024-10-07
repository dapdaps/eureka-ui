// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo, useEffect } from 'react';
import styled from 'styled-components';

import ChainWarningBox from '@/modules/components/ChainWarningBox';
import Spinner from '@/modules/components/Spinner';
import { useDynamicLoader, useMultiState } from '@/modules/hooks';
import { formatValueDecimal } from '@/utils/formate';
import { asyncFetch } from '@/utils/http';

import Filter from '../Bridge/Filter';
import InfraredDetail from '../Bridge/Infrared/Detail';
import List from '../Bridge/List';
import { Column, StyledFlex, TdTxt } from '../styles';
import type { ColunmListType } from '../types';

const StyledImageList = styled.div`
  position: relative;
  display: flex;
  width: 40px;
  height: 40px;
  &:after {
    content: '';
    position: absolute;
    left: 19px;
    width: 2px;
    height: 100%;
    background-color: #000;
  }
`;
const StyledImageContainer = styled.div`
  position: relative;
  flex: 1;
  height: 100%;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    object-position: right;
    object-fit: cover;
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
export default memo(function Connector(props: any) {
  const columnList: ColunmListType = [
    {
      width: '10%',
      key: 'protocol',
      label: 'Protocol',
      type: 'slot',
      render: (data: any) => {
        return (
          <img
            style={{ width: 26 }}
            src={`/images/infrared/${data?.initialData?.pool?.protocol === 'BEX' ? 'bex' : 'berps'}.svg`}
          />
        );
      }
    },
    {
      width: '30%',
      key: 'pool',
      label: 'Pool',
      type: 'slot',
      render: (data) => {
        // const array = data?.id.split("-")
        console.log('===token0', data?.token0, '===token1', data?.token1);
        return (
          <StyledFlex gap="8px">
            <StyledImageList>
              {data?.token0 && (
                <StyledImageContainer>
                  <img
                    src={`/images/infrared/${data?.token0.toLocaleLowerCase()}.svg`}
                    style={{ objectPosition: 'left' }}
                  />
                </StyledImageContainer>
              )}
              {data?.token1 && (
                <StyledImageContainer>
                  <img src={`/images/infrared/${data?.token1.toLocaleLowerCase()}.svg`} />
                </StyledImageContainer>
              )}
            </StyledImageList>
            <TdTxt>{data?.initialData?.pool?.name}</TdTxt>
          </StyledFlex>
        );
      }
    },
    {
      width: '30%',
      key: 'apy',
      label: 'iBGT APY',
      type: 'slot',
      render: (data) => {
        return <TdTxt>{Big(data?.initialData?.apy_percentage ?? 0).toFixed(2)}%</TdTxt>;
      }
    },
    {
      width: '30%',
      key: 'tvl',
      label: 'TVL',
      type: 'slot',
      render: (data) => {
        const initialData = data?.initialData;
        return (
          <TdTxt>
            {formatValueDecimal(
              Big(ethers.utils.formatUnits(initialData?.current_staked_amount))
                .times(initialData?.stake_token?.price ?? 0)
                .toFixed(2),
              '$',
              2,
              true
            )}
          </TdTxt>
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
  const [Data] = useDynamicLoader({ path: '/liquidity/Datas', name: 'Infrared' });
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
  const { pairs, addresses, ammName, ammImage, proxyAddress, ALL_DATA_URL, BHONEY_ADDRESS, ICON_VAULT_MAP } = dexConfig;
  function fetchAllData() {
    updateState({
      loading: true
    });
    asyncFetch(ALL_DATA_URL).then((res) => {
      updateState({
        allData: res,
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
      } else if (state.categoryIndex === 1) {
        state.dataList.forEach((data: any) => {
          if (Big(data?.liquidity ?? 0).gt(0)) {
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
    if (isDapps) {
      fetchAllData();
    } else {
      const index = CHAIN_LIST?.findIndex((chain: any) => chain.id === curChain.id) ?? -1;
      if (index > -1) {
        updateState({
          chainIndex: index,
          allData: null,
          dataList: [],
          categoryIndex: 0,
          userPositions: null
        });
        fetchAllData();
      }
    }
  }, [curChain]);
  return !sender || !isChainSupported ? (
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
            onLoad: (data: any) => {
              console.log('====data====', data);
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
          Detail: InfraredDetail,
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
          ICON_VAULT_MAP,
          BHONEY_ADDRESS
        }}
      />
    </Column>
  );
});
