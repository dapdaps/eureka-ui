import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PortfolioTabs = styled.div`
  font-family: Montserrat;
`;

export const PortfolioTabContent = styled.div`
`;

export const StyledPortfolioTabHead = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  font-size: 20px;
  position: relative;
  padding: 0 0 11px;
  background: #101115;
  margin-bottom: 24px;
  border-bottom: 1px solid  #373A53;
  overflow-x: hidden;
`;

export const StyledTabItem = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  color: #979ABE;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  
  &.active {
    color: #fff;
  }
`;

export const StyledPortfolioTabCursor = styled(motion.div)`
  width: 200px;
  height: 2px;
  background: white;
  position: absolute;
  left: 0;
  bottom: 0;
`;