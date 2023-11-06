import { useRouter } from 'next/router';
import { memo } from 'react';
import styled from 'styled-components';

import Panel from './components/Panel';

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
const Record = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  text-align: left;
  padding: 20px;
  .gray {
    color: #8e8e8e;
  }
`;
const RecordDetails = styled.div`
  cursor: pointer;
`;
const RecordPool = styled.div`
  display: flex;
  gap: 6px;
`;
const RecordToken = styled.img`
  width: 22px;
  height: 22px;
`;
const RecordSecondToken = styled(RecordToken)`
  margin-left: -6px;
`;
const RecordRange = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Status = styled.div`
  color: #6efa95;
  display: flex;
  align-items: center;
  gap: 6px;
  &::before {
    content: '';
    display: inline;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #6efa95;
  }
`;

const Pools = () => {
  const router = useRouter();
  function goAddLiquidityPage() {
    router.push('/linea/uniswap/pools-add-liquidity');
  }
  function goPoolDetalPage() {
    router.push('/linea/uniswap/pools-detail-liquidity');
  }
  return (
    <StyledContainer>
      <StyledHeader>
        <Label>Pools</Label>
        <PositionButton onClick={goAddLiquidityPage}>+ New position</PositionButton>
      </StyledHeader>
      <StyledPanel>
        <PanelHeader>
          <Title>Your positions (1)</Title>
          <CloseBtn>Hide closed positions</CloseBtn>
        </PanelHeader>
        <Record>
          <RecordDetails onClick={goPoolDetalPage}>
            <RecordPool>
              <RecordToken src="https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694" />
              <RecordSecondToken src="https://assets.coingecko.com/coins/images/15264/standard/mimatic-red.png?1696514916" />
              <span>ETH/USDC</span>
              <span className="gray">0.05%</span>
            </RecordPool>
            <RecordRange>
              <span className="gray">Min:</span>
              <span>&gt;0.001 ETH per USDC</span>
              <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.646447 3.64645C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM17.3536 4.35355C17.5488 4.15829 17.5488 3.84171 17.3536 3.64645L14.1716 0.464466C13.9763 0.269204 13.6597 0.269204 13.4645 0.464466C13.2692 0.659728 13.2692 0.976311 13.4645 1.17157L16.2929 4L13.4645 6.82843C13.2692 7.02369 13.2692 7.34027 13.4645 7.53553C13.6597 7.7308 13.9763 7.7308 14.1716 7.53553L17.3536 4.35355ZM1 4.5H17V3.5H1V4.5Z"
                  fill="#8E8E8E"
                />
              </svg>
              <span className="gray">Max:</span>
              <span>&gt;0.001 ETH per USDC</span>
            </RecordRange>
          </RecordDetails>
          <Status>In range</Status>
        </Record>
        {/* <Empty>
          <svg width="42" height="34" viewBox="0 0 42 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 17L8.08994 3.65422C8.95763 2.02092 10.656 1 12.5055 1H29.4945C31.344 1 33.0424 2.02093 33.9101 3.65422L41 17M1 17V29C1 31.2091 2.79086 33 5 33H37C39.2091 33 41 31.2091 41 29V17M1 17H13L17 23H25L28.5 17H41"
              stroke="white"
              stroke-width="2"
              stroke-linejoin="round"
            />
          </svg>
          <span>Your active V3 liquidity positions will appear here.</span>
        </Empty> */}
      </StyledPanel>
    </StyledContainer>
  );
};

export default memo(Pools);
