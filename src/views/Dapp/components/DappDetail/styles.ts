import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledContainer = styled.div`
  width: 1260px;
  padding: 0 0 50px 0;
  margin: 0 auto;
`;

export const StyledMoreContainer = styled.div`
  color: #ffffff;
  text-align: center;
  padding-bottom: 80px;
`;

export const StyledMoreText = styled.div`
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
  margin-bottom: 20px;
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
  width: 500px;
  flex-shrink: 0;
`;

export const StyledArrowDown = styled(motion.div)`
  font-family: Montserrat;
  font-size: 20px;
  font-weight: 600;
  background: linear-gradient(90deg, #FFF 0%, #979ABE 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;