import styled from 'styled-components';

export const StyledBridgeContainer = styled.div`
  &.disabled {
    cursor: pointer !important;
  }
`;
export const StyledContainer = styled.div`
  position: relative;
`;
export const StyledBody = styled.div`
  position: relative;
`;
export const StyledFoot = styled.div`
  margin-top: 20px;
`;
export const StyledDownIcon = styled.div<{ disabled?: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 38px;
  height: 38px;
  border-radius: 8px;
  border: 4px solid #262836;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2E3142;
  cursor: pointer;
  transition: all .3s ease;
  z-index: 1;

  &:hover {
    background: ${({ disabled }) => disabled ? '#2E3142' : '#1f212d'};
  }
`;

export const StyledSelectorContainer = styled.div`
  position: relative;
`;
export const StyledSelector = styled.div`
  height: 36px;
  border-radius: 8px;
  border: 1px solid #373A53;
  background: #2E3142;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  cursor: pointer;
  gap: 8px;
  padding: 7px 10px 7px;

  .name {
    font-size: 16px;
    font-weight: 500;
    white-space: nowrap;
    line-height: 19px;
  }

  .arrow {
    transition: all 0.15s ease-in-out;
    margin-left: auto;
  }
`;
export const StyledSelectorIcon = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 8px;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledSelectorPopup = styled.div`
  padding: 0;
  margin: 0;
  border: 1px solid #373a53;
  border-radius: 12px;
  background-color: #303142;
  position: absolute;
  z-index: 1;
  left: 0;
  top: 36px;
  overflow-y: auto;

  .popup-item {
    margin: 0;
    padding: 0 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    transition: all .3s ease;
    gap: 10px;
    cursor: pointer;
    color: #fff;
    line-height: 38px;

    &:hover,
    &.selected {
      background: #2a2a3a;
    }

    .name {
      font-size: 14px;
      font-weight: 400;
    }

    .selected-check {
      margin-left: auto;
    }
  }
`;
