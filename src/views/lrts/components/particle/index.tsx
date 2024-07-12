import type { CSSProperties, FC, ReactNode } from 'react';
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

interface IProps {
  amount: number;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  animation: spin 60s linear infinite;
  .item {
    position: relative;
    width: 150px;
    &:after {
      content: '';
      position: absolute;
      background-color: #fff;
      height: 2px;
      width: 2px;
    }

    /* &:nth-child(n) {
      transform: rotateZ(_.random(360) + 'deg') rotateY(_.random(360) + 'deg') rotateX(_.random(360) + 'deg'); 
      &:after {
        left: _.random(99) + 49%;
        animation: slide _.random(10000) + 5000ms 0s ease-in-out infinite;
      }
    }  */
    &:nth-child(1) {
      transform: rotateZ(245deg) rotateY(194deg) rotateX(118deg);
      &:after {
        left: 0%;
        -webkit-animation: slide 5105ms 0s ease-in-out infinite;
        animation: slide 5105ms 0s ease-in-out infinite;
      }
    }
    &:nth-child(2) {
      transform: rotateZ(242deg) rotateY(168deg) rotateX(325deg);
      &:after {
        left: 10%;
        -webkit-animation: slide 6606ms 0s ease-in-out infinite;
        animation: slide 6606ms 0s ease-in-out infinite;
      }
    }
    &:nth-child(3) {
      transform: rotateZ(275deg) rotateY(309deg) rotateX(40deg);
      &:after {
        left: 30%;
        -webkit-animation: slide 5486ms 0s ease-in-out infinite;
        animation: slide 5486ms 0s ease-in-out infinite;
      }
    }
    &:nth-child(4) {
      transform: rotateZ(247deg) rotateY(140deg) rotateX(158deg);
      &:after {
        left: 50%;
        -webkit-animation: slide 7014ms 0s ease-in-out infinite;
        animation: slide 7014ms 0s ease-in-out infinite;
      }
    }
    &:nth-child(5) {
      transform: rotateZ(247deg) rotateY(262deg) rotateX(74deg);
      &:after {
        left: 99%;
        -webkit-animation: slide 14763ms 0s ease-in-out infinite;
        animation: slide 14763ms 0s ease-in-out infinite;
      }
    }
  }
  @keyframes spin {
    0% {
      transform: rotateY(0deg) rotateX(0deg);
    }
    100% {
      transform: rotateY(360deg) rotateX(360deg);
    }
  }
  @keyframes slide {
    0% {
      left: 45%;
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    89% {
      left: 0%;
    }
    90% {
      left: 100%;
      height: 1px;
    }
    95% {
      opacity: 1;
    }
    100% {
      left: 100%;
      opacity: 0;
      height: 3px;
    }
  }
`;

const Particle: FC<IProps> = ({ amount }) => {
  const list = Array.from({ length: amount }, (x, i) => i);
  return (
    <Wrap>
      {list.map((item, index) => (
        <div className="item" key={index}></div>
      ))}
    </Wrap>
  );
};

export default memo(Particle);
