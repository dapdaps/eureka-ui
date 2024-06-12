import { useMemo } from 'react';
import useCountdown from '@/hooks/useCountdown';

const START_TIME = '2024-06-14 21:00';

export default function useSwitcher() {
  const { secondsRemaining } = useCountdown(new Date(START_TIME).getTime() / 1000);

  const isStart = useMemo(() => secondsRemaining <= 0, [secondsRemaining]);

  return { isStart, secondsRemaining };
}
