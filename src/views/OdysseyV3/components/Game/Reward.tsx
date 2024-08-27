import { memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 115px;
  height: 115px;
  background-image: url(/images/odyssey/v3/pts-bg.png);
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
  position: absolute;
  z-index: 10;
  top: -68px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledAmount = styled.div`
  color: #101010;
  text-align: center;
  font-family: Montserrat;
  font-size: 24px;
  font-style: italic;
  font-weight: 700;
  line-height: 100%;
  text-transform: capitalize;
`;

const StyledUnits = styled(StyledAmount)`
  font-size: 20px;
`;

const Reward = ({ amount }: any) => {
  return (
    <StyledContainer>
      {amount ? <StyledAmount>{amount}</StyledAmount> : <Skeleton width="60px" height="26px" borderRadius="6px" />}
      <StyledUnits>PTS</StyledUnits>
    </StyledContainer>
  );
};

export default memo(Reward);
