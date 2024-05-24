import { useState } from 'react';
import Pools from './Pools';
import YourPositions from './YourPositions';
import usePools from './hooks/usePools';
import useYourPositions from './hooks/useYourPositions';
import useDappConfig from '../Pool/hooks/useDappConfig';
import { StyledContainer, StyledTabs, StyledTab } from './styles';

const TABS = ['All pools', 'Your position'];

const KimExchangePool = () => {
  const { tab: defaultTab } = useDappConfig();
  const [tab, setTab] = useState(defaultTab === '1' ? 'Your position' : 'All pools');
  const { pools, loading } = usePools();
  const { pools: positions, loading: positionsLoading } = useYourPositions();

  return (
    <StyledContainer>
      <StyledTabs>
        {TABS.map((_tab) => (
          <StyledTab
            key={_tab}
            $active={_tab === tab}
            onClick={() => {
              setTab(_tab);
            }}
          >
            {_tab}
            {_tab === 'Your position' && `(${positions.length})`}
          </StyledTab>
        ))}
      </StyledTabs>
      {tab === 'All pools' && <Pools pools={pools} loading={loading} />}
      {tab === 'Your position' && <YourPositions pools={positions} loading={positionsLoading} />}
    </StyledContainer>
  );
};

export default KimExchangePool;
