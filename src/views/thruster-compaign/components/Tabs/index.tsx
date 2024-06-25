import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Explores from '../../components/Explores';
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

export default function Tabs({ quests, queryDetail, userInfo, authConfig }: any) {
  const [active, setActive] = useState('FRENS TASK');
  const [frensTotal, setFrensTotal] = useState({
    executions: 0,
    collectedSpins: 0,
  });
  const [degenTotal, setDegenTotal] = useState({
    executions: 0,
    collectedSpins: 0,
  });
  const [chadTotal, setChadTotal] = useState({
    executions: 0,
    collectedSpins: 0,
  });
  console.log('quests--', quests);

  useEffect(() => {
    if (quests.frensTasks.length) {
      const _execs = quests.frensTasks.reduce((total: number, item: any) => total + Number(item.times), 0);
      const _collectedSpins = quests.frensTasks.reduce(
        (total: number, item: any) => total + item.times * item.spins,
        0,
      );
      setFrensTotal({
        executions: _execs,
        collectedSpins: _collectedSpins,
      });
    }
    if (quests.degenTasks.length) {
      const _execs = quests.degenTasks.reduce((total: number, item: any) => total + Number(item.times), 0);
      const _collectedSpins = quests.degenTasks.reduce(
        (total: number, item: any) => total + item.times * item.spins,
        0,
      );
      setDegenTotal({
        executions: _execs,
        collectedSpins: _collectedSpins,
      });
    }
    if (quests.chadTasks.length) {
      const _execs = quests.chadTasks.reduce((total: number, item: any) => total + Number(item.times), 0);
      const _collectedSpins = quests.chadTasks.reduce((total: number, item: any) => total + item.times * item.spins, 0);
      setChadTotal({
        executions: _execs,
        collectedSpins: _collectedSpins,
      });
    }
  }, [quests]);

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
            <Summary
              title="Visit dApp below to get 1 spin each"
              resetHours={24}
              executions={frensTotal.executions}
              collectedSpins={frensTotal.collectedSpins}
            />
            <FrensTask list={quests.frensTasks} onRefreshDetail={queryDetail} />
          </div>
        )}
        {active === 'DEGEN TASK' && (
          <div>
            <Summary
              title="Participate in the trade below to get 2 spins for each"
              resetHours={1}
              executions={degenTotal.executions}
              collectedSpins={degenTotal.collectedSpins}
            />

            <Explores
              list={quests.degenTasks}
              userInfo={userInfo}
              authConfig={authConfig}
              onRefreshDetail={queryDetail}
            />
          </div>
        )}
        {active === 'CHAD TASK' && (
          <div>
            <Summary
              title="Stake in the dapps below to get 3 spins for each"
              resetHours={1}
              executions={chadTotal.executions}
              collectedSpins={chadTotal.collectedSpins}
            />

            <Explores
              list={quests.chadTasks}
              userInfo={userInfo}
              authConfig={authConfig}
              onRefreshDetail={queryDetail}
            />
          </div>
        )}
      </Wrapper>
    </>
  );
}
