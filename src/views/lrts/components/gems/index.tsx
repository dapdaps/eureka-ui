import _ from 'lodash';
import type { CSSProperties, FC, ReactNode } from 'react';
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

import useAllTokensBalance from '../../hooks/useAllTokensBalance';
import { Particle } from '../index';

interface IProps {
  dataSource: any;
  onGemClick: (symbol: string) => void;
  updater: number;
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
  .item-3,
  .item-13,
  .item-21 {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .item-7,
  .item-15,
  .item-25,
  .item-33 {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .item-gem {
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &.active {
      /* border-radius: 10px; */
      background-color: #000;
    }
  }
  .item-gem-content {
    position: relative;
    width: 90%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(/images/lrts/pad-empty.svg) no-repeat;
    background-size: contain;
    &:hover {
      background: url(/images/lrts/pad-active.svg) no-repeat transparent;
      background-size: cover;
    }
  }
  .item-gem-head {
    position: absolute;
    left: 0;
    right: 0;
    top: 12px;
    padding: 0 8px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    font-family: Orbitron;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    img {
      width: 26px;
      height: 26px;
      border-radius: 50%;
    }
  }
  .item-gem-apr {
    position: absolute;
    left: 12px;
    bottom: 12px;
    color: #fff;
    font-family: Orbitron;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .item-7 {
    .gem-light {
      width: 40%;
      height: 40%;
    }
  }
  .item-15 {
    .gem-light {
      width: 50%;
      height: 50%;
    }
  }
  .item-33 {
    .gem-light {
      width: 40%;
      height: 40%;
    }
  }
  .item-40 {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    .gem-light {
      width: 70%;
      height: 70%;
    }
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
  .item-5 {
    position: relative;
    overflow: visible;
  }
  .gem-light {
    width: 60%;
    height: 60%;
    display: flex;
    justify-content: center;
    position: relative;
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
  }
`;

const GemImage = styled.img`
  max-width: 100%;
`;
const TunnelStart = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  background: black;
  overflow: hidden;
  top: -88px;
  @media (min-width: 2000px) {
    top: -100px;
  }
`;

const Stones: FC<IProps> = ({ dataSource, onGemClick, updater }) => {
  const items = Array.from({ length: 81 }, (x, i) => i + 1);

  const allGems = dataSource.map((item: any) => item.order);

  const { loading, balances } = useAllTokensBalance(updater);
  // console.log('balances--', balances);

  const userGems = dataSource.filter((item: any) => balances[item?.token?.address] > 0).map((item: any) => item.order);

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
        <div className={`item item-tunnel item-${order}`} key={order}>
          <Particle amount={5} key={order} />

          {order === 5 && userTunnel.length > 0 ? (
            <TunnelStart>
              <Particle amount={5} />
            </TunnelStart>
          ) : null}
        </div>
      );
    } else if (allGems.includes(order)) {
      // for gem
      const _currentGem = dataSource.find((item: any) => item.order == order);

      return (
        <div
          className={`item item-gem item-${order} ${userGems.includes(order) ? 'active' : ''}`}
          key={order}
          onClick={(e: any) => {
            console.log('click-gem--', _currentGem);

            onGemClick(_currentGem);
          }}
        >
          <div className="item-gem-content">
            <div className="item-gem-head">
              <img src={_currentGem?.token?.icon} alt="" />
              {_currentGem?.token?.symbol}
            </div>
            <div className="gem-light">
              <GemImage src={_currentGem.logo} />
            </div>
            <div className="item-gem-apr">{Number(_currentGem.apr).toFixed(2)}%</div>
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
