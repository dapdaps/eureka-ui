import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledNetworkTabWrapper = styled.div<{fold: boolean}>`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 38px;
  height: ${({ fold }) => fold ? '120px' : 'unset'};
  overflow: hidden;
`;

export const StyledTabItem = styled(motion.div)`
  border-radius: 8px;
  border: 1px solid #282A3C;
  background: #1B1D25;
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 7px;
  width: 158px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    &:not(.disabled) {
      background: #262836;
      border-color: #373A53;
    }
  }

  &.active {
    border: 1px solid #EBF479;
    background: rgba(53, 55, 73, 0.50);
    .item-icon {
      color: #EBF479;
    }
  }
  &.disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const StyledItemIcon = styled.div<{ url?: string }>`
  color: #2D2F42;
  width: 36px;
  height: 36px;
  background: ${props => props?.url ? `url("${props.url}") center no-repeat`: 'unset' };
  background-size: contain;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const StyledItemContent = styled.div`
  color: #2D2F42;
  width: 0;
  flex: 1;
`;

export const StyledItemName = styled.div`
  color: #7C7F96;
  font-size: 13px;
  font-weight: 400;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 15px;
  white-space: nowrap;
`;

export const StyledItemNum = styled.div<{ $blur?: boolean; }>`
  display: flex;
  align-items: flex-end;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1;
  white-space: nowrap;
  column-gap: 5px;
  margin-top: 4px;

  filter: ${({ $blur }) => $blur ? 'blur(5px)' : 'unset'};
`;

export const StyledItemUSD = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
`;