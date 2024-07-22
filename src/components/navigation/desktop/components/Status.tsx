// components/Status.tsx
import React from 'react';
import styled from 'styled-components';

export enum StatusType {
    LIVE = 'LIVE',
    ENDED = 'ENDED',
    INCOMING = 'INCOMING'
  }
  

interface StatusProps {
  status: StatusType;
}

const StyleStatus = styled.div`
  padding: 3px 8px;
  background-color: rgba(32, 34, 47, 0.8);
  display: flex;
  align-items: center;
  gap: 5px;
  border: 1px solid #57DB64;
  border-radius: 16px;

  .dot {
    width: 6px;
    height: 6px;
    background: rgba(151, 154, 190, 1);
    border-radius: 50%;
  }

  .activity {
    font-weight: 500;
    font-size: 12px;
    color: #fff;
    text-transform: capitalize;
  }

  &.LIVE {
    border-color: #57DB64;
    box-shadow: 0px 0px 3px 0px rgba(87, 219, 100, 0.2);
    .dot {
      background-color: #57DB64;
    }
  }

  &.ENDED {
    border: 1px solid rgba(255, 255, 255, 0.15);
    .dot {
        background: rgba(151, 154, 190, 1);
    }
    .activity {
      color: #979ABE;
    }
  }
`;


const Status: React.FC<StatusProps> = ({ status }) => (
  <StyleStatus className={status}>
    <div className="dot"></div>
    <div className="activity">{status?.toLocaleLowerCase() || 'Ended'}</div>
  </StyleStatus>
);

export default Status;
