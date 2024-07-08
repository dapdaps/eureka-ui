import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

const Menu = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  margin-left: -340px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 676px;
  height: 50px;
  border-radius: 8px;
  border: 1px solid #323232;
  background: rgba(59, 59, 59, 0.5);
  backdrop-filter: blur(10px);
`;
const MenuItem = styled(Link)`
  color: #fff;
  font-family: Orbitron;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding: 10px 0;
  display: flex;
  align-items: center;
  &.active {
    text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.6);
  }
  &:hover {
    text-decoration: none;
    text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.6);
  }
`;
const Holder = styled.span`
  width: 26px;
  height: 26px;
`;

const MenuMap = [
  {
    pathname: '/lrts',
    key: 'home',
    label: 'STake & Restake',
  },
  {
    pathname: '/lrts/earning',
    key: 'earning',
    label: 'L2 Earning',
  },
  {
    pathname: '/lrts/portfolio',
    key: 'portfolio',
    label: 'Portfolio',
  },
];

const DotSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
    <g filter="url(#filter0_d_121_654)">
      <circle cx="13" cy="13" r="3" fill="white" />
    </g>
    <defs>
      <filter
        id="filter0_d_121_654"
        x="0"
        y="0"
        width="26"
        height="26"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_121_654" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_121_654" result="shape" />
      </filter>
    </defs>
  </svg>
);

const LrtMenu = () => {
  const router = useRouter();

  return (
    <Menu>
      {MenuMap.map((item) => (
        <MenuItem key={item.key} href={item.pathname} className={router.pathname === item.pathname ? 'active' : ''}>
          {router.pathname === item.pathname ? DotSvg : <Holder />}
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default LrtMenu;
