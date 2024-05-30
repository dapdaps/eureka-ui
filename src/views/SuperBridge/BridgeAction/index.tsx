import { useState, useRef, useCallback, useEffect } from "react";
import styled from 'styled-components';

import BridgeContent from './BridgeContent'
import type { Chain, Token } from '@/types';

const Container = styled.div`
  color: #ffffff;
  width: 800px;
  min-height: 523px;
  border-radius: 16px;
  border: 1px solid rgba(55, 58, 83, 1);
  background: rgba(38, 40, 54, 1);
  padding: 26px 60px;
`;

const Setting = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid rgba(55, 58, 83, 1);
  background-color: rgba(46, 49, 66, 1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .3s;
  &:hover {
    border: 1px solid rgba(235, 244, 121, .3);
  }
`

const Sep = styled.div<{ height?: number }>`
  height: ${({ height = 12 }) => `${height}px`};
`

const ArrowSwap = styled.div`
  position: relative;
  height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  .arrow {
    position: absolute;
    width: 34px;
    height: 34px;
    border: 4px solid rgba(38, 40, 54, 1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: rgba(46, 49, 66, 1);
  }
`

interface Props {
  chainList: Chain[];
  onTransactionUpdate?: () => void;
}

export default function BirdgeAction(
  {
    chainList, onTransactionUpdate
  }: Props) {
  return <Container>
    <BridgeContent chainList={chainList} onTransactionUpdate={onTransactionUpdate}/>
  </Container>
}