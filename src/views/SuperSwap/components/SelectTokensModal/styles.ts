import styled from 'styled-components';

export const Content = styled.div``;
export const InputWarpper = styled.div`
  height: 36px;
  padding: 10px;
  gap: 5px;
  margin: 10px 12px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #332c4b;
  background: #1b1e27;
`;
export const Input = styled.input`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  width: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  height: 16px;
`;

export const CurrencyList = styled.div`
  padding: 0px 30px 20px;
  height: calc(60vh - 120px);
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

export const StyledLoadingWrapper = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Tabs = styled.div`
  display: flex;
  align-items: center;
  gap: 44px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 12px 30px;
  border-bottom: 1px solid var(--agg-border-color, #373a53);
`;
export const Tab = styled.div`
  cursor: pointer;
  color: #a49b9a;
  &.active {
    color: var(--agg-text-color, #fff);
  }
`;
