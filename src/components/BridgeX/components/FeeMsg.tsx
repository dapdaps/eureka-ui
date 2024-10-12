import Big from 'big.js';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { timeFormate } from '../Utils';

const FeeWapper = styled.div`
  width: 446px;
  height: 120px;
  border-radius: 12px;
  border: 1px solid #373a53;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  margin-top: 16px;
`;

const LineWapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #979abe;
  height: 37px;
  padding: 0 10px;
`;

export default function FeeMsg(props: any) {
  return (
    <FeeWapper className="card-FeeMsg">
      <LineWapper>
        <div>Est. Arrival</div>
        <div>{timeFormate(props.duration)}</div>
      </LineWapper>
      <LineWapper>
        <div>Bridge Fee</div>
        <div>${props.feeCostUSD}</div>
      </LineWapper>
      <LineWapper>
        <div>Gas Fee</div>
        <div>${props.gasCostUSD}</div>
      </LineWapper>
    </FeeWapper>
  );
}
