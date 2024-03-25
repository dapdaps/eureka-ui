import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 792px;
  margin: 100px auto 0px;
`;

export const StyledTitle = styled.div`
  font-family: Gantari;
  font-size: 36px;
  font-weight: 600;
  line-height: 100%;
  background: linear-gradient(180deg, #fff 0%, #afafaf 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const StyledList = styled.div`
  padding: 20px 0px;
`;

export const StyledItemContainer = styled.div`
  margin-bottom: 16px;
  border-radius: 16px;
  border: 1px solid #373a53;
  background-color: #2e3142;
`;

export const StyledItemTop = styled(motion.header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #262836;
  height: 84px;
  padding: 30px;
  box-sizing: border-box;
  cursor: pointer;
`;

export const StyledItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
`;

export const StyledItemIcon = styled.img`
  width: 26px;
  height: 26px;
`;

export const StyledIconBox = styled.div`
  cursor: pointer;
  transition: 0.5s;
  position: relative;
  &:hover {
    opacity: 0.8;
  }
  &.open {
    transform: rotate(-90deg);
  }
  svg {
    vertical-align: inherit;
  }
`;

export const StyledExpandContainer = styled(motion.section)`
  color: #fff;
  font-family: Gantari;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;

  .title2 {
    font-size: 20px;
    font-weight: 800;
    margin-top: 10px;
  }

  .title3 {
    font-size: 18px;
    font-weight: 700;
    margin-top: 10px;
  }

  .mt-10 {
    margin-top: 10px;
  }
`;

export const StyledExpandContent = styled.div`
  padding: 26px 30px;
  border-top: 1px solid #373a53;
`;
