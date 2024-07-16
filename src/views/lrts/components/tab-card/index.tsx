import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useLrtDataStore } from '@/stores/lrts';
import { setNumKMB } from '@/utils/format-number';

import { PolygonBtn } from '../';
export enum ActionType {
  STAKE = 'stake',
  UNSTAKE = 'unstake',
}
const TabWrap = styled(motion.div)``;
const TabHead = styled.div`
  position: fixed;
  bottom: 202px;
  padding-left: 37px;
  z-index: 11;
  left: 50%;
  width: 1346px;
  margin-left: -673px;
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
  position: fixed;
  z-index: 10;
  left: 50%;
  right: 0;
  margin-left: -673px;
  bottom: 0;
  width: 1346px;

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
  .btns {
    display: flex;
    gap: 20px;
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
  data: any;
  curLrt: any;
  handleStake: (actionType: any) => void;
}

const TabCard: FC<IProps> = ({ data, curLrt, handleStake }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [list, setList] = useState<any>();
  const [tokenType, setTokenType] = useState(ActionType.STAKE);
  const tabRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    const _lrtTokens = data?.lrtTokens?.map((item: any) => ({
      ...item.token,
      logo: item.logo,
      tvl: item.tvl,
      apr: item.apr,
    }));
    const _list = [{ ...data.token, logo: data.lstIcon, tvl: data.tvl, apr: data.apr }, ..._lrtTokens];
    setList(_list);
  }, [data]);

  useEffect(() => {
    if (!Array.isArray(list) || !curLrt) return;

    const _index = list.findIndex((item: any) => item.symbol === curLrt?.symbol);

    setActiveIndex(_index);
  }, [list, curLrt]);

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

  const handleClick = () => {
    handleStake(tokenType);
  };

  const lrtsData = useLrtDataStore((store: any) => store.data);
  useEffect(() => {
    const lsts = lrtsData.map((item: any) => item.token.symbol);

    if (lsts.includes(list?.[activeIndex]?.symbol)) {
      setTokenType(ActionType.STAKE);
    } else {
      setTokenType(ActionType.UNSTAKE);
    }
  }, [lrtsData, activeIndex]);

  return Array.isArray(list) ? (
    <TabWrap {...anim} ref={tabRef}>
      <TabHead>
        {Array.isArray(list)
          ? list?.map((item: any, index: number) => (
              <div
                key={index}
                className={`item ${activeIndex === index ? 'active' : ''}`}
                onClick={(e: any) => onChangeTab(index)}
              >
                <div className="text-right">{parseFloat(Number(item.balance || 0).toFixed(2))}</div>
                <Image src={item.logo} width={40} height={40} alt={item.symbol} />
              </div>
            ))
          : null}
      </TabHead>
      <TabBody>
        <div className="left">
          <Image src={list?.[activeIndex]?.logo} width={130} height={100} alt="" />
          <span className="prd-name">{}</span>
        </div>
        <div className="content">
          <div className="detail">
            <div>
              <ItemName>{tokenType === ActionType.STAKE ? 'LST' : 'LRT'}</ItemName>
              <ItemValue>{list?.[activeIndex]?.symbol}</ItemValue>
            </div>
            <div>
              <ItemName>APR</ItemName>
              <ItemValue>{Number(list?.[activeIndex]?.apr).toFixed(2)}%</ItemValue>
            </div>
            <div>
              <ItemName>TVL</ItemName>
              <ItemValue>$ {setNumKMB(list?.[activeIndex]?.tvl, 2)}</ItemValue>
            </div>
          </div>
          <div className="btns">
            <PolygonBtn onClick={handleClick} style={{ width: 315 }}>
              {tokenType === ActionType.STAKE ? 'STAKE / UNSTAKE' : 'RESTAKE / UNSTAKE'}
            </PolygonBtn>
            <PolygonBtn style={{ width: 175 }}>SWAP</PolygonBtn>
          </div>
        </div>
        <div className="right">
          <div>
            <ItemName>Balance</ItemName>
            <ItemValue>{Number(list?.[activeIndex]?.balance || 0).toFixed(3)}</ItemValue>
          </div>
          <ItemLink href={'/lrts/earning'}>Earn more on L2...</ItemLink>
        </div>
      </TabBody>
    </TabWrap>
  ) : null;
};

export default TabCard;
