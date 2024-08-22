import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  max-width: 1260px;;
  min-width: 1060px;;
  margin: 0 auto;
`;

export const StyledContainerInner = styled(motion.div)`
  padding: 0 0 0 0;
  margin-bottom: 100px;
`;

export const StyledMoreContainer = styled.div`
  color: #ffffff;
  text-align: center;
  margin-bottom: 80px;
`;

export const StyledMoreText = styled.div`
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
  margin-bottom: 20px;
  padding-top: 50px;
`;

export const StyledRelatedContainer = styled.div`
  margin-top: 50px;
  display: flex;
  gap: 68px;
`;
export const StyledRecordContainer = styled.div`
  flex: 1;
`;
export const StyledRelatedOdyssey = styled.div`
  max-width: 500px;
  width: 100%;
  min-width: 320px;
`;

export const StyledArrowDown = styled(motion.div)`
  font-family: Montserrat;
  font-size: 20px;
  font-weight: 600;
  background: linear-gradient(90deg, #FFF 0%, #979ABE 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: fit-content;
  margin: 0 auto;
`;

export const StyledArrowDownWrapper = styled.div`
  height: 40px;
  width: 100px;
  margin: 0 auto;
  cursor: pointer;
`;
