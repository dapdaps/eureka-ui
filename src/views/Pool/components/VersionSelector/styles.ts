import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 77px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #2e3142;
  box-sizing: border-box;
  padding: 5px 12px;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: relative;
`;

export const StyledContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const StyledMenuWrapper = styled(motion.div)`
  padding-top: 2px;
  position: absolute;
  top: 32px;
  left: 0px;
`;

export const StyledMenu = styled.div`
  width: 77px;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #2e3142;
`;

export const StyledItem = styled.div`
  font-size: 12px;
  padding: 5px 12px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;
