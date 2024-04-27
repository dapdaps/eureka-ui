import { memo, useState, useMemo } from 'react';
import Big from 'big.js';
import Loading from '@/components/Icons/Loading';
import { useRouter } from 'next/router';
import usePools from './hooks/usePools';
import useDappConfig from '../hooks/useDappConfig';
import Button from '../components/Button';
import Empty from './components/Empty';
import Pool from './components/Pool';
import {
  StyledContainer,
  StyledHeader,
  StyledTitle,
  StyledContent,
  LoadingWrapper,
  StyledContentTop,
  StyledTogglePositions,
} from './styles';

const Pools = () => {
  const { pools, loading } = usePools();
  const { theme = {} } = useDappConfig();

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
        ) : userSelectedPositionSet.length > 0 ? (
          <>
            <StyledContentTop>
              <div>Your positions ({userSelectedPositionSet.length})</div>
              <StyledTogglePositions
                onClick={() => {
                  setUserHideClosedPositions(!userHideClosedPositions);
                }}
              >
                {userHideClosedPositions ? 'Show' : 'Hide'} closed positions
              </StyledTogglePositions>
            </StyledContentTop>
            {userSelectedPositionSet.map((position) => (
              <Pool
                key={position.tokenId}
                {...position}
                onClick={() => {
                  router.push(`/dapp/${router.query.dappRoute}/position?id=${position.tokenId}`);
                }}
              />
            ))}
          </>
        ) : (
          <Empty />
        )}
      </StyledContent>
    </StyledContainer>
  );
};

export default memo(Pools);
