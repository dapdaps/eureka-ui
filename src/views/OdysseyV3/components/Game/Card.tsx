import { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { STEPS } from './config';
import Reward from './Reward';
import Slices from './Slices';

const StyledContainer = styled.div`
  position: relative;
`;

const StyledCard = styled.div`
  width: 260px;
  height: 400px;
`;

const StyledCardBg = styled.div<{ $img: string }>`
  background-image: ${({ $img }) => `url(${$img})`};
  background-repeat: no-repeat;
  background-size: 100%;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  transition: 0.3s;
`;

const StyledText = styled.div`
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 50px;
  font-style: italic;
  font-weight: 900;
  line-height: 100%; /* 50px */
  text-transform: uppercase;
  opacity: 0.2;
  position: absolute;
  z-index: 8;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledEmptyCard = styled.div<{ $show: boolean }>`
  position: absolute;
  z-index: 2;
  overflow: hidden;
  width: 100%;
  height: 100%;
  transition: 0.3s;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  & svg {
    position: absolute;
  }
`;

const StyledAnimation = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  border-radius: 50%;
  border: 0px solid rgba(255, 255, 255, 0.3);
  pointer-events: none;
  animation: ripple 1s linear;
  z-index: 10;

  @keyframes ripple {
    0% {
      width: 0;
      height: 0;
      opacity: 0.7;
      border-width: 20px;
    }
    50% {
      width: 200px;
      height: 200px;
      opacity: 0.3;
    }
    100% {
      width: 400px;
      height: 400px;
      opacity: 0;
      border-width: 0px;
    }
  }
`;

const Card = ({ completed, index, reward, remain, sliceOrders }: any) => {
  const [hideEmptyCard, setHideEmptyCard] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setHideEmptyCard(completed === 0);
    }, 500);
  }, [completed]);

  return (
    <StyledContainer>
      <Reward amount={reward} />
      <StyledCard>
        <StyledCardBg $img={`/images/odyssey/v3/${index + 1}.png`} />
        <StyledText>Scroll {STEPS[index]}</StyledText>
        <StyledEmptyCard $show={!hideEmptyCard}>
          {Slices.map((slice, i) => (
            <slice.component
              key={i}
              isFill={remain >= 15 ? false : sliceOrders[i] >= remain}
              svgProps={slice.svgProps}
              path={slice.path}
            />
          ))}
        </StyledEmptyCard>
      </StyledCard>
      {completed === 0 && <StyledAnimation />}
    </StyledContainer>
  );
};

export default memo(Card);
