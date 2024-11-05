import Big from 'big.js';
import { useRouter } from 'next/router';
import { memo, useCallback, useMemo, useState } from 'react';

import Loading from '@/components/Icons/Loading';

import Button from '../components/Button';
import useDappConfig from '../hooks/useDappConfig';
import Empty from './components/Empty';
import Pool from './components/Pool';
import VersionTabs from './components/VersionTabs';
import usePools from './hooks/usePools';
import {
  LoadingWrapper,
  StyledContainer,
  StyledContent,
  StyledContentTop,
  StyledHeader,
  StyledTitle,
  StyledTogglePositions,
  StyledTopActions
} from './styles';

const Pools = (props: Props) => {
  const { onAction } = props;
  const { pools, loading } = usePools();
  const { theme = {}, poolType, hasV2 } = useDappConfig();
  const [version, setVersion] = useState('All');
  const router = useRouter();

  const [userHideClosedPositions, setUserHideClosedPositions] = useState<boolean>(false);

  const [openPositions, closedPositions] = pools?.reduce(
    (acc: any[], p: any) => {
      acc[new Big(p.liquidity || 0).eq(0) ? 1 : 0].push(p);
      return acc;
    },
    [[], []]
  ) ?? [[], []];

  const userSelectedPositionSet = useMemo(
    () => [...openPositions, ...(userHideClosedPositions ? [] : closedPositions)],
    [closedPositions, openPositions, userHideClosedPositions]
  );

  const userSelectedVersionSet = useMemo(() => {
    if (userSelectedPositionSet.length === 0) return [];
    if (version === 'All') return userSelectedPositionSet;
    return userSelectedPositionSet.filter((item) => item.poolVersion === version);
  }, [userSelectedPositionSet, version]);

  const handleAction = useCallback((type: ActionType, position?: any) => {
    // fix#DAP-862 merge the Dex and Pool page
    if (onAction) {
      onAction(type, position);
      return;
    }

    if (type === ActionType.Add) {
      router.push(`/dapp/${router.query.dappRoute}/add`);
    }
    if (type === ActionType.Position) {
      let path = '';

      if (position.poolVersion === 'V3') {
        path = `/dapp/${router.query.dappRoute}/position?id=${position.data.tokenId}`;
      } else {
        path = `/dapp/${router.query.dappRoute}/position?id=${position.poolAddress}${position.fee && '&fee=' + position.fee}`;
      }
      router.push(path);
    }
  }, []);

  return (
    <StyledContainer style={{ ...theme }}>
      <StyledHeader>
        <StyledTitle>Pools</StyledTitle>
        <Button style={{ width: '149px', height: '35px' }} onClick={() => handleAction(ActionType.Add)}>
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
                {hasV2 && (
                  <VersionTabs
                    version={version}
                    onChange={(_version: any) => {
                      setVersion(_version);
                    }}
                  />
                )}
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
              <Pool key={i} {...position} onClick={() => handleAction(ActionType.Position, position)} />
            ))}
            {userSelectedPositionSet.length === 0 && <Empty />}
          </>
        )}
      </StyledContent>
    </StyledContainer>
  );
};

export default memo(Pools);

export enum ActionType {
  Add = 'add',
  Position = 'position'
}

interface Props {
  onAction?(type: ActionType, position?: any): void;
}
