import styled from 'styled-components';

export const StyledMatrixContainer = styled.div`
  padding: 0 ${() => `var(--odyssey2-container-gutter)`};
  max-width: ${() => `var(--odyssey2-container-width)`};
  width: 100%;
  border-radius: 10px;
  margin-bottom: 120px;
`;

export const StyledMatrixBorder = styled.div`
  border-radius: 12px;
  border: 1px solid #33C5F4;
`;

export const StyledMatrixTag = styled.div`
  width: 325px;
  height: 39px;
  color: #000;
  font-family: Trans-America;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  padding: 8px 41px 8px 22px;
  margin-bottom: 20px;
  background: url('/images/odyssey/v2-1/matrix-title.svg') center no-repeat;
  background-size: contain;
`;

export const StyledTitleContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 22px;
  justify-content: center;
  margin-bottom: 20px;
`;

export const StyledTitle = styled.div`
  background: linear-gradient(180deg, #FFF 39.2%, #33C5F4 80%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-family: Trans-America;
  font-size: 60px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 60px */
`;

export const StyledSubTitle = styled.div`
  font-weight: 300;
  font-size: 18px;
  color: #fff;
  text-align: center;
  margin-bottom: 40px;
`;

export const StyledCardContainer = styled.div<{ count: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  width: calc((100% - 50px) / 6);
  height: 120px;
  position: relative;
  border: 1px solid #373A53;
  background: #000;
  cursor: pointer;

  &::before {
    opacity: 0.3;
    position: absolute;
    display: block;
    content: '';
    background: #000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 12px;
  }

  &.active {
    background: linear-gradient(180deg, #323232 0%, #000 100%);
    border: 1px solid #464B56;

    &::before {
      opacity: 1;
      display: block;
      content: '';
      position: absolute;
      top: 8px;
      left: 8px;
      width: calc(100% - 16px);
      height: calc(100% - 16px);
      border: 1px solid red;
      border-radius: 8px;
      background: unset;
    }
  }
  
  &.column-pts::after,
  &.row-pts::after {
    background: url('/images/odyssey/v2-1/matrix-pts.svg') center no-repeat;
    background-size: contain;
    width: 91px;
    height: 47px;
    color: #000;
    text-align: center;
    font-family: Trans-America;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    content: '';
  }
  &.column-pts::after {
    position: absolute;
    bottom: -36px;
    left: 50%;
    transform: translateX(-50%);
  }
  
  &.row-pts::after {
    position: absolute;
    right: -66px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const StyledCardIcon = styled.div`
  background: url('/images/odyssey/v2-1/matrix-logo.svg') center no-repeat;
  background-size: contain;
  width: 100px;
  height: 60px;
`;

export const StyledGameContainer = styled.div`
  padding: 0 28px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  position: relative;
`;

export const StyledMatrixLogo = styled.div`
  background: url('/images/odyssey/v2-1/matrix-logo.svg') center no-repeat;
  background-size: contain;
  width: 100px;
  height: 62px;
`;
export const StyledCardName = styled.div`
  font-size: 18px;
  color: #fff;
`;

export const StyledGameFooter = styled.div`
  position: relative;
  padding: 25px 25px 30px 50px;
  background: #33C5F4;
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  font-family: Trans-America;
  line-height: 1;
  color: #000;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 86px;

  &::before {
    display: block;
    content: '';
    position: absolute;
    top: -22px;
    right: 0;
    background: url('/images/odyssey/v2-1/matrix-footer.svg') center no-repeat;
    background-size: contain;
    width: 406px;
    height: 96px;
  }

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    content: '';
    background: url('/images/odyssey/v2-1/matrix-sign.svg') center no-repeat;
    background-size: contain;
    width: 362px;
    height: 78px;
  }
`;

export const StyledTextContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 50px;

  &.center {
    flex: 1;
    flex-shrink: 0;
  }
`;

export const StyledCount = styled.div`
  font-size: 52px;
  margin-right: 13px;
`;

export const StyledText = styled.div`
  font-size: 20px;
`;
