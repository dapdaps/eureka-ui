import styled from 'styled-components';

import type { Align } from '../Pts/types';

export { LoadingWrapper, Empty } from '../../styles';

export const StyledTitle = styled.div`
  color: #fff;
  font-size: 26px;
  font-weight: 500;
`;

export const StyledSubTitle = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 500;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding: 0px 30px;
`;

export const StyledCopyButton = styled.div`
  width: 119px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 18px;
  border: 1px solid #373a53;
  background: rgba(55, 58, 83, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;

export const StyledNewCodes = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0px 30px;
  margin-top: 20px;
  margin-bottom: 38px;
  flex-wrap: nowrap;
  overflow-x: auto;
`;

export const StyledNewCodeBox = styled.div`
  position: relative;
  width: 203px;
  height: 52px;
  flex-shrink: 0;
`;

export const StyledNewCodeBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const StyledNewCode = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 700;
  position: absolute;
  z-index: 10;
  top: 16px;
  left: 74px;
`;

export const StyledCopyIcon = styled.div`
  position: absolute;
  z-index: 10;
  top: 14px;
  right: 15px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;

export const StyledDescBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
  padding: 0px 30px;
`;

export const StyledDesc = styled.div`
  color: #979abe;
  font-size: 16px;
  font-weight: 500;
  flex-grow: 1;
`;

export const StyledClaimButton = styled.button`
  border-radius: 10px;
  background: linear-gradient(180deg, #EEF3BF 0%, #E9F456 100%);
  padding: 0px 12px;
  height: 42px;
  flex-shrink: 0;
  color: #000;
  font-size: 16px;
  font-weight: 600;
  transition: 0.3s;
  &:not(:disabled):hover {
    opacity: 0.8;
  }
  &:not(:disabled):active {
    opacity: 0.6;
  }
  &:disabled {
    opacity: 0.6;
  }
`;

export const StyledRow = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  transition: 0.3s;
  margin-bottom: 20px;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  padding: 10px 30px;

  &:hover {
    background: rgba(55, 58, 83, 0.2);
  }
`;

export const StyledColumn = styled.div<{ $width: number; $align?: Align }>`
  width: ${({ $width }) => $width + '%'};
  text-align: ${({ $align }) => $align};
`;

export const StyledTableHeader = styled.div`
  display: flex;
  align-items: center;
  color: #979abe;
  font-size: 14px;
  font-weight: 400;
  padding: 0px 30px 10px;
  margin-top: 30px;
`;

export const StyledBody = styled.div`
  max-height: calc(100vh - 410px);
  overflow-y: auto;
`;

export const StyledCell = styled.div<{ $gap?: number; $width: number; $align?: Align }>`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => $gap + 'px'};
  width: ${({ $width }) => $width + '%'};
  justify-content: ${({ $align }) => ($align === 'left' ? 'flex-start' : $align === 'right' ? 'flex-end' : 'center')};

  & .delete {
    text-decoration: line-through;
  }

  & .rewards {
    color: #ebf479;
  }
`;

export const StyledAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const StyledRewards = styled.div`
  border-radius: 12px;
  border: 1px solid rgba(235, 244, 121, 0.3);
  width: 90px;
  height: 37px;
  flex-shrink: 0;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  line-height: 36px;
`;

export const StyledUserName = styled.div`
  font-weight: 500;
`;

export const StyledUserAddress = styled.div`
  font-size: 14px;
  margin-top: 2px;
`;

export const StyledPendingCell = styled.div`
  cursor: pointer;
  position: relative;

  &:hover {
    opacity: 0.8;

    & .hints {
      opacity: 1;
    }
  }
`;
export const StyledLink = styled.div`
  position: relative;
`

export const StyledTips = styled.div`
  position: absolute;
  left: 8px;
  top: -15px;
  width: 132px;
  height: 25px;
  border-radius: 5px;
  background: linear-gradient(to left, #000 0%, #414D58 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`
export const StyledBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 196px;
  background: #1B1C27;
`