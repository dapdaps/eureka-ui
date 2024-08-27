import { motion } from 'framer-motion';
import { styled } from 'styled-components';

export const StyledContainer = styled.div`
  position: relative;
  font-family: Montserrat;
`;
export const StyledCard = styled.div``;
export const StyledContent = styled.div`
  padding: 30px 30px 6px 32px;
`;
export const StyledFoot = styled.div`
  padding: 0 20px 20px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  gap: 20px;
  position: relative;
`;
export const StyledCardTitle = styled.div`
  color: #EBF479;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;
export const StyledCardArticle = styled.article`
  color: #FFF;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin-top: 13px;
`;
export const StyledBadge = styled.div`
  display: inline-block;
  height: 22px;
  line-height: 20px;
  border: 1px solid #EBF479;
  border-radius: 6px;
  white-space: nowrap;
  padding: 0 6px;
  color: #EBF479;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`;
export const StyledButton = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 10px;
  background: #EBF479;
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  padding: 0 27px;
`;
export const StyledClose = styled.button`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  right: 12px;
  top: 12px;
  opacity: 0.8;
  transition: opacity 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;

  &:hover {
    opacity: 1;
  }
`;
export const StyledPagination =  styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #414450;
  transition: background 0.2s ease;
  cursor: pointer;

  &.active {
    background: #EBF479;
  }
`;
