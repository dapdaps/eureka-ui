import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledContainer = styled.button`
  background: transparent;
  cursor: default;
  overflow: hidden;
`;
export const StyledNumbers = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
`;
export const StyledNumber = styled.div`
  color: #000;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
