import { motion } from 'framer-motion';
import styled from 'styled-components';

export { StyledCoin } from '@/views/Quest/styles';

export const StyledContainer = styled.div`
  position: relative;
  width: 370px;
`;

export const StyledContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
`;

export const StyledBg = styled.div`
  position: absolute;
  z-index: 2;
  border-radius: 50%;
  opacity: 0.3;
  background: #9188ff;
  filter: blur(100px);
  width: 388px;
  height: 388px;
  top: -264px;
  left: 30px;
`;

export const StyledCircle = styled.div`
  width: 878px;
  height: 878px;
  border-radius: 50%;
  border: 1px solid #FFF;
  opacity: 0.06;
  position: absolute;
  z-index: 2;
  top: -722px;
  left: -215px;
`;



export const StyledNameWrapper = styled.div`
  width: calc(100% - 132px);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledName = styled.div`
  color: #fff;
  text-align: left;
  font-size: 32px;
  font-weight: 600;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 100%;
`;

export const StyledAddress = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  line-height: 100%;
`;

export const StyledLabels = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 35px;
`;

export const StyledLabel = styled.div`
  border-radius: 32px;
  border: 1px solid #373a53;
  background: #1c1d29;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  height: 40px;
  box-sizing: border-box;
`;

export const StyledInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

export const StyledLabelsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledSocialsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StyledSocialItem = styled(motion.button)`
  border-radius: 20px;
  border: 1px solid #21232a;
  background: rgba(22, 24, 29, 0.5);
  backdrop-filter: blur(3px);
  height: 40px;
  flex-shrink: 0;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  gap: 8px;
  color: #373a53;
  font-size: 14px;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  position: relative;
  .telegram_button {
    position: absolute;
    left: 0px;
    right: 0px;
    opacity: 0;

    width: 100%;
    height: 100%;
    overflow: hidden;
    iframe {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
`;
