import { useDebounceFn } from 'ahooks';
import type Big from 'big.js';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import useAccount from '@/hooks/useAccount';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';

const OffsetTop = 100;

const GridChainBalance = (props: Props) => {
  const { children, balance } = props;

  const { account } = useAccount();

  const triggerRef = useRef<any>();

  const [visible, setVisible] = useState(false);
  const [realVisible, setRealVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const { run: closeBalance, cancel: cancelCloseBalance } = useDebounceFn(() => {
    setVisible(false);
    setRealVisible(false);
  }, {
    wait: 150,
  });

  return (
    <>
      <StyledTrigger
        ref={triggerRef}
        onHoverStart={() => {
          setVisible(true);
          cancelCloseBalance();
        }}
        onHoverEnd={() => {
          closeBalance();
        }}
      >
        {children}
      </StyledTrigger>
      {
        visible && createPortal((
          <Balance
            x={x}
            y={y}
            onLoaded={(elTooltip) => {
              const trigger = triggerRef.current;
              const { width: triggerW, x: triggerX, y: triggerY } = trigger.getBoundingClientRect();
              const middleWidth = triggerX + triggerW / 2;

              const { width: w, height: h } = elTooltip.getBoundingClientRect();
              const targetMiddleWidth = triggerX + w / 2;
              let targetX = triggerX - (targetMiddleWidth - middleWidth);
              if (targetX < 0) {
                targetX = 0;
              }
              if (targetX + w > window.innerWidth) {
                targetX = window.innerWidth - w;
              }
              setY(triggerY - h - OffsetTop);
              setX(targetX);
              setRealVisible(true);
            }}
            visible={realVisible}
          >
            {formateValueWithThousandSeparatorAndFont(balance, 2, true, { prefix: '$', isZeroPrecision: true })}
            {
              !account && (
                <StyledUnconnected>
                  Please connect your wallet first
                </StyledUnconnected>
              )
            }
          </Balance>
        ), document.body)
      }
    </>
  );
};

const Balance = (props: BalanceProps) => {
  const { children, onLoaded, x, y, visible } = props;

  const balanceRef = useRef<any>(null);

  useEffect(() => {
    if (!balanceRef.current) return;
    onLoaded(balanceRef.current);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <StyledBalance
        ref={balanceRef}
        style={{
          left: x,
          top: y,
          visibility: visible ? 'visible' : 'hidden',
        }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 200, damping: 15, duration: 1 },
        }}
        exit={{
          opacity: 0,
          y: OffsetTop,
        }}
        initial={{
          opacity: 0,
          y: OffsetTop,
        }}
      >
        {children}
        <StyledLine>
          <svg width="1" height="100" xmlns="http://www.w3.org/2000/svg">
            <motion.line
              x1="0"
              y1="0"
              x2="0"
              y2={OffsetTop - 5}
              stroke="white"
              strokeWidth="1"
              animate={{
                pathLength: 1,
                transition: { type: 'spring', stiffness: 200, damping: 15, duration: 1, delay: 0.1 },
              }}
              initial={{
                pathLength: 0,
              }}
            />
          </svg>
        </StyledLine>
      </StyledBalance>
    </AnimatePresence>
  );
};

export default GridChainBalance;

interface Props {
  children: any;
  balance: Big.Big;
}

interface BalanceProps {
  children: any;
  x: number;
  y: number;
  visible: boolean;

  onLoaded(balanceRef: any): void;
}

const StyledBalance = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  min-height: 54px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #333648;
  background: #1F2229;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  padding: 12px 18px;
  color: #FFF;
  text-align: center;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const StyledTrigger = styled(motion.div)`
  cursor: pointer;
`;
const StyledLine = styled.div`
  width: 1px;
  height: ${() => `${OffsetTop}px`};
  position: absolute;
  bottom: ${() => `-${OffsetTop + 1}px`};
`;
const StyledUnconnected = styled.div`
  color: #979ABE;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 3px;
  max-width: 189px;
`;
