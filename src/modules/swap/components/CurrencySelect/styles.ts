import styled from 'styled-components';

export const Content = styled.div`
  border-radius: 16px;
  @media (max-width: 900px) {
    width: 100%;
    border-radius: 16px 16px 0px 0px;
  }
`;

export const InputWarpper = styled.div`
  height: 36px;
  padding: 10px;
  gap: 5px;
  margin: 10px 12px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: 1px solid var(--agg-border-color, #373a53);
  background: var(--agg-bg-color, #1b1e27);
`;
export const Input = styled.input`
  color: var(--agg-text-color, #fff);
  font-size: 14px;
  font-weight: 400;
  width: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  height: 16px;
`;

export const CurrencyList = styled.div`
  height: calc(60vh - 120px);
  overflow-x: auto;
  @media (max-width: 900px) {
    height: 50vh;
  }
`;
export const Empty = styled.div`
  min-height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 18px;
  color: var(--agg-text-color, #fff);
`;
export const IconBox = styled.div`
  cursor: pointer;
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
export const LoadingWrapper = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #101010;
`;
