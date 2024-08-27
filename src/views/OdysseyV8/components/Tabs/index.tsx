import { motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';

import Spins from '../Spins';
import { BgFoot } from '../Spins/styles';
import Treasure from '../Treasure';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 100px;
  border-bottom: 1px solid rgba(0, 254, 255, 0.2);
`;

const Tab = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 28px 30px 28px 10px;
  color: #fff;
  text-align: center;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 48px */
  position: relative;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;

const Tag = styled.div`
  padding: 6px 9px 8px;
  color: #000;
  text-align: right;
  font-family: '5squared pixel';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  text-transform: capitalize;
  border-radius: 8px;
  background: #00ffd1;
`;

const Slider = styled(motion.div)`
  width: 100%;
  height: 7px;
  bottom: 0px;
  left: 0px;
  position: absolute;
  background: #d9d9d9;
`;

export default function Tabs({ spins, strategies, detail, queryDetail, questingLoading, userInfo, authConfig }: any) {
  const [active, setActive] = useState('Optimized Strategies');
  return (
    <>
      <Wrapper>
        {[
          {
            label: 'Optimized Strategies',
            tag: '+10/Strategy',
          },
          {
            label: 'Single Mission',
            tag: '+1/mission',
          },
        ].map((item, i) => (
          <Tab
            key={item.label}
            onClick={() => {
              setActive(item.label);
            }}
          >
            <span>{item.label}</span>
            <Tag>{item.tag}</Tag>
            {active === item.label && (
              <Slider
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {
                    x: i === 0 ? '50%' : '-50%',
                  },
                  show: {
                    x: '0%',
                    transition: {
                      staggerChildren: 0.5,
                    },
                  },
                }}
              />
            )}
          </Tab>
        ))}
      </Wrapper>
      {active === 'Optimized Strategies' && <Treasure strategies={strategies} />}
      {active === 'Single Mission' && (
        <Spins
          list={spins}
          data={detail}
          onRefreshDetail={queryDetail}
          loading={questingLoading}
          userInfo={userInfo}
          authConfig={authConfig}
        />
      )}
      <BgFoot />
    </>
  );
}
