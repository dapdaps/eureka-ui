import React, { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

const Tooltip = (props: Props) => {
  const { children, tooltip, style, tooltipStyle } = props;

  const triggerRef = useRef<any>();
  const tooltipRef = useRef<any>();
  const [visible, setVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const el = triggerRef.current;
    const onMouseMove = (e: MouseEvent) => {
      const elTooltip = tooltipRef.current;
      if (el && el.getBoundingClientRect()) {
        const { width, height, x, y } = el.getBoundingClientRect();
        setX(x);
        setY(y - 15 - height);
        const middleWidth = x + width / 2;
        if (elTooltip) {
          const { width: w } = elTooltip.getBoundingClientRect();
          const targetMiddleWidth = x + w / 2;
          let targetX = x - (targetMiddleWidth - middleWidth);
          if (targetX < 0) {
            targetX = 0;
          }
          if (targetX + w > window.innerWidth) {
            targetX = window.innerWidth - w;
          }
          setX(targetX);
        }
        return;
      }
      setX(e.clientX);
      setY(e.clientY);
    };
    const onMouseEnter = () => {
      setVisible(true);
    };
    const onMouseLeave = () => {
      setVisible(false);
    };
    el && el.addEventListener('mousemove', onMouseMove);
    el && el.addEventListener('mouseenter', onMouseEnter);
    el && el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el && el.removeEventListener('mousemove', onMouseMove);
      el && el.removeEventListener('mouseenter', onMouseEnter);
      el && el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  if (!tooltip) return children;

  const popup = (
    <StyledTooltip
      ref={tooltipRef}
      style={{
        ...tooltipStyle,
        left: x,
        top: y,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 10,
      }}
      initial={{
        opacity: 0,
        y: 10,
      }}
    >
      {tooltip}
    </StyledTooltip>
  );

  return (
    <StyledContainer style={style}>
      <StyledTooltipTrigger ref={triggerRef}>
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
  style?: React.CSSProperties;
  tooltipStyle?: React.CSSProperties;
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
  padding: 12px 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;
const StyledTooltipTrigger = styled.div``;
