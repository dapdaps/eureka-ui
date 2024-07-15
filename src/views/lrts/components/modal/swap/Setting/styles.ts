import styled from 'styled-components';
import { motion } from 'framer-motion';

export const MaskLayer = styled(motion.div)`
  position: fixed;
  top: 80px;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
`;

export const StyledContainer = styled(motion.div)`
  z-index: 100;
  position: absolute;
  left: 130px;
  top: 0px;
`;

export const StyledContent = styled.div`
  width: 284px;
  height: 104px;
  padding: 14px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #3f3f3f;
  background: #2f2f2f;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
`;

export const SlippageActions = styled.div`
  border-radius: 6px;
  border: 1px solid #3f3f3f;
  padding: 3px;
  box-sizing: border-box;
  display: flex;
`;
export const SlippageAction = styled.div`
  padding: 6px;
  border-radius: 10px;
  cursor: pointer;
  height: 36px;
  box-sizing: border-box;
  min-width: 64px;
  text-align: center;
  &.active {
    border-radius: 6px;
    background: #272727;
  }
`;

export const Inputs = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

export const InputWrapper = styled.div`
  width: 103px;
  height: 45px;
  border-radius: 6px;
  border: 1px solid #3f3f3f;
  background: #272727;
  display: flex;
  gap: 10px;
  align-items: center;
  padding-right: 10px;
`;
export const Input = styled.input`
  border: none;
  line-height: 44px;
  padding-left: 20px;
  background-color: transparent;
  outline: none;
  width: 68px;
  color: #fff;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;
