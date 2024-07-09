import { useMemo } from 'react';
import Pools from './Pools';
import YourPositions from './YourPositions';
import usePools from './hooks/usePools';
import useYourPositions from './hooks/useYourPositions';
import useDappConfig from '../Pool/hooks/useDappConfig';
import { useRouter } from 'next/router';
import { usePathname, useSearchParams } from 'next/navigation';
import { StyledContainer, StyledTabs, StyledTab } from './styles';

const TABS = ['All pools', 'Your position'];

const KimExchangePool = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { tab: defaultTab, currentChain, theme } = useDappConfig();
  const { pools, loading } = usePools();
  const { pools: positions, loading: positionsLoading } = useYourPositions();

  const tab = useMemo(() => {
    if (!defaultTab) return 'All pools';
    if (defaultTab === 'positions') return `Your position`;
    return 'All pools';
  }, [defaultTab]);

  return (
    <StyledContainer style={{ ...theme }}>
      <StyledTabs>
        {TABS.map((_tab) => (
          <StyledTab
            key={_tab}
            $active={_tab === tab}
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set('tab', _tab === 'All pools' ? 'pools' : 'positions');
              router.replace(`${pathname}${!params.toString() ? '' : '?' + params.toString()}`, undefined, {
                scroll: false,
              });
            }}
          >
            {_tab}
            {_tab === 'Your position' && `(${positions.length})`}
          </StyledTab>
        ))}
      </StyledTabs>
      {tab === 'All pools' && <Pools pools={pools} loading={loading} />}
      {tab === 'Your position' && (
        <YourPositions pools={positions} loading={positionsLoading} currentChain={currentChain} />
      )}
    </StyledContainer>
  );
};

export default KimExchangePool;
