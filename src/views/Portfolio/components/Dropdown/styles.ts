import { styled } from 'styled-components';
import { motion } from 'framer-motion';

export const StyledContainer = styled.div`
  height: 26px;
  color: #979ABE;
  text-align: right;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  padding: 0 10px 0 9px;
  border-radius: 6px;
  border: 1px solid #3D405A;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 9px;
  cursor: pointer;
  position: relative;
`;

export const StyledShown = styled.div`
`;

export const StyledArrow = styled(motion.div)`
`;

export const StyledDropdown = styled(motion.div)<{ placement: 'left' | 'right' }>`
  width: 100%;
  position: absolute;
  z-index: 1;
  right: 0;
  top: 24px;
  background: #1B1D25;
  border-radius: 6px;
  border: 1px solid #282A3C;
  max-height: 350px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 5px;
  
  ${({ placement }) => {
    if (placement === 'right') {
      return {
        left: 'unset',
        right: 0,
      }
    }
    if (placement === 'left') {
      return {
        right: 'unset',
        left: 0,
      }
    }
  }}
`;

export const StyledList = styled.ul`
  list-style: none;
  padding: 4px 0;
  margin: 0;
  display: flex;
  text-align: left;
  flex-direction: column;
  align-items: stretch;
`;

export const StyledItem = styled.li`
  padding: 4px 12px;
  transition: all .3s ease-in-out;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: #262836;
  }
`;
