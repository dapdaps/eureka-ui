// @ts-nocheck
import { memo, useEffect } from 'react';
import styled from 'styled-components';

import ChainWarningBox from '@/modules/components/ChainWarningBox';
import Spinner from '@/modules/components/Spinner';
import { useDynamicLoader, useMultiState } from '@/modules/hooks';
import LendingCardTabs from '@/modules/lending/components/CardTabs';
import LendingChains from '@/modules/lending/components/Chains';

import Content from './components/Content';
const StyledContainer = styled.div`
  padding-top: 34px;
  width: 1244px;
  margin: 0 auto;
`;
const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export default memo(function Duo(props) {
  const {
    CHAIN_LIST,
    curChain,
    dexConfig,
    wethAddress,
    multicallAddress,
    multicall,
    prices,
    onSwitchChain,
    switchingChain,
    addAction,
    toast,
    chainId,
    nativeCurrency,
    account,
    provider,
    chainIdNotSupport,
    isChainSupported
  } = props;
  const { type } = dexConfig;
  const [state, updateState] = useMultiState({
    tab: 'Stake',
    chainId: -1
  });
  const [Data] = useDynamicLoader({ path: '/staking/Datas', name: 'Duo' });
  const tabsArray = [
    { key: 'Stake', label: 'Stake' },
    { key: 'Unstake', label: 'Unstake' }
  ];
  useEffect(() => {
    updateState({
      loading: !chainIdNotSupport
    });
  }, [chainIdNotSupport]);

  return (
    <StyledContainer style={dexConfig.theme}>
      <StyledHeader>
        <LendingCardTabs
          {...{
            tabs: tabsArray,
            active: state.tab,
            onChange: (tab) => {
              updateState({
                tab: tab.key
              });
            }
          }}
        />
        <LendingChains
          {...{
            chains: CHAIN_LIST,
            curChain,
            onSwitchChain,
            onChange: (tab) => {
              updateState({
                tab: tab.key
              });
            }
          }}
        />
      </StyledHeader>
      {state.loading ? (
        <Spinner />
      ) : (
        <Content
          {...{
            ...props,
            ...state,
            provider,
            onSuccess: () => {
              updateState({
                loading: true
              });
            }
          }}
        />
      )}
      {Data && (
        <Data
          {...{
            update: state.loading,
            account,
            provider,
            wethAddress,
            multicallAddress,
            multicall,
            prices,
            ...dexConfig,
            onLoad: (data) => {
              updateState({
                loading: false,
                timestamp: Date.now(),
                ...data
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
    </StyledContainer>
  );
});
