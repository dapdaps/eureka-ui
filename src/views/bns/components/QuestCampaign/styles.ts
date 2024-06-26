import { motion } from 'framer-motion';
import styled from 'styled-components';

export { StyledCoin, StyledTitle } from '@/views/Quest/styles';
export { StyledButton, StyledFlex, StyledLoadingWrapper, StyledSvg, StyledText, StyledWrapper } from '../../styles';

export const StyledCampaipnsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledQuestCampaign = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-radius: 32px;
  padding: 30px 0 40px;
  background: radial-gradient(100% 100% at 0% 0%, #ae92ff 0%, #6d2df3 100%);
`;
export const StyledCampaipnContainer = styled.div`
  padding: 0 30px;
  box-sizing: border-box;
  /* display: flex;
  justify-content: space-between; */
  /* align-items: center; */
`;

export const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const StyledHeader = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 31.2px */
  text-transform: capitalize;
`;

export const StyledHeartBox = styled(motion.div)<{ $active?: boolean }>`
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.3);
  width: 41px;
  height: 30px;
  text-align: center;
  padding-top: 2px;
  cursor: pointer;

  ${({ $active }) =>
    $active &&
    `
  border: 1px solid rgba(255, 107, 142, 0.30);
  background: rgba(255, 107, 142, 0.15);`}
`;

export const StyledDesc = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  margin-top: 16px;
`;

export const StyledTags = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

export const StyledTag = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.3);
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0px 12px;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
`;

export const JoinedAccountsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  align-self: flex-end;
`;
export const JoinedAccounts = styled.div`
  display: flex;
  align-items: center;
  gap: -6px;
`;

export const JoinedAccountsAmount = styled.div`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StyledTimerBox = styled.div`
  display: flex;
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  gap: 20px;
`;

export const StyledQuestList = styled.div`
  position: relative;
  padding-left: 31px;

  .swiper {
    overflow: hidden;
  }
`;
export const StyledSwiperButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 10px;
  top: 76px;
  width: 36px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: #393a4c;
  z-index: 10;
  &.right {
    left: unset;
    right: 10px;
  }
`;

export const StyledTips = styled.div`
  color: #979abe;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  padding: 50px 0 40px;
`;
