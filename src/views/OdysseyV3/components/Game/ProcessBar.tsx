import { memo } from 'react';
import styled from 'styled-components';

import { SCROLL_COLOR } from './config';
import ScrollIcon from './ScrollIcon';

const StyledContainer = styled.div`
  padding-top: 16px;
`;

const StyledItemWrapper = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledItems = styled.div`
  display: flex;
  align-items: center;
`;

const StyledScrollIcon = styled(StyledItemWrapper)`
  gap: 6px;
`;
const StyledScrollIconText = styled.div`
  opacity: 0.9;
  color: #979abe;
  text-align: right;
  font-family: Montserrat;
  font-size: 20px;
  font-style: italic;
  font-weight: 700;
  line-height: 100%; /* 20px */
  text-transform: capitalize;
`;

const StyledBarWrapper = styled.div`
  position: relative;
  margin-top: 20px;
  height: 12px;
  border-radius: 6px;
  background: #1e2028;
`;

const StyledBar = styled.div`
  height: 12px;
  border-radius: 6px;
  position: absolute;
  background: #e8ceab;
  transition: 0.3s;
  max-width: 100%;
`;

const StyledPoints = styled(StyledItems)`
  position: absolute;
  width: 100%;
  top: -7px;
`;

const StyledPoint = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
`;

const ProcessBar = ({ spins }: any) => {
  return (
    <StyledContainer>
      <StyledItems>
        {SCROLL_COLOR.map((item, i) => (
          <StyledScrollIcon key={item}>
            <ScrollIcon color={item} />
            <StyledScrollIconText>{(i + 1) * 15}</StyledScrollIconText>
          </StyledScrollIcon>
        ))}
      </StyledItems>
      <StyledBarWrapper>
        <StyledBar style={{ width: `${((spins || 0) / 60) * 100}%` }} />
        <StyledPoints>
          {[0, 1, 2, 3].map((item) => (
            <StyledItemWrapper key={item}>
              <StyledPoint style={{ backgroundColor: item < Math.floor((spins || 0) / 15) ? '#E8CEAB' : '#1E2028' }} />
            </StyledItemWrapper>
          ))}
        </StyledPoints>
      </StyledBarWrapper>
    </StyledContainer>
  );
};

export default memo(ProcessBar);
