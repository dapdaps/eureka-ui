import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import type { FC } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Item from '@/views/ShuSh/components/QA/Item';

const TabWrap = styled(motion.div)`
  position: fixed;
  z-index: 10;
  left: 50%;
  right: 0;
  margin-left: -673px;
  bottom: -55px;
  width: 1346px;
  height: 259px;
  /* background: url(/images/lrts/bg-tab.svg) center no-repeat; */
`;
const TabHead = styled.div`
  position: absolute;
  top: -70px;
  z-index: -1;
  left: 30px;
  width: 100%;
  display: flex;
  gap: 12px;
  .item {
    width: 88px;
    height: 88px;
    padding: 5px 9px 0;
    background: url(/images/lrts/bg-th-dark.svg) center no-repeat;
    .text-right {
      text-align: right;
      color: #fff;
      font-family: Orbitron;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
    img {
      display: block;
      margin: 0 auto;
    }

    &.active {
      background: url(/images/lrts/bg-th-light.svg) center no-repeat;
    }
  }
`;
const TabBody = styled.div`
  height: 204px;
  background: url(/images/lrts/bg-tab.svg) top center no-repeat;
  .item {
  }
`;
// const TabItem=styled.div`

// `
interface IProps {
  onClose: () => void;
}

const TabCard: FC<IProps> = ({ onClose }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabRef = useRef(null);
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event: any) => {
    if (tabRef.current && !(tabRef.current as any).contains(event.target)) {
      onClose();
    }
  };

  const list = [
    {
      key: 0,
      headTitle: '1.23',
      headIcon: '/images/lrts/lrt-demo-1.svg',
    },
    {
      key: 1,
      headTitle: '0.23',
      headIcon: '/images/lrts/lrt-demo-2.svg',
    },
  ];
  const onChangeTab = (index: number) => {
    setActiveIndex(index);
  };
  const anim = {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: { y: 50, opacity: 0 },
    transition: {
      duration: 0.2,
    },
  };

  return (
    <TabWrap {...anim} ref={tabRef}>
      <TabHead>
        {list.map((item) => (
          <div
            key={item.key}
            className={`item ${activeIndex === item.key ? 'active' : ''}`}
            onClick={(e: any) => onChangeTab(item.key)}
          >
            <span className="text-right">{item.headTitle}</span>
            <Image src={item.headIcon} width={40} height={52} alt="lrt" />
          </div>
        ))}
      </TabHead>
      <TabBody>
        <div className="item">11</div>
      </TabBody>
    </TabWrap>
  );
};

export default TabCard;
