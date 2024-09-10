import styled from 'styled-components';

export const StyledContainer = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: var(--agg-thirdry-color, #979abe);
  margin-top: 20px;
  margin-bottom: 16px;
  .price_impact {
    color: #33b65f;
  }
  .warning-1 {
    color: #ff9445;
  }
  .warning-card-1 {
    color: #ff9445;
    border: 1px solid #ff9445;
    background: rgba(255, 148, 69, 0.1);
  }
  .warning-2 {
    color: #ff547d;
  }
  .warning-card-2 {
    color: #ff547d;
    border: 1px solid #ff547d;
    background: rgba(255, 84, 125, 0.1);
  }
  .fee {
    border-bottom: 1px dashed var(--agg-thirdry-color, #979abe);
    position: relative;
    cursor: pointer;
  }
`;

export const StyledFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledFlexSpace = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledPanelWrapper = styled.div`
  height: 0px;
  animation: fadeOut 0.4s 0.1s ease both;
  &.expand {
    animation: fadeIn 0.4s 0.1s ease both;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
      height: 0px;
      border: none;
    }
    100% {
      opacity: 1;
      transform: translateY(0);
      height: auto;
      border-top: none;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
      transform: translateY(0);
      height: auto;
      border-top: none;
    }
    100% {
      opacity: 0;
      transform: translateY(-20px);
      height: 0px;
      border: none;
    }
  }
`;

export const StyledPanel = styled.div`
  border-radius: 12px;
  border: 1px solid var(--agg-border-color, #373a53);
  padding: 16px 12px 0px;
  color: var(--agg-thirdry-color, #979abe);
  margin-top: 16px;
  display: none;

  &.expand {
    display: block;
  }
`;

export const StyledItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-bottom: 16px;
`;

export const StyledArrow = styled.div`
  transition: 0.3s;
  transform-origin: center;
  cursor: pointer;
  &.up {
    transform: rotate(0deg);
  }
  &.down {
    transform: rotate(180deg);
  }
`;

export const StyledPriceWarning = styled.div`
  border-radius: 8px;
  border: 1px solid #ff547d;
  background: rgba(255, 84, 125, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 16px;
  height: 43px;
  padding: 0px 13px;
`;

export const StyledFeePanel = styled.div`
  border-radius: 6px;
  border: 1px solid #373a53;
  background: #262836;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  padding: 10px;
  color: var(--agg-thirdry-color, #979abe);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  left: -230px;
  top: -50%;
  width: 223px;
`;

export const Layer = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
`;
