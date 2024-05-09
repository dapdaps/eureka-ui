import styled from 'styled-components';

export const StyledContainer = styled.div`
  margin: 0 8%;
  color: #ffffff;
  position: relative;
  padding-top: 50px;
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
export const StyledLogo = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;

  .chain-logo {
    width: 100%;
    height: 100%;
  }
`;
export const StyledImage = styled.img<{ iconColor: string }>`
  transform: translateX(40px);
  -webkit-filter: ${props => `drop-shadow(${props.iconColor} -40px 0 0);`};
  -moz-filter: ${props => `drop-shadow(${props.iconColor} -40px 0 0);`};
  -ms-filter: ${props => `drop-shadow(${props.iconColor} -40px 0 0);`};
  filter: ${props => `drop-shadow(${props.iconColor} -40px 0 0);`};
  width: 100%;
  height: 100%;
`;

export const StyledTitle = styled.div`
  font-size: 26px;
  font-weight: bolder;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
`;
export const StyledArrowIconWrap = styled.div`
  cursor: pointer;
  transition: all 0.15s ease-in-out;
`;
export const StyledHeader = styled.div`
  position: relative;
  //width: 948px;
`;

export const StyledLogoBg = styled.img`
  width: 200px;
  height: 200px;
  opacity: 0.1;
  position: absolute;
`;
export const StyledMainHeader = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  z-index: 1;
`;

export const StyledContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const StyledMainLogo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const StyledShadow = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 0;
`;

export const StyledPopup = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: #303142;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  padding: 12px;
  width: 249px;
  max-height: 450px;
  overflow-y: auto;
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
export const StyledPopupImg = styled.div`
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 8px;
  margin-right: 8px;
`;
export const StyledPopupText = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #fff;
`;
