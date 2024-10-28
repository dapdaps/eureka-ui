import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: relative;
  height: 50px;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #212330;
  padding: 5px 4px;
`;
export const StyledCursorWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0;
`;
export const StyledCursor = styled(motion.div)`
  border-radius: 6px;
  border: 1px solid #373a53;
  background: #32364b;
  position: absolute;
  flex: 1;
  height: 100%;
`;
export const StyledTabs = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  top: 0;
  left: 0;
`;
export const StyledTab = styled.div`
  height: 100%;
  color: #979abe;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex: 1;
`;
