import { useAnimate } from 'framer-motion';
import { useEffect } from 'react';

import {
  StyledContainer,
  StyledNumber,
  StyledNumbers
} from '@/views/Campaign/RubicHoldstation/components/NumberWheel/styles';

const NumberWheel = (props: Props) => {
  const { height, style, className, target } = props;

  const duration = 1;
  const scrollHeight = height * 10;
  const [el, animate] = useAnimate();

  useEffect(() => {
    const animation = animate(
      el.current,
      {
        y: [0, -scrollHeight]
      },
      {
        duration: duration,
        ease: 'linear',
        repeat: Infinity
      }
    );
    // 9 - 0
    // 0 - duration
    // target = duration / 10 * (9 - target)
    const timer = setTimeout(
      () => {
        clearTimeout(timer);
        animation.stop();
        const lastY = scrollHeight - (scrollHeight / 10) * (9 - target);
        el.current.style.transform = `translateY(${-lastY}px)`;
      },
      duration * 1000 * 2 - ((duration * 1000) / 10) * (9 - target)
    );

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <StyledContainer style={{ height, ...style }} className={className}>
      <StyledNumbers ref={el}>
        <StyledNumber style={{ height }}>9</StyledNumber>
        {[...new Array(10).keys()].map((i) => (
          <StyledNumber key={i} style={{ height }}>
            {i}
          </StyledNumber>
        ))}
        <StyledNumber style={{ height }}>0</StyledNumber>
      </StyledNumbers>
    </StyledContainer>
  );
};

export default NumberWheel;

interface Props {
  height: number;
  style?: React.CSSProperties;
  className?: string;
  target: number;
}
