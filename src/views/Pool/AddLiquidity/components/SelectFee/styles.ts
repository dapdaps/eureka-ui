import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  margin-top: 16px;
`;

export const StyledHeader = styled.div`
  height: 48px;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #2e3142;
  padding: 11px 11px 11px 14px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledHeaderLeft = styled.div<{ $empty: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ $empty }) => ($empty ? '#979ABE' : '#fff')};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StyledSelectedFee = styled.div`
  padding: 3px 6px 5px 7px;
  border-radius: 4px;
  border: 1px solid #8d8d8d;
  background: #8d8d8d;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StyledToggleButton = styled.div`
  border-radius: 4px;
  border: 1px solid #373a53;
  background: #2e3142;
  padding: 4px 7px;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;

export const StyledFees = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 8px;
`;

export const StyledFee = styled.div<{ $active: boolean }>`
  flex-grow: 1;
  flex-shrink: 0;
  border-radius: 8px;
  background: #2e3142;
  padding: 10px 7px 5px 8px;
  border: 1px solid ${({ $active }) => ($active ? 'var(--border-color)' : '#373A53')};
`;

export const StyledFeeTitle = styled.div`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledFeeDesc = styled.div`
  color: #979abe;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
