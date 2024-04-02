import useCountdown from '@/hooks/useCountdown';
import { getTimePeriods, toTwo } from '@/views/Quest/helpers';
import { useEffect } from 'react';

export default function Timer({ endTime, onEnd }: any) {
  const { secondsRemaining } = useCountdown(endTime / 1000);
  const timeLeft = getTimePeriods(secondsRemaining);

  useEffect(() => {
    if (secondsRemaining <= 0) {
      onEnd();
    }
  }, [secondsRemaining]);

  return (
    <div className="color">
      {toTwo(timeLeft.minutes)}:{toTwo(timeLeft.seconds)}
    </div>
  );
}
