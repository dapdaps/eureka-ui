import { motion } from 'framer-motion';
import { styled } from 'styled-components';

export const StyledContainer = styled.div`
  display: inline-block;
  height: 40px;
  position: relative;
  padding: 0 12px 0 16px;
  transition: background linear 0.2s;
  
  &.dropdown-selector {
    border-radius: 10px;
    border: 1px solid #333648;
    background: #18191E;

    &:hover,
    &.opened {
      background: #1F2229;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
    }
  }
`;
export const StyledInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 13px;
  cursor: pointer;
`;
export const StyledShown = styled.div`
  color: #FFF;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;
export const StyledArrow = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;
export const StyledPopup = styled(motion.div)`
  top: 44px;
  width: 100%;
  position: absolute;
  z-index: 2;
  border-radius: 10px;
  border: 1px solid #333648;
  background: #1F2229;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  padding-top: 1px;
  padding-bottom: 1px;
  left: 0;
  color: #FFF;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  overflow-y: auto;
`;

export const StyledPopupList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const StyledPopupItem = styled.ul`
  width: 100%;
  height: 46px;
  line-height: 46px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 16px;
  padding-right: 14px;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;
export const StyledPopupItemInner = styled.div`
  flex: 1;
  width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const StyledPopupItemCheck = styled.div`
  margin-left: auto;
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #EBF479;
`;
