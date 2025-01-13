import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
`;
export const StyledTooltip = styled(motion.div)`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #333648;
  background: #1f2229;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  color: #979abe;
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
export const StyledTooltipTrigger = styled(motion.div)``;
