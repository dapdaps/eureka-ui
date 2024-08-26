import { motion } from 'framer-motion';
import styled from 'styled-components';

export const ProtocolSelectBox = styled.div`
  width: max-content;
  background: #303142;
  padding: 10px 16px;
  font-family: Gantari;
  font-size: 16px;
  font-weight: 400;
  border-radius: 12px;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  cursor: default;
  position: absolute;
  right: 0;
  top: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 100;
  .function-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    > div {
      cursor: pointer;
    }
  }
  .minimum-value-box {
    background: linear-gradient(0deg, rgba(11, 12, 19, 0.5), rgba(11, 12, 19, 0.5)),
      linear-gradient(0deg, #373a53, #373a53);
    border: 1px solid #373a53;
    padding: 8px 16px;
    border-radius: 12px;
    white-space: nowrap;
    margin-right: 12px;
  }
`;

export const StyledWalletContainer = styled(motion.div)``;

export const StyledLoading = styled.div<{ height?: string }>`
  height: ${({ height }) => height};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const  StyledWalletTable = styled.div`
  border-radius: 12px;
  border: 1px solid #373A53;
  overflow: hidden;
  background: #262836;
`;

export const  StyledWalletTableItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 27px;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  height: 60px;
  
  &:nth-child(even) {
    background: rgba(53, 55, 73, 0.50);
  }

  &:first-child {
    color: #7C7F96;
    border-bottom: 1px solid #373a53;
    padding-bottom: 10px;
  }
  
  &.portfolio-table-head {
    height: 48px;
  }
`;

export const  StyledTableItemTxt = styled.div`
  width: 21%;
  margin-right: 20px;
  display: flex;
  align-items: center;
  column-gap: 14px;
  &:first-child {
    width: 52%;
  }
  &:last-child {
    width: 10%;
    margin-right: 0;
  }
`;

export const StyledTokenIcon = styled.div`
  width: 26px;
  height: 26px;
  position: relative;
  overflow: visible;

  .chain-logo {
    width: 16px;
    height: 16px;
    border: 2px solid #262836;
    background: #262836;
    border-radius: 2px;
    position: absolute;
    z-index: 1;
    right: -1px;
    bottom: -2px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export const StyledTokenIconImg = styled.div<{ src: string }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${({ src }) => `url("${src}") no-repeat center / contain`};
`;
