import { memo, useState, useMemo } from 'react';
import Big from 'big.js';
import Loading from '@/components/Icons/Loading';
import { useRouter } from 'next/router';
import usePools from './hooks/usePools';
import useDappConfig from '../hooks/useDappConfig';
import Button from '../components/Button';
import Empty from './components/Empty';
import Pool from './components/Pool';
import VersionTabs from './components/VersionTabs';
import {
  StyledContainer,
  StyledHeader,
  StyledTitle,
  StyledContent,
  LoadingWrapper,
  StyledContentTop,
  StyledTogglePositions,
  StyledTopActions,
} from './styles';

const Pools = () => {
  const { pools, loading } = usePools();
  const { theme = {} } = useDappConfig();
  const [version, setVersion] = useState('All');
  const router = useRouter();

  const [userHideClosedPositions, setUserHideClosedPositions] = useState<boolean>(false);

  const [openPositions, closedPositions] = pools?.reduce(
    (acc: any[], p: any) => {
      acc[new Big(p.liquidity || 0).eq(0) ? 1 : 0].push(p);
      return acc;
    },
    [[], []],
  ) ?? [[], []];

  const userSelectedPositionSet = useMemo(
    () => [...openPositions, ...(userHideClosedPositions ? [] : closedPositions)],
    [closedPositions, openPositions, userHideClosedPositions],
  );

  const userSelectedVersionSet = useMemo(() => {
    if (userSelectedPositionSet.length === 0) return [];
    if (version === 'All') return userSelectedPositionSet;
    return userSelectedPositionSet.filter((item) => item.poolVersion === version);
  }, [userSelectedPositionSet, version]);

  return (
    <StyledContainer style={{ ...theme }}>
      <StyledHeader>
        <StyledTitle>Pools</StyledTitle>
        <Button
          style={{ width: '149px', height: '35px' }}
          onClick={() => {
            router.push(`/dapp/${router.query.dappRoute}/add`);
          }}
        >
          + Create Position
        </Button>
      </StyledHeader>
      <StyledContent>
        {loading ? (
          <LoadingWrapper>
            <Loading size={30} />
          </LoadingWrapper>
        ) : (
          <>
            <StyledContentTop>
              <div>Your positions ({userSelectedPositionSet.length})</div>
              <StyledTopActions>
                <VersionTabs
                  version={version}
                  onChange={(_version: any) => {
                    setVersion(_version);
                  }}
                />
                <StyledTogglePositions
                  onClick={() => {
                    setUserHideClosedPositions(!userHideClosedPositions);
                  }}
                >
                  {userHideClosedPositions ? 'Show' : 'Hide'} closed positions
                </StyledTogglePositions>
              </StyledTopActions>
            </StyledContentTop>
            {userSelectedVersionSet.map((position, i) => (
              <Pool
                key={i}
                {...position}
                onClick={() => {
                  let path = '';

                  if (position.poolVersion === 'V3') {
                    path = `/dapp/${router.query.dappRoute}/position?id=${position.data.tokenId}`;
                  } else {
                    path = `/dapp/${router.query.dappRoute}/position?id=${position.poolAddress}&fee=${position.fee}`;
                  }
                  router.push(path);
                }}
              />
            ))}
            {userSelectedPositionSet.length === 0 && <Empty />}
          </>
        )}
      </StyledContent>
    </StyledContainer>
  );
};

export default memo(Pools);
