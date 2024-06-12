import styled from 'styled-components';

import particleImg from '../../img/g-new/g1.svg';
import hyperlockImg from '../../img/g-new/g2.svg';
import ringImg from '../../img/g-new/g3.svg';
import g4Img from '../../img/g-new/g4.svg';
import g5Img from '../../img/g-new/g5.svg';
import g6Img from '../../img/g-new/g6.svg';
import g7Img from '../../img/g-new/g7.svg';
import g8Img from '../../img/g-new/g8.svg';
import { useCallback, useEffect, useState, useRef } from 'react';

const ScrollLineWapper = styled.div`
  width: 140px;
  height: 140px;
  overflow: hidden;
`;

const ScrollIcons = styled.div<{ delay: number }>`
  width: 100%;
  transform: translateY(-65px); // -90 * n + (140 - 90) / 2
  @keyframes move {
    0% {
      transform: translateY(-515px);
    }
    100% {
      transform: translateY(-65px);
    }
  }
  &.ani {
    animation: ${({ delay }) => `move 1s ease-in ${delay}s 1, move .4s linear ${delay + 1}s infinite`};
  }
`;

const ScrollIconItems = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScrollIconItemsImg = styled.img`
  width: 50%;
`;

const list = [
  g6Img.src,
  '/images/odyssey/v8/logo-thruster.svg',
  ringImg.src,
  '/images/odyssey/v4/logo-BladeSwap.png',
  particleImg.src,
  hyperlockImg.src,
  g4Img.src,
  g5Img.src,
  g7Img.src,
  g8Img.src,
  g6Img.src,
  '/images/odyssey/v8/logo-thruster.svg',
];

const zeroLocation = -90 * (list.length - 1) + (140 - 90) / 2;

export default function ScrollLine({ no, startAni, noIndex }: { no: number; startAni: boolean; noIndex: number }) {
  const [isScoll, setIsScroll] = useState<boolean>(false);
  const [location, setLocation] = useState<number | undefined>(-(noIndex * 90) - 65);
  const [transition, setTransition] = useState('none');
  const numRef = useRef(no);

  useEffect(() => {
    numRef.current = no;
  }, [no]);

  const scrollAni = useCallback(() => {
    setTimeout(
      () => {
        setIsScroll(false);
        setLocation(zeroLocation);

        setTimeout(() => {
          const _location = -90 * numRef.current + (140 - 90) / 2;
          setLocation(_location);
          setTransition('all 1.5s ease-out');
        }, 100);
      },
      5800 + (11000 / 12) * noIndex,
    );
  }, [no]);

  useEffect(() => {
    setTransition('none');
    if (!startAni || no <= 0) {
      return;
    }

    setIsScroll(true);
    scrollAni();
  }, [startAni]);

  const transformStyle = !isScoll && location ? { transform: `translateY(${location}px)`, transition } : {};

  return (
    <ScrollLineWapper>
      <ScrollIcons delay={noIndex * 0.5} className={isScoll ? 'ani' : ''} style={transformStyle}>
        {list.map((item, index) => {
          return (
            <ScrollIconItems key={item + index}>
              <ScrollIconItemsImg src={item} />
            </ScrollIconItems>
          );
        })}
      </ScrollIcons>
    </ScrollLineWapper>
  );
}
