import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getNextHourTime, getPM12Time, getUTCTime } from '@/utils/utc';

import Explores from '../../components/Explores';
import FrensTask from '../FrensTask';
import Summary from './summary';

const Wrapper = styled.div`
  width: 1186px;
  margin: 0 auto;
`;

const Head = styled.div`
  padding: 0 37px;
  height: 102px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;

  border-bottom: 1px solid #373535;
`;
const Sections = styled.div`
  margin-bottom: 50px;
  border-radius: 6px;
  border: 1px solid #373535;
  background: #131212;
  overflow: hidden;
`;
const Title = styled.div`
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
`;
const Desc = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export default function Tabs({ quests, queryDetail, userInfo, authConfig, onRefresh }: any) {
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
      const _collectedSpins = quests.frensTasks.reduce((total: number, item: any) => total + item.total_spins, 0);
      const _execs = _collectedSpins / quests.frensTasks[0]?.spins;

      setFrensTotal({
        executions: _execs,
        collectedSpins: _collectedSpins,
      });
    }
    if (quests.degenTasks.length) {
      const _collectedSpins = quests.degenTasks.reduce((total: number, item: any) => total + item.total_spins, 0);
      const _execs = _collectedSpins / quests.degenTasks[0]?.spins;
      setDegenTotal({
        executions: _execs,
        collectedSpins: _collectedSpins,
      });
    }
    if (quests.chadTasks.length) {
      const _collectedSpins = quests.chadTasks.reduce((total: number, item: any) => total + item.total_spins, 0);
      const _execs = _collectedSpins / quests.chadTasks[0]?.spins;
      setChadTotal({
        executions: _execs,
        collectedSpins: _collectedSpins,
      });
    }
  }, [quests]);
  const pm12 = getPM12Time();
  const nextHour = getNextHourTime();

  return (
    <Wrapper>
      <Sections>
        <Head>
          <Title>PARTNER</Title>
          <Desc>Visit dApp below to get 1 spin each</Desc>
        </Head>

        <Summary
          endTime={pm12}
          resetHours={24}
          executions={frensTotal.executions}
          collectedSpins={frensTotal.collectedSpins}
          hideDays
          onTimerEnd={onRefresh}
        />
        <FrensTask list={quests.frensTasks} onRefreshDetail={queryDetail} />
      </Sections>

      <Sections>
        <Head>
          <Title>DEGEN</Title>
          <Desc>Participate in the trade below to get 2 spins for each</Desc>
        </Head>
        <Summary
          endTime={nextHour}
          resetHours={1}
          executions={degenTotal.executions}
          collectedSpins={degenTotal.collectedSpins}
          hideDays
          hideHours
          onTimerEnd={onRefresh}
        />

        <Explores list={quests.degenTasks} userInfo={userInfo} authConfig={authConfig} onRefreshDetail={queryDetail} />
      </Sections>

      <Sections>
        <Head>
          <Title>CHAD</Title>
          <Desc>Stake in the dapps below to get 3 spins for each</Desc>
        </Head>
        <Summary
          endTime={nextHour}
          resetHours={1}
          executions={chadTotal.executions}
          collectedSpins={chadTotal.collectedSpins}
          hideDays
          hideHours
          onTimerEnd={onRefresh}
        />

        <Explores list={quests.chadTasks} userInfo={userInfo} authConfig={authConfig} onRefreshDetail={queryDetail} />
      </Sections>

      <div>
        <Title style={{ marginBottom: 30 }}>SOCIAL MISSIONS</Title>

        <Explores
          list={quests.social}
          userInfo={userInfo}
          authConfig={authConfig}
          onRefreshDetail={queryDetail}
          cols={2}
        />
        <Explores
          list={quests.password}
          userInfo={userInfo}
          authConfig={authConfig}
          onRefreshDetail={queryDetail}
          cols={1}
        />
      </div>
    </Wrapper>
  );
}
