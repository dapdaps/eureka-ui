// @ts-nocheck
import Big from 'big.js';
import { useEffect } from 'react';

import ChainWarningBox from '@/modules/components/ChainWarningBox';
import Spinner from '@/modules/components/Spinner';
import { useDynamicLoader, useMultiState } from '@/modules/hooks';

import Filter from '../Bridge/Filter';
import List from '../Bridge/List';
import MetavaultDetail from '../Bridge/Metavault/Detail';
import {
  Column,
  StyledVaultImage,
  SvgIcon,
  TdTxt
} from '../styles';
import type { ColunmListType } from '../types';

const IconRight = (
  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="10" viewBox="0 0 8 10" fill="none">
    <path d="M7.18407 4.21913C7.68448 4.61945 7.68448 5.38054 7.18407 5.78087L2.28485 9.70024C1.63009 10.2241 0.660156 9.75788 0.660156 8.91937L0.660156 1.08062C0.660156 0.242118 1.63009 -0.224055 2.28485 0.299756L7.18407 4.21913Z" fill="#979ABE" />
  </svg>
)
export default function MetavaultConnector(props: any) {
  const columnList: ColunmListType = [{
    width: '25%',
    key: 'pool',
    label: 'Pool',
    type: 'slot',
    render: (data) => {
      return (
        <>
          <StyledVaultImage>
            <img src={ICON_VAULT_MAP[data.token]} alt={data.token} />
          </StyledVaultImage>
          <TdTxt>{data.token}</TdTxt>
        </>
      )
    }
  }, {
    width: '15%',
    key: 'chain',
    label: 'Chain',
    type: 'slot',
    render: () => <img style={{ width: 26 }} src={curChain.logo} alt={curChain.name} />
  }, {
    width: '15%',
    key: 'myBalance',
    label: 'My Balance',
    type: 'slot',
    render: (data) => {
      return (
        <>
          <TdTxt>{data.myBalance}</TdTxt> <TdTxt>{data.token}</TdTxt>
        </>
      )
    }
  }, {
    width: '15%',
    key: 'poolBalance',
    label: 'Pool Balance',
    type: 'slot',
    render: (data) => {
      return (
        <>
          <TdTxt>{data.poolBalance}</TdTxt> <TdTxt>{data.token}</TdTxt>
        </>
      )
    }
  }, {
    width: '15%',
    key: 'apy',
    label: 'Fee APY',
    type: 'slot',
    render: () => {
      return (
        <TdTxt>-</TdTxt>
      )
    }
  }, {
    width: '15%',
    key: 'trader',
    label: 'Trader Unr. PnL',
    type: 'slot',
    render: (data, index) => {
      return (
        <>
          <TdTxt>{data.trader}</TdTxt> <TdTxt>{data.token}</TdTxt>
          <SvgIcon className={["icon-right", index === state.dataIndex ? "rotate" : ""].join(" ")}>
            {IconRight}
          </SvgIcon>
        </>
      )
    }
  }]
  const [state, updateState] = useMultiState<any>({
    allData: null,
    loading: false,
    dataList: [],
    filterList: [],
    dataIndex: -1,
    categoryIndex: 0,
    chainIndex: 0,
    token: '',
  })

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
  } = props
  const sender = account
  const {
    pairs,
    addresses,
    storeAddress,
    ICON_VAULT_MAP,
  } = dexConfig

  const [Data] = useDynamicLoader({ path: '/liquidity/Datas', name: "Metavault" });
  const formatFiat = (value) => {
    const number = Number(value).toLocaleString("en", {
      currency: "USD",
      style: "currency",
      compactDisplay: "short",
      notation: "compact",
      maximumFractionDigits: 2,
    });
    return number;
  };
  const formatPercent = (value) => {
    return `${Number(value * 100).toLocaleString("en", {
      maximumFractionDigits: 2,
    })}%`;
  };

  function handleChangeDataIndex(index) {
    state.dataIndex === index ? updateState({
      dataIndex: -1
    }) : updateState({
      dataIndex: index
    })
  }
  function handleChangeCategoryIndex(index) {
    updateState({
      categoryIndex: index
    })
  }
  function handleChangeChainIndex(index) {
    const chain = CHAIN_LIST[index]
    onSwitchChain({
      chainId: `0x${Number(chain.chain_id).toString(16)}`,
    });
  }
  function handleSearchInput(event) {
    updateState({
      token: event.target.value
    })
  }
  function refetch() {
    updateState({
      loading: true
    })
    setTimeout(() => {
      updateState({
        loading: false
      })
    }, 500)
  }

  useEffect(() => {
    if (state.dataList) {
      let filterList = []
      if (state.categoryIndex === 0) {
        filterList = state.dataList.filter(data => {
          const source = data.id.toUpperCase()
          const target = (state.token || '').toUpperCase()
          return source.indexOf(target) > -1
        })
      } else if (state.categoryIndex === 1) {
        state.dataList.forEach(data => {
          if (Big(data?.myBalance ?? 0).gt(0)) {
            filterList.push(data)
          }
        })
      }
      updateState({
        filterList
      })
    }
  }, [state.dataList, state.token, state.categoryIndex])
  return (!sender || !isChainSupported && !isDapps) ? (
    <ChainWarningBox
      chain={curChain}
      onSwitchChain={onSwitchChain}
      theme={dexConfig.theme?.button}
    />
  ) : state.loading ? (
    <Spinner />
  ) : (
    <Column>
      {Data && (
        <Data
          {...{
            pairs,
            sender,
            provider,
            addresses,
            prices,
            curChain,
            multicallAddress,
            storeAddress,
            onLoad: (data) => {
              updateState({
                dataList: data.dataList,
                loading: false
              })
            }
          }}
        />
      )
      }
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
          Detail: MetavaultDetail,
          columnList,
          storeAddress,
          dataIndex: state.dataIndex,
          defaultDex,
          onChangeDataIndex: handleChangeDataIndex,
          dataList: state.filterList,
          addresses,
          addAction,
          multicallAddress,
          ICON_VAULT_MAP,
        }}
      />
    </Column >
  )
}
