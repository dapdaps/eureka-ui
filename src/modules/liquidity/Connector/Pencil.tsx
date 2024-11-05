import Big from 'big.js';
import { memo, useEffect } from 'react';

import ChainWarningBox from '@/modules/components/ChainWarningBox';
import Spinner from '@/modules/components/Spinner';
import { useDynamicLoader, useMultiState } from '@/modules/hooks';
import { StyledFlex, StyledFont } from '@/styled/styles';
import { formatIntegerThousandsSeparator } from '@/utils/format-number';
import { formatValueDecimal } from '@/utils/formate';
import { asyncFetch } from '@/utils/http';

import Filter from '../Bridge/Filter';
import List from '../Bridge/List';
import PencilDetail from '../Bridge/Pencil/Detail';
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
export default memo(function Connector(props: any) {
  const columnList: ColunmListType = [
    {
      width: '25%',
      key: 'assets',
      label: 'Assets',
      type: 'slot',
      render: (data: any) => {
        return (
          <>
            <StyledVaultImage>
              <img src={ICON_VAULT_MAP[data?.asset]} alt={data?.asset} />
            </StyledVaultImage>
            <TdTxt>{data.symbol}</TdTxt>
          </>
        );
      }
    },
    {
      width: '25%',
      key: 'rewards',
      label: 'Rewards',
      type: 'slot',
      render: (data: any) => {
        return (
          <StyledFlex flexDirection="column" alignItems="flex-start" gap="4px">
            {data?.rewards?.map((reward: string, index: number) => (
              <StyledFont color="#FFF" key={index}>
                {reward}
              </StyledFont>
            ))}
          </StyledFlex>
        );
      }
    },
    {
      width: '25%',
      key: 'supply',
      label: 'Total Supply',
      type: 'slot',
      render: (data: any) => {
        return (
          <StyledFlex flexDirection="column" alignItems="flex-start" gap="4px">
            <StyledFont color="#FFF">{formatValueDecimal(data?.totalSupply, '', 2, true)}</StyledFont>
            <StyledFont color="#FFF">
              {formatValueDecimal(
                Big(data?.totalSupply ?? 0)
                  .times(data?.price ?? 0)
                  .toFixed(4),
                '$',
                2,
                true
              )}
            </StyledFont>
          </StyledFlex>
        );
      }
    },
    {
      width: '25%',
      key: 'balance',
      label: 'Your Balance',
      type: 'slot',
      render: (data: any, index: number) => {
        return (
          <>
            <StyledFlex flexDirection="column" alignItems="flex-start" gap="4px">
              <StyledFont color="#FFF">{formatValueDecimal(data?.balance, '', 2, false, false)}</StyledFont>
              <StyledFont color="#FFF">
                {formatValueDecimal(
                  Big(data?.balance ?? 0)
                    .times(data?.price)
                    .toFixed(),
                  '$',
                  2,
                  false,
                  false
                )}
              </StyledFont>
            </StyledFlex>
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
  const [Data] = useDynamicLoader({ path: '/liquidity/Datas', name: 'Pencil' });

  const {
    pools,
    addresses,
    ammName,
    ammImage,
    proxyAddress,
    ALL_DATA_URL,
    ICON_VAULT_MAP,
    USER_DATA_BASE,
    LAST_SNAP_SHOT_DATA_URL,
    FEE_APR_DATA_URL
  } = dexConfig;

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

  function handleStaticRefresh(timer?: any) {
    if (timer) clearTimeout(timer);
    const currentTimer = setTimeout(async () => {
      try {
        const res = await asyncFetch(ALL_DATA_URL);
        updateState({
          allData: res
        });
      } catch (error) {
        console.log('error:', error);
      }
      handleStaticRefresh(currentTimer);
    }, 7000);
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
          const source = data?.id?.toUpperCase();
          const target = (state.token || '').toUpperCase();
          return source?.indexOf(target) > -1;
        });
      } else if (state.categoryIndex === 1) {
        state.dataList.forEach((data: any) => {
          if (Big(data?.balance ?? 0).gt(0)) {
            filterList.push(data);
          }
        });
      }
      updateState({
        filterList
      });
    }
  }, [state.dataList, state.token, state.categoryIndex, state?.updater]);

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
    handleStaticRefresh();
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
            pools,
            sender,
            addresses,
            allData: state.allData,
            prices,
            curChain,
            provider,
            multicallAddress,
            LAST_SNAP_SHOT_DATA_URL,
            FEE_APR_DATA_URL,
            onLoad: (data: any) => {
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
          sender,
          prices,
          refetch,
          Detail: PencilDetail,
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
});
