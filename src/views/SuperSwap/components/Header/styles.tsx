import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 14px;
`;

export const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding-left: 16px;
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  line-height: 100%;
`;

export const StyleChainWrapper = styled.div`
  position: relative;
`;

export const StyledChain = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.7;
  }
`;

export const StyledChainLogo = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 4px;
`;

export const StyledArrowIcon = styled.div`
  transition: 0.5s;

  &.expand {
    transform: rotate(-180deg);
  }
`;

export const StyledChainListWrapper = styled(motion.div)`
  padding-top: 4px;
  position: absolute;
  top: 30px;
  left: 0px;
  z-index: 20;
`;
export const StyledChainList = styled.div`
  border-radius: 4px;
  border: 1px solid #373a53;
  background: #20212d;
  width: 180px;
  height: 400px;
  overflow-y: auto;
`;
export const StyledChainItem = styled.div`
  height: 44px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  &:hover {
    background: #373737;
  }
`;
export const StyledChainTokenIcon = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;
export const StyledChainTokenSymbol = styled.div`
  color: #fff;
  font-size: 14px;
`;
