import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  height: 45px;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #2e3142;
  position: relative;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 15px;
`;

export const StyledContent = styled.div`
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledMenuWrapper = styled(motion.div)`
  padding-top: 2px;
  position: absolute;
  width: 100%;
  top: 46px;
  left: 0px;
`;

export const StyledMenu = styled.div`
  width: 100%;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #2e3142;
  padding: 10px 0px;
`;

export const StyledItem = styled.div`
  font-size: 14px;
  padding: 10px 12px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;
