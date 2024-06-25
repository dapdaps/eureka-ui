import { useState } from 'react';
import styled from 'styled-components';

import Explores from '../../components/Explores';
import useQuests from '../../hooks/useQuests';
import FrensTask from '../FrensTask';
import Summary from './summary';

const Wrapper = styled.div`
  width: 1186px;
  margin: 0 auto;
  border-radius: 6px;
  border: 1px solid #373535;
  background: #131212;
  overflow: hidden;
`;
const TabHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Tab = styled.div`
  flex: 1;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #373535;
  cursor: pointer;
  .txt {
    font-family: Burial;
    font-size: 26px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    background: linear-gradient(180deg, #fff 0%, #999 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0.6;
  }
  &.active {
    .txt {
      opacity: 1;
    }
    border-left: 1px solid #373535;
    border-right: 1px solid #373535;
    border-bottom: none;
    background-color: #000;
  }
`;

export default function Tabs({ spins, strategies, detail, queryDetail, questingLoading, userInfo, authConfig }: any) {
  const [active, setActive] = useState('FRENS TASK');
  const { loading, quests, queryQuests } = useQuests(8);
  return (
    <>
      <Wrapper>
        <TabHead>
          {[
            {
              label: 'FRENS TASK',
            },
            {
              label: 'DEGEN TASK',
            },
            {
              label: 'CHAD TASK',
            },
          ].map((item, i) => (
            <Tab
              key={item.label}
              onClick={() => {
                setActive(item.label);
              }}
              className={active === item.label ? 'active' : ''}
            >
              <span className="txt">{item.label}</span>
            </Tab>
          ))}
        </TabHead>
        {active === 'FRENS TASK' && (
          <div>
            <Summary title="Visit dApp below to get 1 spin each" />
            <FrensTask list={quests.bridge} onRefreshDetail={queryDetail} />
          </div>
        )}
        {active === 'DEGEN TASK' && (
          <div>
            <Summary title="Participate in the trade below to get 2 spins for each" />

            <Explores list={quests.social} userInfo={userInfo} authConfig={authConfig} onRefreshDetail={queryDetail} />
          </div>
        )}
        {active === 'CHAD TASK' && (
          <div>
            <Summary title="Stake in the dapps below to get 3 spins for each" />

            <Explores list={quests.social} userInfo={userInfo} authConfig={authConfig} onRefreshDetail={queryDetail} />
          </div>
        )}
      </Wrapper>
    </>
  );
}
