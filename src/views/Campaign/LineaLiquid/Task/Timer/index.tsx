import { memo, useEffect, useState } from 'react';

import useCountdown from '@/hooks/useCountdown';
import { getTimePeriods, toTwo } from '@/views/Quest/helpers';

import { StyledContainer, StyledDesc, StyledItem, StyledLine, StyledValue } from './styles';

const Timer = ({ endTime, hideDays, hideHours, onTimerEnd }: any) => {
  const [ready, setReady] = useState(false);
  const { secondsRemaining } = useCountdown(endTime / 1000);
  const timeLeft = getTimePeriods(secondsRemaining);

  useEffect(() => {
    // console.log(timeLeft,secondsRemaining)
    // const values = Object.values(timeLeft);

    if (secondsRemaining <= 0) {
      onTimerEnd?.();
    }
  }, [secondsRemaining]);

  // console.log(secondsRemaining)

  useEffect(() => {
    setReady(true);
  }, []);

  return ready ? (
    <StyledContainer>
      {hideDays ? null : (
        <StyledItem>
          <StyledValue>{toTwo(timeLeft.days)}</StyledValue>
          <StyledDesc>Days</StyledDesc>
        </StyledItem>
      )}
      {hideHours ? null : (
        <StyledItem>
          <StyledValue>{toTwo(timeLeft.hours)}</StyledValue>
          <StyledDesc>Hours</StyledDesc>
        </StyledItem>
      )}

      <StyledItem>
        <StyledValue>{toTwo(timeLeft.minutes)}</StyledValue>
        <StyledDesc>Mins</StyledDesc>
      </StyledItem>
      <StyledItem>
        <StyledValue>{toTwo(timeLeft.seconds)}</StyledValue>
        <StyledDesc>sec</StyledDesc>
      </StyledItem>
    </StyledContainer>
  ) : (
    <div />
  );
};

export default memo(Timer);
