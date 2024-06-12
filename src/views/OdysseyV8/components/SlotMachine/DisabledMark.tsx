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
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: 75.173px;
  box-sizing: border-box;
  padding-left: 60px;
`;

export default function DisabledMark({ secondsRemaining }: any) {
  const timeLeft = getTimePeriods(secondsRemaining);

  return secondsRemaining ? (
    <StyledContainer>
      Open it in {timeLeft.days} day{timeLeft.days > 0 ? 's' : ''} {timeLeft.hours} hour
      {timeLeft.days > 0 ? 's' : ''}
    </StyledContainer>
  ) : null;
}
