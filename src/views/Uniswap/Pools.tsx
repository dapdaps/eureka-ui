import { useRouter } from 'next/router';
import { memo, useState, useMemo } from 'react';
import styled from 'styled-components';
import Loading from '@/components/Icons/Loading';
import Big from 'big.js';
import Panel from './components/Panel';
import PositionItem from './components/PositionItem';
import usePositions from './hooks/usePositions';

const StyledContainer = styled.div`
  width: 854px;
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
`;
const Label = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #fff;
`;
const PositionButton = styled.button`
  width: 120px;
  height: 35px;
  border-radius: 12px;
  border: none;
  background-color: #5ee0ff;
  font-size: 14px;
  font-weight: 600;
  color: #1b1b1b;
`;
const StyledPanel = styled(Panel)`
  height: 300px;
  margin-top: 10px;
`;
const PanelHeader = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #3d363d;
  align-items: center;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #fff;
`;
const CloseBtn = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #ff75bf;
  cursor: pointer;
`;
const Empty = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 232px;
  color: #fff;
`;

const Pools = () => {
  const router = useRouter();
  const [userHideClosedPositions, setUserHideClosedPositions] = useState<boolean>(true);
  const { positions, loading } = usePositions();
  const [openPositions, closedPositions] = positions?.reduce(
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
    <StyledContainer>
      <StyledHeader>
        <Label>Pools</Label>
        <PositionButton
          onClick={() => {
            router.push('/linea/uniswap/pools-add-liquidity');
          }}
        >
          + New position
        </PositionButton>
      </StyledHeader>
      <StyledPanel>
        <PanelHeader>
          <Title>Your positions ({userSelectedPositionSet.length})</Title>
          <CloseBtn
            onClick={() => {
              setUserHideClosedPositions(!userHideClosedPositions);
            }}
          >
            {userHideClosedPositions ? 'Hide' : 'Show'} closed positions
          </CloseBtn>
        </PanelHeader>
        {loading ? (
          <LoadingWrapper>
            <Loading size={30} />
          </LoadingWrapper>
        ) : userSelectedPositionSet.length > 0 ? (
          userSelectedPositionSet.map((position) => (
            <PositionItem
              key={position.tokenId}
              {...position}
              onClick={() => {
                router.push('/linea/uniswap/pools-detail-liquidity?id=' + position.tokenId);
              }}
            />
          ))
        ) : (
          <Empty>
            <svg width="42" height="34" viewBox="0 0 42 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 17L8.08994 3.65422C8.95763 2.02092 10.656 1 12.5055 1H29.4945C31.344 1 33.0424 2.02093 33.9101 3.65422L41 17M1 17V29C1 31.2091 2.79086 33 5 33H37C39.2091 33 41 31.2091 41 29V17M1 17H13L17 23H25L28.5 17H41"
                stroke="white"
                stroke-width="2"
                stroke-linejoin="round"
              />
            </svg>
            <span>Your active V3 liquidity positions will appear here.</span>
          </Empty>
        )}
      </StyledPanel>
    </StyledContainer>
  );
};

export default memo(Pools);
