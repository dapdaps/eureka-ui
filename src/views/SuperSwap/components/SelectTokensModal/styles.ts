import styled from 'styled-components';

export const Content = styled.div``;
export const InputWarpper = styled.div`
  height: 46px;
  border-bottom: 1px solid #332c4b;
  padding: 14px 30px 6px;
`;
export const Input = styled.input`
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  width: 100%;
  background-color: transparent;
  outline: none;
  border: none;
`;

export const CurrencyList = styled.div`
  padding: 0px 30px 20px;
  max-height: calc(60vh - 120px);
  overflow-x: auto;
  @media (max-width: 900px) {
    max-height: 50vh;
  }
`;
export const Empty = styled.div`
  min-height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 18px;
  color: #fff;
`;

export const CurrencyRow = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin: 10px 0px;
  border-radius: 16px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  &.active {
    background-color: #004bfc;
    pointer-events: none;
  }
`;

export const CurrencyLabel = styled.div`
  display: flex;
  align-items: center;
`;
export const CurrencySymbol = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #fff;
`;
export const CurrencyName = styled.div`
  font-size: 14px;
  color: #fff;
`;
export const CurrencyIcon = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 20px;
`;
export const CurrencyAmount = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  text-align: right;
`;
export const StyledBalanceWrap = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  text-align: right;
`;

export const StyledRowR = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledTokenNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
