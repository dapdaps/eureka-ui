// @ts-nocheck
import { memo, useEffect } from 'react';

import ChainWarningBox from '@/modules/components/ChainWarningBox';
import Spinner from '@/modules/components/Spinner';
import { useMultiState } from '@/modules/hooks';

import Assets from './components/Assets';
import Pool from './components/Pool';
import Search from './components/Search';
import StakeOrWithdraw from './components/StakeOrWithdraw';
import { useHandler, usePoolData, useUserData } from './hooks';
import { GridContainer, GridItem, PoolItem, TabsList, Wrapper } from './styles';
export default memo(function Hyperlock(props) {
  const [state, updateState] = useMultiState({
    currentTab: 'TAB_POOL',
    loading: false,
    pools: null,
    poolsList: []
  });

  const { isChainSupported, account, provider, chainId, dexConfig, curChain, onSwitchChain, switchingChain, toast } =
    props;

  useHandler({
    ...props,
    onLoad: (fn) => {
      updateState({
        handler: fn
      });
    }
  });
  usePoolData({
    ...props,
    update: state.loading,
    onLoad: (data) => {
      updateState({
        loading: false,
        ...data
      });
    }
  });
  useUserData({
    ...props,
    update: state.userDataUpdater,
    pools: state.pools,
    tokenIds: state.tokenIds,
    onLoad: (data) => {
      updateState({
        ...data
      });
    }
  });

  useEffect(() => {
    if (isChainSupported) {
      updateState({
        loading: true
      });
    }
  }, [isChainSupported]);

  useEffect(() => {
    if (state.tokenIds !== undefined) {
      updateState({
        userDataUpdater: Date.now()
      });
    }
  }, [state.tokenIds]);

  return (
    <Wrapper style={{ ...(dexConfig.theme || {}) }}>
      <div style={{ position: 'relative', margin: '0 auto', width: '1244px' }}>
        <TabsList>
          {[
            { key: 'TAB_POOL', label: 'All Pools' },
            { key: 'TAB_ASSETS', label: 'Your Assets' }
          ].map((item) => (
            <div
              key={item.key}
              className={`tab-head-item ${state.currentTab === item.key ? 'active' : ''}`}
              onClick={() => {
                if (item.key === 'TAB_ASSETS' && state.getV3Fees) {
                  state.getV3Fees(state.staked);
                }
                updateState({
                  currentTab: item.key
                });
              }}
            >
              {item.label}
            </div>
          ))}
        </TabsList>
        <Search
          {...{
            disabled: state.loading && !state.poolsList.length,
            onChange: (val) => {
              updateState({
                list: val
                  ? state.poolsList.filter((item) => {
                      if (!val) return true;
                      return item.name.toLowerCase().includes(val.toLowerCase());
                    })
                  : state.poolsList
              });
            }
          }}
        />
      </div>
      {state.currentTab === 'TAB_POOL' && (
        <>
          <GridContainer className="grid-pool-head">
            <GridItem>Pool</GridItem>
            <GridItem>LP Type</GridItem>
            <GridItem>Point Stack</GridItem>
            <GridItem>TVL</GridItem>
          </GridContainer>
          {state.loading && <Spinner />}
          {(state.list || state.poolsList).map((item) => {
            return (
              <PoolItem key={item.id}>
                <Pool
                  {...{
                    ...props,
                    data: item,
                    stakedTokens: state.stakedMap?.[item.id] || [],
                    unStakedTokens: state.unstakedMap?.[item.id] || [],
                    handler: state.handler,
                    dappLink: dexConfig.dappLink,
                    onSuccess: () => {
                      updateState({
                        loading: true,
                        userDataUpdater: Date.now()
                      });
                    },
                    onOpenStakeModal: (data) => {
                      updateState({
                        modelData: data
                      });
                    }
                  }}
                />
              </PoolItem>
            );
          })}
        </>
      )}
      {state.currentTab === 'TAB_ASSETS' && (
        <Assets
          {...{
            unstaked: state.unstaked,
            staked: state.staked || [],
            fees: state.fees,
            handler: state.handler,
            pools: state.pools || {},
            dappLink: dexConfig.dappLink,
            onOpenStakeModal: (data) => {
              updateState({
                modelData: data
              });
            },
            onSuccess: () => {
              updateState({
                userDataUpdater: Date.now()
              });
            }
          }}
        />
      )}
      {state.modelData && (
        <StakeOrWithdraw
          {...{
            ...state.modelData,
            dexConfig,
            account,
            toast,
            handler: state.handler,
            onSuccess: () => {
              updateState({
                userDataUpdater: Date.now()
              });
            },
            onClose: () => {
              updateState({
                modelData: {
                  display: false
                }
              });
            }
          }}
        />
      )}
      {!isChainSupported && (
        <ChainWarningBox
          chain={curChain}
          onSwitchChain={onSwitchChain}
          switchingChain={switchingChain}
          theme={dexConfig.theme}
        />
      )}
    </Wrapper>
  );
});
