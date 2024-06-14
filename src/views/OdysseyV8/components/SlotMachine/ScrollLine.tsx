import styled from 'styled-components';

import particleImg from '../../img/g-new/particle.svg';
import hyperlockImg from '../../img/g-new/hyperlock.svg';
import ringImg from '../../img/g-new/ring.svg';
import juiceImg from '../../img/g-new/juice.svg';
import andyImg from '../../img/g-new/andy.svg';
import bajaImg from '../../img/g-new/baja.svg';
import ambientImg from '../../img/g-new/ambient.svg';
import dapdapImg from '@/views/Compass/img/g-new/g6.svg';
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

const LIST = [
  '/images/odyssey/v8/logo-thruster.svg',
  '/images/odyssey/v4/logo-BladeSwap.png',
  '/images/odyssey/v8/fenix.png',
  '/images/odyssey/v8/crypto-valleys.png',
  '/images/odyssey/v8/super-sushi-samurai.png',
  '/images/odyssey/v8/cap&co.png',
  '/images/odyssey/v8/gold.svg',
  '/images/odyssey/v8/early.png',
  ringImg.src,
  particleImg.src,
  hyperlockImg.src,
  juiceImg.src,
  bajaImg.src,
  ambientImg.src,
  andyImg.src,
  dapdapImg.src,
];

const zeroLocation = -90 * (7 - 1) + (140 - 90) / 2;

export default function ScrollLine({ no, startAni, noIndex }: { no: number; startAni: boolean; noIndex: number }) {
  const [isScoll, setIsScroll] = useState<boolean>(false);
  const [location, setLocation] = useState<number | undefined>(-(noIndex * 90) - (noIndex === 4 ? 24 : 65));
  const [transition, setTransition] = useState('none');
  const numRef = useRef(no);
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    numRef.current = no;
  }, [no]);

  useEffect(() => {
    const randomList = [...Array(15).keys()].sort(() => 0.5 - Math.random());
    const tempList = randomList.filter((item, i) => i < 5).map((item) => LIST[item]);
    setList([tempList[0], tempList[1], ...tempList]);
  }, []);

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
        {list.map((item: any, index: number) => {
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
