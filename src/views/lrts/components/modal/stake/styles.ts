import styled from 'styled-components';
export const StyledModal = styled.div`
  /* color: #FFF; */
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;
export const StyledOverlay = styled.div`
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;
export const StyledModalBody = styled.div`
  position: relative;
  z-index: 20;
  width: 620px;
  min-height: 495px;
  /* border-radius: 4px;
  border: 1px solid #3F3F3F;
  background: #2F2F2F;
  color: #FFF; */
`;
export const StyledTitle = styled.div`
  padding: 36px 40px 0;
  color: #fff;
  font-family: Orbitron;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
`;
export const StyledClose = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
`;
export const StyledCloseIcon = styled.div`
  position: absolute;
  right: 23px;
  top: 16px;
  display: flex;
  cursor: pointer;
`;
export const StyledStakeContainer = styled.div`
  position: relative;
`;
export const StyledStakeTopContainer = styled.div`
  border-radius: 4px;
  border: 1px solid #3f3f3f;
  background: #2f2f2f;
  min-height: 494px;
`;
export const StyledStakeBottomContainer = styled.div`
  /* min-height: 259px; */
  border: 1px solid #3f3f3f;
  border-top: none;
  background: #2f2f2f;
  border-radius: 0 0 4px 4px;
  padding: 4px 33px 45px;
`;
export const StyledBaseInfoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 40px 40px 0;
`;
export const StyledBaseInfo = styled.div<{flex?: number | string}>`
  flex: ${(props) => props.flex || 1};
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const StyledFirstTips = styled.div`
  color: #fff;
  font-family: Orbitron;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  opacity: 0.6;
`;
export const StyledBaseInfoValueContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const StyledPlusTips = styled.div`
  position: absolute;
  top: -4px;
  left: -13px;
  transform: translateY(-100%);
  width: 187px;
  height: 36px;
  flex-shrink: 0;
  display: none;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid #3f3f3f;
  background: #414141;
  color: #fff;
  font-family: Orbitron;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const StyledPlusSvg = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    ${StyledPlusTips} {
      display: flex;
    }
  }
`;
export const StyledBaseInfoValue = styled.div`
  color: #fff;
  font-family: Orbitron;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const StyledLine = styled.div`
  height: 1px;
  background: #3f3f3f;
`;
export const StyledBottomContainer = styled.div`
  padding: 40px 40px 0;
`;
export const StyledTipsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const StyledSecondTips = styled.div`
  color: #fff;
  font-family: Orbitron;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  opacity: 0.3;
`;
export const StyledInputContainer = styled.div`
  margin: 10px 0 17px;
  height: 68px;
  border-radius: 4px;
  border: 1px solid #3f3f3f;
  background: #272727;
  display: flex;
  align-items: center;
  gap: 10px;
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }

  input::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;
export const StyledInput = styled.input`
  flex: 1;
  background: transparent;
  outline: unset;
  height: 100%;
  padding-left: 20px;
  color: #fff;
  font-family: Orbitron;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const StyledMaxAndSymbol = styled.div`
  display: flex;
  gap: 10px;
  padding-right: 17px;
`;
export const StyledMax = styled.div`
  cursor: pointer;
  width: 42px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #3f3f3f;
  color: #fff;
  font-family: Orbitron;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  opacity: 0.6;
`;
export const StyledSymbol = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const StyledSymbolImage = styled.img`
  width: 26px;
  height: 26px;
`;
export const StyledSymbolTxt = styled.div`
  color: #fff;
  font-family: Orbitron;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const StyledReceiveContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 0 35px;
`;
export const StyledReceive = styled.div`
  color: #fff;
  font-family: Orbitron;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const StyledStakeButtonContainer = styled.div<HTMLElement | { disabled: boolean }>`
  display: flex;
  position: relative;
  &[disabled] {
    opacity: 0.3;
  }
`;
export const StyledStakeButton = styled.button`
  position: absolute;
  background: transparent;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  font-family: Orbitron;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
`;
export const StyledSecondLine = styled.img`
  width: 100%;
`;
export const StyledTriangle = styled.img`
  width: 40px;
  height: 20px;
`;
export const StyledActiveAndCompletedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const StyledWithdrawTips = styled.div`
  color: #fff;
  font-family: Orbitron;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
`;
export const StyledActiveAndCompleted = styled.div`
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #3f3f3f;
  background: #272727;
  display: flex;
  align-items: center;
`;
export const StyledActiveAndCompletedButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 30px;
  border-radius: 4px;
  border: 1px solid transparent;
  color: #fff;
  font-family: Orbitron;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  &.active {
    border-color: #fff;
    background: #000;
  }
`;
export const StyledRecordList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 120px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 10px;
`;
export const StyledRecord = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const StyledRecordText = styled.div`
  color: #fff;
  font-family: Orbitron;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &.click {
    cursor: pointer;
    text-decoration: underline;
    transition: 0.5s;
    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 0.6;
    }
  }
`;
export const StyledActionTypeTabContainer = styled.div`
  padding-top: 34px;
  display: flex;
  gap: 124px;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #3f3f3f;
`;
export const StyledActionTypeTab = styled.div`
  cursor: pointer;
  position: relative;
  padding: 11px 10px;
  color: #fff;
  font-family: Orbitron;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
  opacity: 0.6;
  &.active {
    opacity: 1;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 3px;
      left: 0;
      right: 0;
      background-color: #fff;
    }
  }
`;
export const StyledDapLogo = styled.img`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -60%);
`;
export const StyledLrtDapp = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -75%);
  width: 148px;
`;
export const StyledLrtBgImage = styled.img`
  width: 100%;
`;
export const StyledLoading = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  color: #fff;
`;

export const StyledLoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
