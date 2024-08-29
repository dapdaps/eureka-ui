import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Market = styled.div`
  width: 100%;
  .merge-asset {
    width: 36%;
  }
`;
export const MarketTableHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  gap: 4px;
  padding-left: 20px;
  padding-bottom: 12px;
  color: #979ABE;
  font-family: Gantari;
`;
export const Item = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;

  cursor: pointer;
  &.td {
    min-height: 84px;
  }
  &.asset {
    color: #7c7f96;
    justify-content: left;
    flex-grow: 0;
  }
  &.head_apy {
    justify-content: flex-start;
  }
  &.apy {
    flex-direction: column;
    align-items: flex-start;
    padding: 6px 0;
  }
  &.w_60 {
    width: 60%;
  }
  &.w_40 {
    width: 40%;
  }
  &.w_33 {
    width: 33.33333333%;
  }
  
  &.w_50 {
    width: 50%;
  }
  &.w_15 {
    width: 15%;
  }
`;
export const RewardApyItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
export const RewardIcon = styled.img`
  width: 14px;
  height: 14px;
`;
export const RewardApy = styled.div`
  font-weight: 400;
  line-height: 14px;
  color: rgba(255, 255, 255, 0.5);
`;
export const MergeItems = styled.div`
  display: flex;
  align-items: center;
  border-radius: 6px;
  height: 100%;
  &.supply {
    width: 24%;
  }
  &.borrow {
    width: 40%;
  }
`;
export const ArrowIconWrapper = styled.div`
  opacity: 0.3;
  cursor: pointer;
  transform: rotate(90deg);
  transition: transform .2s ease;

  &.active {
    opacity: 1;
  }
  &.open {
    transform: rotate(0deg);
  }
  &.open-active {
    transform: rotate(90deg);
  }
`;
export const Row = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  border-radius: 16px;
  background: #262836;
  border: 1px solid #373A53;
`;

export const Items = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-left: 20px;
`;

export const StyledExtraInfo = styled(motion.div)`
  background: #2e3142;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  padding-left: 20px;
  padding-bottom: 20px;
`;

export const StyledExtraInfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  &:first-child {
    border-top: 1px solid #373A53;
    border-bottom: 1px solid #373A53;
    margin-bottom: 16px;
  }
`;

export const StyledExtraInfoTab = styled.div`
  padding: 15px 0;
  border-right: 1px solid #373A53;
  width: 250px;
  text-align: center;
  color: #979ABE;
  font-family: Gantari;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    flex-shrink: 0;
    width: 0;
    height: 0;
    transition: background .2s ease;
  }

  &.active {
    color: #ffffff;
    &::before {
      height: 5px;
      width: 100%;
      background: #ffffff;
    }
  }
`;

export const StyledListBlock = styled.div`
  padding-right: 6%;
`;
export const StyledListTitle = styled.div`
  color: #FFF;
  font-weight: 400;
  font-family: Gantari;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const StyledListItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const StyledListLabel = styled.div`
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-weight: 400;
  
  .value {
    color: #ffffff;
  }
`;

export const StyledInfoTip = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  column-gap: 10px;
  color: #EBF479;
  background-color: rgba(235, 244, 121, 0.1);
  padding: 8px 12px;
  border-radius: 8px;
  margin-top: 22px;
  
  
  .tip-icon {
    flex-shrink: 0;
    margin-top: 5px;
  }
`;
