// @ts-nocheck
import { memo, useEffect } from 'react';

import ChainWarningBox from '@/modules/components/ChainWarningBox';
import Spinner from '@/modules/components/Spinner';
import { useDynamicLoader, useMultiState } from '@/modules/hooks';

import { Column, StrategyTxt, StyledDashedUndeline, StyledVaultImage, SvgIcon, TdTxt } from '../styles';
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
  const {
    account,
    toast,
    CHAIN_LIST,
    multicallAddress,
    dexConfig,
    defaultDex,
    curChain,
    isChainSupported,
    onSwitchChain,
    addAction,
    connectProps,
    prices,
    chainIdNotSupport
  } = props;
  const [Data] = useDynamicLoader({ path: '/staking/Datas', name: 'Beefy' });
  const [state, updateState] = useMultiState({
    loading: false,
    dataList: [],
    dataIndex: -1,
    chainIndex: 0,
    token: ''
  });
  const { pairs, ICON_VAULT_MAP } = dexConfig;
  const columnList = [
    {
      width: '25%',
      key: 'pool',
      label: 'VAULT',
      type: 'slot',
      render: (data) => {
        return (
          <>
            <StyledVaultImage>
              <img style={{ marginRight: -6 }} src={ICON_VAULT_MAP[data.token0]} alt={data.token0} />
              <img src={ICON_VAULT_MAP[data.token1]} alt={data.token1} />
            </StyledVaultImage>
            <TdTxt>
              {data.token0} / {data.token1}
            </TdTxt>
          </>
        );
      }
    },
    {
      width: '10%',
      key: 'chain',
      label: 'CHAIN',
      type: 'slot',
      render: () => <img style={{ width: 26 }} src={curChain.logo} alt={curChain.name} />
    },
    {
      width: '15%',
      key: 'strategy',
      label: 'STRATEGY',
      type: 'slot',
      render: (data) => {
        return <StrategyTxt>{data.strategy}</StrategyTxt>;
      }
    },
    {
      width: '15%',
      key: 'TVL',
      label: 'TVL',
      type: 'slot',
      render: (data) => {
        return (
          <div>
            <TdTxt>{formatFiat(data.beefyTVL)}</TdTxt>
            <TdTxt className="gray">{formatFiat(data.gammaTVL)}</TdTxt>
          </div>
        );
      }
    },
    {
      width: '15%',
      key: 'APY',
      label: 'APY',
      type: 'slot',
      render: (data) => {
        return (
          <StyledDashedUndeline>
            <TdTxt>{data.APY}%</TdTxt>
          </StyledDashedUndeline>
        );
      }
    },
    {
      width: '15%',
      key: 'DAILY',
      label: 'DAILY',
      type: 'slot',
      render: (data) => {
        return (
          <StyledDashedUndeline>
            <TdTxt>{data.DAILY}%</TdTxt>
          </StyledDashedUndeline>
        );
      }
    },
    {
      width: '15%',
      direction: 'column',
      key: 'liquidity',
      label: 'DEPOSITED',
      type: 'slot',
      render: (data, index) => {
        return (
          <div>
            <TdTxt>{data.deposits}</TdTxt>
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
    const index = CHAIN_LIST.findIndex((chain) => chain.id === curChain.id);

    if (index > -1) {
      updateState({
        chainIndex: index,

        dataList: [],
        userPositions: null
      });
    }
  }, [curChain]);

  return !account || !isChainSupported ? (
    <ChainWarningBox chain={curChain} onSwitchChain={onSwitchChain} theme={dexConfig.theme} />
  ) : (
    <Column>
      {Data && (
        <Data
          {...{
            ...props,
            ...dexConfig,
            update: state.loading,
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
            dataList: state.dataList,
            dataIndex: state.dataIndex,
            onChangeDataIndex: handleChangeDataIndex,
            userPositions: state.userPositions,
            columnList
          }}
        />
      )}
    </Column>
  );
});
