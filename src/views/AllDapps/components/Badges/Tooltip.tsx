import React, { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useDebounceFn } from 'ahooks';

// a simple tooltip component that supports rendering content to the root node (document.body)
const Tooltip = (props: Props) => {
  const {
    children,
    tooltip,
    containerStyle,
    style,
    height = 38,
    isShake,
  } = props;

  const offset = 10;

  const triggerRef = useRef<any>();
  const tooltipRef = useRef<any>();
  const [visible, setVisible] = useState(false);
  const [realVisible, setRealVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const springX = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 5 };
  const rotate = useSpring(useTransform(springX || useMotionValue(0), [-100, 100], [-45, 45]), springConfig);
  const translateX = useSpring(useTransform(springX || useMotionValue(0), [-100, 100], [-50, 50]), springConfig);

  const { run: closeTooltip, cancel: cancelCloseTooltip } = useDebounceFn(() => {
    setVisible(false);
    setRealVisible(false);
  }, {
    wait: 150,
  });

  const onMouseMove = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (isShake) {
      const halfWidth = e.currentTarget.offsetWidth / 2;
      springX.set(e.nativeEvent.offsetX - halfWidth);
    }

    const el = e.currentTarget;
    const elTooltip = tooltipRef.current;
    if (el && el.getBoundingClientRect()) {
      const { width: elW, x: elX, y: elY } = el.getBoundingClientRect();
      setX(elX);
      setY(elY - height - offset);
      const middleWidth = elX + elW / 2;
      if (elTooltip) {
        const { width: w } = elTooltip.getBoundingClientRect();
        const targetMiddleWidth = elX + w / 2;
        let targetX = elX - (targetMiddleWidth - middleWidth);
        if (targetX < 0) {
          targetX = 0;
        }
        if (targetX + w > window.innerWidth) {
          targetX = window.innerWidth - w;
        }
        setX(targetX);
        setRealVisible(true);
      }
      return;
    }
    setX(e.clientX);
    setY(e.clientY);
  };

  useEffect(() => {
    const onScroll = () => {
      setVisible(false);
    };
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (!tooltip) return children;

  const popup = (
    <AnimatePresence mode="wait">
    <StyledTooltip
      ref={tooltipRef}
      style={{
        ...style,
        height,
        left: x,
        top: y,
        translateX,
        rotate,
        visibility: realVisible ? 'visible' : 'hidden',
      }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 200, damping: 15, duration: 0.5 },
      }}
      exit={{
        opacity: 0,
        y: 20,
      }}
      initial={{
        opacity: 0,
        y: 20,
      }}
      onHoverStart={() => {
        setVisible(true);
        cancelCloseTooltip();
      }}
      onHoverEnd={() => {
        closeTooltip();
      }}
    >
      {tooltip}
    </StyledTooltip>
    </AnimatePresence>
  );

  return (
    <StyledContainer style={containerStyle}>
      <StyledTooltipTrigger
        ref={triggerRef}
        onHoverStart={() => {
          setVisible(true);
          cancelCloseTooltip();
        }}
        onHoverEnd={() => {
          closeTooltip();
        }}
        onMouseMove={onMouseMove}
      >
        {children}
      </StyledTooltipTrigger>
      {
        visible ? createPortal(popup, document.body) as React.ReactNode : null
      }
    </StyledContainer>
  );
};

export default memo(Tooltip);

export interface Props {
  children: any;
  tooltip: any;
  height?: number;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  isShake?: boolean;
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledTooltip = styled(motion.div)`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px #333648;
  background: #1F2229;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  color: #979ABE;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  padding: 0 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;
const StyledTooltipTrigger = styled(motion.div)``;
