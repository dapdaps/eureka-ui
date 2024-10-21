import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledAsset = styled.div<{ $isMulti?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;

  ${({ $isMulti }) => {
    if ($isMulti) {
      return {
        border: '1px solid rgb(55, 58, 83)',
        padding: '5px 12px',
        borderRadius: 8,
        cursor: 'pointer'
      };
    }
  }};
`;
export const StyledIcon = styled(motion.img)`
  width: 26px;
  height: 26px;
  border-radius: 50%;
`;
export const StyledSymbol = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: var(--agg-primary-color, #fff);
`;

export const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const StyledListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  transition: all 0.2s linear;
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;
export const StyledListToken = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 14px;

  .token-symbol {
    font-size: 18px;
  }
`;
export const StyledListBalance = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  font-size: 14px;

  .balance-usd {
    font-size: 18px;
  }
`;
