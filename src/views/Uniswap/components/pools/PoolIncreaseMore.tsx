import { memo } from 'react';
import styled from 'styled-components';

const StyledWrap = styled.div`
  margin-top: 30px;
  .vchb {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .hvc {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .w-full {
    width: 100%;
  }
`;
const StyledHead = styled.div`
  font-size: 16px;
  color: #fff;
`;
const StyledBody = styled.div`
  margin-top: 16px;
`;
const PoolIncreaseMore = () => {
  return (
    <StyledWrap>
      <StyledHead>Add more liquidity</StyledHead>
      <StyledBody>
        <InputBox />
      </StyledBody>
    </StyledWrap>
  );
};

const StyledInputBox = styled.div`
  border: 1px solid #303030;
  border-radius: 16px;
  padding: 14px;
  background-color: #1b1b1b;
`;
const InputBox = () => {
  return (
    <StyledInputBox>
      <StyledTop>
        <input type="number" value="0.1" />
        <div className="token">
          <img src="" />
          <span className="symbol">ETH</span>
        </div>
      </StyledTop>
      <StyledBottom>
        <span className="price">$400.714</span>
        <div className="balance">
          <span className="b">balance:</span>
          <a>520.25</a>
        </div>
      </StyledBottom>
    </StyledInputBox>
  );
};
const StyledTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  .token {
    background-color: #131313;
    border: 1px solid #242424;
    padding: 6px;
    padding-right: 12px;
    border-radius: 18px;
    img {
      width: 22px;
      height: 22px;
      border-radius: 100px;
      margin-right: 8px;
    }
    .symbol {
      font-size: 16px;
      color: #fff;
      font-weight: 600;
    }
  }
`;
const StyledBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  .price {
    font-size: 14px;
    color: #8e8e8e;
  }
  .balance {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    .b {
      font-size: 14px;
      color: #8e8e8e;
    }
    a {
      font-size: 14px;
      color: #fff;
      text-decoration: underline;
    }
  }
`;

export default memo(PoolIncreaseMore);
