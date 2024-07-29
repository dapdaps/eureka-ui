import React from 'react';
import styled from 'styled-components';
import { motion, useTransform, useSpring } from 'framer-motion';

const StyledTooltip = styled(motion.div)`
  border: 1px solid;
  border-image-source: linear-gradient(180deg, #464b56 0%, rgba(0, 0, 0, 0) 100%);
  background: #21232a;
  box-shadow: 0px 10px 20px 0px #00000040;
  width: 244px;
  height: 205px;
  position: absolute;
  top: -205px;
  left: -90px;
  border-radius: 12px;
  padding: 26px 11px 13px 11px;
  box-sizing: border-box;
`;

interface TooltipProps {
  x: any;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ x, children }) => {
  const springConfig = { stiffness: 100, damping: 5 };
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig);
  return (
    <StyledTooltip
      initial={{ opacity: 0, y: 20, scale: 0.6 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 260,
          damping: 10,
        },
      }}
      exit={{ opacity: 0, y: 20, scale: 0.6 }}
      style={{
        translateX: translateX,
        rotate: rotate,
        whiteSpace: 'nowrap',
      }}
      className="tooltip"
    >
      {children}
    </StyledTooltip>
  );
};

export default Tooltip;
