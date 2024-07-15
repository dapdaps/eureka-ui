import _ from 'lodash';
import Image from 'next/image';
import type { CSSProperties, FC, ReactNode } from 'react';
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Particle } from '../index';
interface IProps {
  data: any;
  onClick: (symbol: string) => void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Wrap = styled.section`
  display: grid;
  width: 1350px;
  margin: 0 auto;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 150px);
  /* background-color: #000; */

  .item {
    display: flex;
    color: white;

    background-color: #151515;

    &:nth-child(40) {
      grid-column-start: 4;
      grid-column-end: 6;
      grid-row-start: 5;
      grid-row-end: 7;
    }
  }
  .item-gem {
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &.active {
      border-radius: 10px;
      background-color: #000;

      &:hover {
        background: url(/images/lrts/pad-active.svg) no-repeat #000;
        background-size: cover;
      }
    }
  }
  .item-gem-content {
    width: 90%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(/images/lrts/pad-empty.svg) no-repeat;
    background-size: contain;
  }
  .item-rock {
    background: url(/images/lrts/pad-rock.svg) no-repeat #151515;
  }
  .item-empty {
    background: url(/images/lrts/pad-empty.svg) no-repeat #151515;
  }
  .item-tunnel {
    background-color: #000;
    overflow: hidden;
  }
`;
const GemLight = styled.div`
  position: relative;
  /* &::after {
    content: '';
    position: absolute;
    left: 10%;
    top: 10%;
    width: 80%;
    height: 80%;
    background-image: radial-gradient(transparent, #fff);
    filter: blur(20px);
    border-radius: 50%;
    animation: shine 6s infinite ease-in-out;
  } */
  animation: shine 6s infinite ease-in-out;
  @keyframes shine {
    0% {
      opacity: 0.8;
      transform: scale(0.95);
    }

    50% {
      opacity: 1;
      transform: scale(1);
    }

    100% {
      opacity: 0.8;
      transform: scale(0.95);
    }
  }
`;
const GemImage = styled.img``;
const Stones: FC<IProps> = ({ data, onClick }) => {
  useEffect(() => {}, []);
  const items = Array.from({ length: 81 }, (x, i) => i + 1);

  const allGems = data.map((item: any) => item.order);
  const userGems = data.filter((item: any) => item.isActive).map((item: any) => item.order);

  const rocks = [12, 16, 18, 33, 38, 42, 47, 48, 50, 51, 54, 58];
  const empty = [11, 17, 34, 39, 49, 53, 59];

  const defaultTunnel = [4, 5, 6, 14, 22, 23, 24, 32];
  const tunnelMap = new Map([
    [3, [4, 5]],
    [7, [5, 6]],
    [13, [5, 14]],
    [15, [5, 14]],
    [21, [5, 14, 22, 23]],
    [25, [5, 14, 23, 24]],
    [31, [5, 14, 22, 23]],
    [33, [5, 14, 23, 24]],
    [40, [5, 14, 23, 32]],
  ]);

  const _tunnel = userGems.map((item: any) => tunnelMap.get(item)).flat();
  const userTunnel = _.uniq(_tunnel);

  const renderItem = (order: number) => {
    // for tunnel
    if (defaultTunnel.includes(order) && userTunnel.includes(order)) {
      return (
        <div className={`item item-tunnel`} key={order}>
          <Particle amount={5} key={order} />
        </div>
      );
    } else if (allGems.includes(order)) {
      // for gem
      const _currentGem = data.find((item: any) => item.order == order);

      return (
        <div
          className={`item item-gem ${userGems.includes(order) ? 'active' : ''}`}
          key={order}
          onClick={(e: any) => {
            console.log('click-gem--', _currentGem);

            onClick(_currentGem.token);
          }}
        >
          <div className="item-gem-content">
            <GemLight>
              <GemImage src={_currentGem.logo} />
            </GemLight>
          </div>
        </div>
      );
    } else if (rocks.includes(order)) {
      // for rock
      return <div className={`item item-rock`} key={order}></div>;
    } else if (empty.includes(order)) {
      // for empty
      return <div className={`item item-empty`} key={order}></div>;
    } else {
      // default
      return (
        <div className={`item`} key={order}>
          {/* {order} */}
        </div>
      );
    }
  };

  return <Wrap>{items.map((order) => renderItem(order))}</Wrap>;
};

export default memo(Stones);
