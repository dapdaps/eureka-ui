import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  border-radius: 16px;
  background: var(--agg-secondary-color, #262836);
  border: 1px solid var(--agg-border-color, #373a53);
`;
export const StyledExpandIcon = styled.div`
  cursor: pointer;
  margin-left: auto;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: 100%;
`;
export const StyledExpandIconSvg = styled.svg`
  transform-origin: center;
  transform: rotate(-90deg);
  transition: 0.3s;

  &.expand {
    transform: rotate(0deg);
  }
`;
export const StyledContent = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: var(--agg-primary-color, #fff);
  flex: 1;
`;
export const StyledExpand = styled(motion.div)`
  border-top: none;
  height: 100%;
  background: var(--agg-secondary-color, #2e3142);
  border-radius: 0 0 16px 16px;
  padding-left: 22px;
  padding-right: 24px;
`;
export const StyledCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 84px;
  padding-left: 22px;
  padding-right: 22px;
`;
export const StyledExpandContent = styled.div`
  display: flex;
`;
