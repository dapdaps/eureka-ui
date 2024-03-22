import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  border-radius: 16px;
  border: 1px solid #373a53;
  background-color: #1d1f29;

  .color {
    color: #fcc42c;
    font-weight: 500;
  }

  .mt {
    margin-top: 12px;
  }
`;

export const StyledTop = styled(motion.header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #262836;
  height: 48px;
  padding: 14px;
  box-sizing: border-box;
  cursor: pointer;
`;

export const StyledTopLeft = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  gap: 10px;
`;

export const StyledTokenIcon = styled.img`
  width: 22px;
  height: 22px;
`;

export const StyledExpand = styled.div<{ $expand: boolean }>`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid #979abe;
  background-color: ${({ $expand }) => ($expand ? '#979abe' : 'transparent')};
  color: ${({ $expand }) => ($expand ? '#fff' : '#979ABE')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;

export const StyledExpandContainer = styled(motion.section)`
  color: #979abe;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StyledExpandContent = styled.div`
  padding: 14px 14px 24px;
  border-top: 1px solid #373a53;

  .white {
    color: #fff;
  }
`;

export const StyledItem = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const StyledMainItems = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledMainItem = styled.div`
  width: 33%;
`;

export const StyledOpenInWallet = styled.button`
  width: 115px;
  height: 26px;
  border-radius: 8px;
  background: #fcc42c;
  color: #000;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  margin-top: 9px;
  transition: 0.3s;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;
