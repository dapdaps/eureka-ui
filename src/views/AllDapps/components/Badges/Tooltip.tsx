import React, { memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Tooltip = (props: Props) => {
  const { children, tooltip, style } = props;

  return (
    <StyledContainer
      initial="hidden"
      whileHover="visible"
      style={style}
    >
      {children}
      <StyledTooltip
        variants={{
          visible: {
            display: 'flex',
            opacity: 1,
            y: 'calc(-100% - 6px)',
          },
          hidden: {
            display: 'none',
            opacity: 0,
            y: 'calc(-100%)',
          },
        }}
      >
        {tooltip}
      </StyledTooltip>
    </StyledContainer>
  );
};

export default memo(Tooltip);

export interface Props {
  children: any;
  tooltip: any;
  style?: React.CSSProperties;
}

const StyledContainer = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
`;
const StyledTooltip = styled(motion.div)`
  position: absolute;
  z-index: 1;
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
  top: 0;
`;
