import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding: 20px 22px 44px 20px;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 36px;
  `;

export const StyledHeaderTitle = styled.div`
  font-size: 18px;
  color: #fff;
  `;
export const StyledCloseIcon = styled.div`
  color: #979ABE;
  & > div {
    width: 24px !important;
    height: 24px !important;
  }
`;

export const StyledBody = styled.div`
  
`;
export const StyledBodyItem = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .select-container {
    border-radius: 8px;
    border: 1px solid #373A53;
    background: #2E3142;
    padding: 8px 13px;
    position: relative;
    align-items: center;
    justify-content: flex-start;
    width: 136px;
  }
  &:not(&:last-child) {
    margin-bottom: 23px;
  }
`;
export const StyledItemTitle = styled.div`
  flex: 1;
  flex-shrink: 0;
  white-space: nowrap;
  color: #fff;
`;
export const StyledItemSlippage = styled.div`
  border-radius: 8px;
  border: 1px solid #373A53;
  background: #2E3142;
  padding: 5px 8px;
  text-align: center;
  cursor: pointer;
  margin-left: 12px;
  min-width: 56px;
  color: #fff;
  &.active,
  &:hover {
    color: #EBF479;
    border: 1px solid #EBF479;
  }
`;

export const StyledArrowIconWrap = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  flex-shrink: 0;
  color: ${props => props.isSelected ? '#fff' : '#979ABE' };
  transform: ${props => props.isSelected ? 'rotate(180deg)' : 'rotate(0deg)' };
`;

export const StyledPopupItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  &:not(&:last-child) {
    margin-bottom: 5px;
  }

  .flex-grow {
    flex-grow: 1;
  }

  &:hover {
    background: #2a2a3a;
  }
`;

export const StyledPopupText = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #fff;
`;

export const StyledTitle = styled.div`
  font-size: 16px;
  white-space: nowrap;
  cursor: pointer;
  color: #fff;
  text-overflow: ellipsis;
  overflow: hidden;
  flex-grow: 1;
`;

export const StyledPopup = styled.div`
  position: absolute;
  top: 41px;
  left: 0;
  background: #303142;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  border-radius: 0 0 12px 12px;
  padding: 7px 0;
  width: 136px;
  max-height: 450px;
  overflow-y: auto;
`;

export const StyledInput = styled.div`
  border-radius: 8px;
  border: 1px solid #373A53;
  background: #2E3142;
  padding: 5px 6px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 9px;
  margin-left: 10px;
  .custom-input {
    width: 60px;
    flex-shrink: 0;
    color: #fff;
  }
  &:hover,
  &.active {
    color: #EBF479;
    border: 1px solid #EBF479;
  }
  `;

export const StyledSuffix = styled.div`
  flex-shrink: 0;
`;