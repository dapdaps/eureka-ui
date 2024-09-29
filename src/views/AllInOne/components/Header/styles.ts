import styled from 'styled-components';

export const StyledArrowIconWrap = styled.div`
  cursor: pointer;
  transition: all 0.15s ease-in-out;
`;

export const StyledHeader = styled.div`
  position: relative;
  z-index: 1;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const StyledLogo = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;

  .chain-logo {
    width: 100%;
    height: 100%;

    &:not([src]) {
      opacity: 0;
    }
  }
`;

export const StyledLogoContainer = styled.div<{ selectBgColor: string }>`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: ${(props) => props.selectBgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

export const StyledMainLogo = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

export const StyledPopup = styled.div`
  position: absolute;
  top: 160px;
  left: calc(50% - 120px);
  background: #303142;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  padding: 12px;
  width: 249px;
  max-height: 450px;
  overflow-y: auto;
  z-index: 52;
`;

export const StyledPopupImg = styled.div`
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 8px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
`;

export const StyledPopupItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-radius: 8px;

  .flex-grow {
    flex-grow: 1;
  }

  &:hover,
  &.selected {
    background: #2a2a3a;
  }
`;

export const StyledPopupText = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #fff;
`;

export const StyledTitle = styled.div`
  font-size: 26px;
  font-weight: bolder;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
`;

export const StyledBgLogo = styled.img`
  position: absolute;
  width: 200px;
  height: 200px;
  left: 0;
  top: 0;
  z-index: 0;
  opacity: 0.1;

  &:not([src]) {
    opacity: 0;
  }
`;
