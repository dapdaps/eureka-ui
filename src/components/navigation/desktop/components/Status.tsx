// components/Status.tsx
import React from 'react';
import styled from 'styled-components';
import cls from 'classnames';

export enum StatusType {
    ongoing = 'live',
    ended = 'ended',
    un_start = 'un_start'
  }
  

interface StatusProps {
  status: StatusType;
  className?: string
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

  &.live {
    border-color: #57DB64;
    box-shadow: 0px 0px 3px 0px rgba(87, 219, 100, 0.2);
    position: relative;
    &:before {
      content: '';
      position: absolute;
      border-radius: 16px;
      width: 100%;
      height: 100%;
      left: 0;
      right: 0;
      box-shadow: 0px 0px 5px 6px rgba(87, 219, 100, 0.2);
      background: rgba(32, 34, 47, 0.8);
      animation: 1.5s linear infinite firstAnimation;
    }
    @keyframes firstAnimation {
      0% {
        transform: scale(0.8);
      }
      50% {
        transform: scale(1);
      }
      100% {
        transform: scale(0.8);
      }
    }
    .dot {
      background-color: #57DB64;
    }
  }

  &.ended {
    border: 1px solid rgba(255, 255, 255, 0.15);
    .dot {
        background: rgba(151, 154, 190, 1);
    }
    .activity {
      color: #979ABE;
    }
  }
`;


const Status: React.FC<StatusProps> = ({ status, className }) => (
  <StyleStatus className={cls(status, className)}>
    <div className="dot"></div>
    <div className="activity">{status?.toLocaleLowerCase() || StatusType.un_start}</div>
  </StyleStatus>
);

export default Status;
