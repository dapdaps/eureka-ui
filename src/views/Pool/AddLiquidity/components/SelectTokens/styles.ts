import styled from 'styled-components';

export const StyledContent = styled.div`
  margin-top: 16px;
  width: 460px;
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
  .hv {
    display: flex;
    align-items: center;
  }
  .w-full {
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 16px;
    background-color: #1b1b1b;
    padding: 18px;
    gap: 20px;
    img {
      width: 22px;
      height: 22px;
      border-radius: 100px;
      margin-right: 7px;
    }
    .symbol {
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
    }
    .balance {
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
    }
  }
`;
export const StyledSearch = styled.div`
  margin: 18px 20px 0px;
  height: 44px;
  border: 1px solid #373a53;
  border-radius: 12px;
  padding: 0 15px;
  gap: 8px;
  input {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    font-size: 14px;
    color: #fff;
  }
`;

export const StyledTokens = styled.div`
  max-height: 60vh;
  overflow-y: auto;
  border-radius: 0px 0px 20px 20px;
  padding: 10px 0px;
`;
