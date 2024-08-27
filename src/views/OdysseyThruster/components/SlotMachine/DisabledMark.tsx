import styled from 'styled-components';

import { getTimePeriods } from '@/views/Quest/helpers';

const StyledContainer = styled.div`
  position: absolute;
  width: 663.796px;
  height: 75.173px;
  transform: rotate(-30deg);
  background-color: #fdfe03;
  left: -65px;
  top: 85px;
  z-index: 3;
  color: #000;
  font-family: 'Trans-America';
  font-size: 26px;
  font-style: normal;
  font-weight: 400;
  box-sizing: border-box;
  padding-left: 38px;
  line-height: 100%;
`;

export default function DisabledMark({ secondsRemaining }: any) {
  const timeLeft = getTimePeriods(secondsRemaining);

  return secondsRemaining ? (
    <StyledContainer>
      <div style={{ marginTop: 10, marginLeft: 108 }}> Coming soon in</div>
      <div style={{ marginLeft: 50 }}>
        {timeLeft.days} day{timeLeft.days > 0 ? 's' : ''} {timeLeft.hours} hour
        {timeLeft.days > 0 ? 's' : ''} {timeLeft.minutes} min
        {timeLeft.minutes > 0 ? 's' : ''}
      </div>
    </StyledContainer>
  ) : null;
}
