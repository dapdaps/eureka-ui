import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledContainer = styled.div``;
export const StyledTabs = styled.div``;
export const StyledTabsHead = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: rgba(33, 35, 48, 0.5);
  width: auto;
`;
export const StyledTabsContent = styled.div`
  position: relative;
  padding: 20px 0;
`;
export const StyledTabsHeadItem = styled.div`
  border-radius: 8px;
  height: 32px;
  line-height: 32px;
  padding: 0 15px;
  color: #979abe;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  cursor: pointer;

  &.active {
    color: #fff;
    background: rgb(50, 54, 75);
  }
`;
export const StyledTabsContentItem = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;
