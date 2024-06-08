import { memo, useEffect, useState } from 'react';

import useCountdown from '@/hooks/useCountdown';

import { getTimePeriods, toTwo } from './helpers';
import { StyledContainer, StyledDesc, StyledItem, StyledValue } from './style.timer';

const Timer = ({ endTime, color }: { endTime: number; color?: string }) => {
  const [ready, setReady] = useState(false);
  const { secondsRemaining } = useCountdown(endTime / 1000);
  const timeLeft = getTimePeriods(secondsRemaining);

  useEffect(() => {
    setReady(true);
  }, []);

  return ready ? (
    <StyledContainer className={color}>
      <StyledItem>
        <StyledValue>{toTwo(timeLeft.days)}</StyledValue>
        <StyledDesc>days</StyledDesc>
      </StyledItem>

      <StyledItem>
        <StyledValue>{toTwo(timeLeft.hours)}</StyledValue>
        <StyledDesc>hours</StyledDesc>
      </StyledItem>

      <StyledItem>
        <StyledValue>{toTwo(timeLeft.minutes)}</StyledValue>
        <StyledDesc>mins</StyledDesc>
      </StyledItem>

      <StyledItem>
        <StyledValue>{toTwo(timeLeft.seconds)}</StyledValue>
        <StyledDesc>secs</StyledDesc>
      </StyledItem>
    </StyledContainer>
  ) : (
    <div />
  );
};

export default memo(Timer);
