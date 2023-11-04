import { memo } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin-top: 20px;
  .title {
    font-size: 16px;
    color: rgba(255, 255, 255, 1);
    margin-bottom: 16px;
  }
  .setArea {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const SetPriceRange = () => {
  return (
    <StyledContainer>
      <div className="title">Set price range</div>
      <div className="setArea">
        <InputPriceBox />
        <InputPriceBox />
      </div>
    </StyledContainer>
  );
};

const StyledInputPriceBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #303030;
  border-radius: 16px;
  padding: 12px 18px;
  background-color: #1b1b1b;
`;
const StyledPrice = styled.div`
  display: flex;
  flex-direction: column;
  .type {
    font-size: 14px;
    color: #8e8e8e;
  }
  input[type='number'] {
    font-size: 20px;
    color: #fff;
    font-weight: 700;
    background: none;
    border: none;
    outline: none;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .txt {
    font-size: 14px;
    color: #8e8e8e;
  }
`;
const StyledButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  .b {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: 1px solid #3d363d;
    border-radius: 8px;
    background-color: #131313;
    cursor: pointer;
    color: #fff;
  }
`;
const InputPriceBox = () => {
  return (
    <StyledInputPriceBox>
      <StyledPrice>
        <span className="type">Low price</span>
        <input type="number" value="345" />
        <span className="txt">USDC per ETH</span>
      </StyledPrice>
      <StyledButtonArea>
        <div className="b">
          <Add />
        </div>
        <div className="b">
          <Sub />{' '}
        </div>
      </StyledButtonArea>
    </StyledInputPriceBox>
  );
};

const Add = () => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7H13" stroke="white" stroke-width="2" stroke-linecap="round" />
      <path d="M7 1L7 13" stroke="white" stroke-width="2" stroke-linecap="round" />
    </svg>
  );
};
const Sub = () => {
  return (
    <svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1H13" stroke="white" stroke-width="2" stroke-linecap="round" />
    </svg>
  );
};

export default memo(SetPriceRange);
