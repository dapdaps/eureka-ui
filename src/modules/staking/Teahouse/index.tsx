// @ts-nocheck
import { memo } from 'react';
import styled from 'styled-components';

import { useMultiState } from '@/modules/hooks';
import LendingCardTabs from '@/modules/lending/components/CardTabs';
import LendingChains from '@/modules/lending/components/Chains';
import Markets from '@/modules/liquidity/Bridge/Markets';

import Content from './components/Content';

const StyledContainer = styled.div`
  width: 100%;
`;
const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export default memo(function Teahouse(props) {
  const { isDapps, dexConfig, CHAIN_LIST, curChain, onSwitchChain, markets, currentMarket, onChangeMarket } = props;
  const tabsArray = [
    { key: 'LP', label: 'LP' },
    { key: 'MANAGED', label: 'Managed' }
  ];
  const [state, updateState] = useMultiState({
    tab: 'LP'
  });
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
        {isDapps ? (
          <Markets
            {...{
              markets,
              currentMarket,
              onChangeMarket
            }}
          />
        ) : (
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
        )}
      </StyledHeader>
      <Content
        {...{
          ...props,
          isDapps,
          tab: state.tab
        }}
      />
    </StyledContainer>
  );
});
