import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledContainer = styled.div``;
export const StyledTabs = styled.div``;
export const StyledTabsHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1000px;
  position: relative;
  margin: 0 auto;
  &::before {
    content: '';
    width: 100%;
    height: 1px;
    position: absolute;
    background: linear-gradient(90deg, rgba(22, 24, 29, 0) 0%, #373a53 50%, rgba(22, 24, 29, 0) 100%);
    bottom: -1px;
  }
`;
export const StyledTabsContent = styled.div`
  position: relative;
  padding: 20px 0;
`;
export const StyledTabsHeadItem = styled.div`
  padding: 16px 70px;
  color: #979abe;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  cursor: pointer;
  border-bottom: 2px solid transparent;

  &.active {
    color: #fff;
    border-color: #fff;
  }
`;
export const StyledTabsContentItem = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;
