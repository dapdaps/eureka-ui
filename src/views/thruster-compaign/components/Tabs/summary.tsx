import { useState } from 'react';
import styled from 'styled-components';

import Timer from '@/components/Timer';

const Wrapper = styled.div`
  padding: 30px 37px;
  background: #131212;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    gap: 25px;
  }
  .right {
    display: flex;
    align-items: center;
    gap: 117px;
  }
`;
const Title = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const Value = styled.div`
  margin-top: 10px;
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export default function Summary({ resetHours, executions, collectedSpins }: any) {
  return (
    <Wrapper>
      <div className="left">
        <Timer endTime={1719569275992} />
        <Title>Reset by every {resetHours} hours</Title>
      </div>
      <div className="right">
        <div>
          <Title>Executions</Title>
          <Value>{executions}</Value>
        </div>
        <div>
          <Title>Collected Spins</Title>
          <Value>{collectedSpins}</Value>
        </div>
      </div>
    </Wrapper>
  );
}
