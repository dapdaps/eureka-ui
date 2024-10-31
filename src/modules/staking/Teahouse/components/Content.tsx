// @ts-nocheck
import Big from 'big.js';
import { orderBy, random } from 'lodash';
import { memo, useEffect, useMemo, useState } from 'react';

import ChainWarningBox from '@/modules/components/ChainWarningBox';
import Spinner from '@/modules/components/Spinner';
import { useDynamicLoader, useMultiState } from '@/modules/hooks';

import { Column, PoolPercentage, StrategyTxt, StyledDashedUndeline, StyledVaultImage, SvgIcon, TdTxt } from '../styles';
import List from './List';

const IconRight = (
  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="10" viewBox="0 0 8 10" fill="none">
    <path
      d="M7.18407 4.21913C7.68448 4.61945 7.68448 5.38054 7.18407 5.78087L2.28485 9.70024C1.63009 10.2241 0.660156 9.75788 0.660156 8.91937L0.660156 1.08062C0.660156 0.242118 1.63009 -0.224055 2.28485 0.299756L7.18407 4.21913Z"
      fill="#979ABE"
    />
  </svg>
);
export default memo(function Content(props) {
  const [Data] = useDynamicLoader({ path: '/staking/Datas', name: 'Teahouse' });
  const [state, updateState] = useMultiState({
    loading: false,
    dataList: [],
    filterDataList: [],
    dataIndex: -1,
    chainIndex: 0,
    token: ''
  });
  // AUM ｜ APR
  const [orderByKey, setOrderByKey] = useState('APR');
  // '' | asc | desc
  const [orderByDirection, setOrderByDirection] = useState('desc');

  const {
    account,
    provider,
    toast,
    CHAIN_LIST,
    multicallAddress,
    isDapps,
    dexConfig,
    defaultDex,
    curChain,
    isChainSupported,
    onSwitchChain,
    switchingChain,
    addAction,
    connectProps,
    prices,
    chainIdNotSupport,
    tab
  } = props;
  const { pairs, addresses, ICON_VAULT_MAP } = dexConfig;

  const handleOrderBy = (key: string) => {
    // toggle direction
    if (key === orderByKey) {
      if (orderByDirection === 'desc') {
        setOrderByDirection('asc');
        return;
      }
      if (orderByDirection === 'asc') {
        setOrderByDirection('');
        return;
      }
      setOrderByDirection('desc');
      return;
    }
    // toggle key
    setOrderByKey(key);
    setOrderByDirection('desc');
  };

  const columnList = [
    {
      width: '25%',
      key: 'pool',
      label: 'Pool',
      type: 'slot',
      render: (data) => {
        let _res;
        if (tab === 'LP') {
          _res = (
            <>
              <StyledVaultImage>
                <img style={{ marginRight: -6 }} src={ICON_VAULT_MAP[data.token0]} alt={data.token0} />
                <img src={ICON_VAULT_MAP[data.token1]} alt={data.token1} />
              </StyledVaultImage>
              <TdTxt>
                {data.token0} / {data.token1}
              </TdTxt>
              <PoolPercentage>{data.fee}%</PoolPercentage>
            </>
          );
        }
        if (tab === 'MANAGED')
          _res = (
            <>
              <StyledVaultImage>
                <img
                  // style={{ marginRight: -6 }}
                  src={ICON_VAULT_MAP[data.token0]}
                  alt={data.token0}
                />
              </StyledVaultImage>
              <TdTxt>{data.name}</TdTxt>
            </>
          );
        return _res;
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
      width: '15%',
      key: 'strategy',
      label: 'AMM',
      type: 'slot',
      render: (data) => {
        return <StrategyTxt>{data.strategy}</StrategyTxt>;
      }
    },
    {
      width: '15%',
      key: 'AUM',
      label: (
        <div className="flex items-center gap-[5px] cursor-pointer" onClick={() => handleOrderBy('AUM')}>
          <span>AUM</span>
          {orderByKey === 'AUM' && orderByDirection && (
            <img
              className={orderByDirection === 'desc' ? 'rotate-180' : ''}
              src="/images/icon-triangle-up.svg"
              alt=""
            />
          )}
        </div>
      ),
      type: 'slot',
      render: (data) => {
        return <TdTxt>{formatFiat(data.AUM)}</TdTxt>;
      }
    },
    {
      width: '15%',
      key: 'APR',
      label: (
        <div className="flex items-center gap-[5px] cursor-pointer" onClick={() => handleOrderBy('APR')}>
          <span>APR</span>
          {orderByKey === 'APR' && orderByDirection && (
            <img
              className={orderByDirection === 'desc' ? 'rotate-180' : ''}
              src="/images/icon-triangle-up.svg"
              alt=""
            />
          )}
        </div>
      ),
      type: 'slot',
      render: (data) => {
        return (
          <StyledDashedUndeline>
            <TdTxt>{data.APR}%</TdTxt>
          </StyledDashedUndeline>
        );
      }
    },
    {
      width: '15%',
      direction: 'column',
      key: 'liquidity',
      label: 'Your Shares',
      type: 'slot',
      render: (data, index) => {
        return (
          <div>
            <TdTxt>
              {data.token0Value > 0 || data.token1Value > 0
                ? `${Big(data.token0Value || 0)
                    .plus(data.token1Value || 0)
                    .toFixed(2)} $`
                : ''}

              {/* {Big(userBalance ?? 0).gt(0) ? `${formatFiat(userBalance)}` : "-"} */}
            </TdTxt>
            {Big(data?.shares ?? 0).gt(0) && (
              <TdTxt className="gray">{Big(data?.shares ?? 0).lt(0.01) ? '<0.01' : Big(data?.shares).toFixed(4)}</TdTxt>
            )}
            <SvgIcon className={['icon-right', index === state.dataIndex ? 'rotate' : ''].join(' ')}>
              {IconRight}
            </SvgIcon>
          </div>
        );
      }
    }
  ];
  const formatFiat = (value) => {
    const number = Number(value).toLocaleString('en', {
      currency: 'USD',
      style: 'currency',
      compactDisplay: 'short',
      notation: 'compact',
      maximumFractionDigits: 2
    });
    return number;
  };

  const formatPercent = (value) => {
    return `${Number(value * 100).toLocaleString('en', {
      maximumFractionDigits: 2
    })}%`;
  };
  function handleChangeDataIndex(index) {
    state.dataIndex === index
      ? updateState({
          dataIndex: -1
        })
      : updateState({
          dataIndex: index
        });
  }
  function handleChangeChainIndex(index) {
    const chain = CHAIN_LIST[index];
    onSwitchChain({
      chainId: `0x${Number(chain.chain_id).toString(16)}`
    });
  }
  function handleSearchInput(event) {
    updateState({
      token: event.target.value
    });
  }
  useEffect(() => {
    updateState({
      loading: !chainIdNotSupport
    });
  }, [chainIdNotSupport]);
  useEffect(() => {
    const index = CHAIN_LIST ? CHAIN_LIST?.findIndex((chain) => chain.id === curChain.id) : -1;
    if (index > -1) {
      updateState({
        chainIndex: index,

        dataList: [],
        userPositions: null
      });
    }
  }, [curChain]);
  useEffect(() => {
    updateState({
      loading: true,
      dataList: []
    });
  }, [tab]);

  useEffect(() => {
    let _filterDataList = null;
    if (tab === 'LP') {
      _filterDataList = state?.dataList;
    } else {
      _filterDataList = state?.dataList?.filter((data) => Big(data?.shares).gt(0));
    }
    if (orderByKey && orderByDirection) {
      _filterDataList = orderBy(_filterDataList, [(col: any) => Big(col[orderByKey]).toNumber()], [orderByDirection]);
    }
    updateState({
      filterDataList: _filterDataList
    });
  }, [state?.dataList, orderByKey, orderByDirection]);

  return !account || (!isChainSupported && !isDapps) ? (
    <ChainWarningBox
      chain={curChain}
      onSwitchChain={onSwitchChain}
      switchingChain={switchingChain}
      theme={dexConfig.theme}
    />
  ) : (
    <Column>
      {state.loading && Data && (
        <Data
          {...{
            ...props,
            ...dexConfig,
            provider,
            onLoad: (data) => {
              updateState({
                dataList: data.dataList,
                loading: false
              });
            }
          }}
        />
      )}
      {state.loading ? (
        <Spinner />
      ) : (
        <List
          {...{
            ...props,
            ...dexConfig,
            provider,
            dataList: state.filterDataList,
            dataIndex: state.dataIndex,
            onChangeDataIndex: handleChangeDataIndex,
            userPositions: state.userPositions,
            columnList,
            onSuccess: () => {
              updateState({
                loading: true
              });
            }
          }}
        />
      )}
    </Column>
  );
});
