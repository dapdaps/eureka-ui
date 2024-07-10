import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { PolygonBtn } from '../';

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
  top: -73px;
  z-index: -1;
  left: 30px;
  /* width: 100%; */
  display: flex;
  gap: 12px;
  .item {
    width: 88px;
    height: 75px;
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
  display: flex;
  justify-content: space-between;
  height: 204px;
  padding: 50px 219px 0 45px;
  background: url(/images/lrts/bg-tab.svg) top center no-repeat;
  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    .prd-name {
      color: #979abe;
      font-family: Montserrat;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }
  .content {
    flex-grow: 1;
    padding-left: 60px;
    .detail {
      display: flex;
      justify-content: space-between;
      margin-bottom: 27px;
    }
  }
  .right {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
    gap: 40px;
    padding-left: 100px;
  }
`;

const ItemName = styled.div`
  color: #fff;
  font-family: Orbitron;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const ItemValue = styled.div`
  color: #fff;
  font-family: Orbitron;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const ItemLink = styled(Link)`
  color: #fff;
  font-family: Orbitron;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-decoration-line: underline;
`;
interface IProps {
  // onClose: () => void;
}

const TabCard: FC<IProps> = ({}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabRef = useRef(null);
  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, []);
  // const handleClickOutside = (event: any) => {
  //   if (tabRef.current && !(tabRef.current as any).contains(event.target)) {
  //     onClose();
  //   }
  // };

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
        <div className="left">
          <Image src="/images/lrts/box_1.svg" width={130} height={100} alt="" />
          <span className="prd-name">LIDO</span>
        </div>
        <div className="content">
          <div className="detail">
            <div>
              <ItemName>LST</ItemName>
              <ItemValue>stETH</ItemValue>
            </div>
            <div>
              <ItemName>APR</ItemName>
              <ItemValue>2.27%</ItemValue>
            </div>
            <div>
              <ItemName>TVL</ItemName>
              <ItemValue>$ 3.7B</ItemValue>
            </div>
          </div>
          <div className="btns">
            <PolygonBtn block href="">
              Stake
            </PolygonBtn>
          </div>
        </div>
        <div className="right">
          <div>
            <ItemName>Balance</ItemName>
            <ItemValue>0</ItemValue>
          </div>
          <ItemLink href={''}>Earn more on L2...</ItemLink>
        </div>
      </TabBody>
    </TabWrap>
  );
};

export default TabCard;
