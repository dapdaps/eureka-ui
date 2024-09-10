import styled from 'styled-components';

export const Content = styled.div`
  border-radius: 24px;
  background: var(--agg-bg-color, #303142);
  border: 1px solid var(--agg-border-color, #373a53);
  width: 393px;
  height: 330px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 900px) {
    width: 100%;
    border-radius: 16px 16px 0px 0px;
    background: #2b2b2b;
  }
`;
export const Text = styled.div`
  color: var(--agg-text-color, #fff);
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 333px;
  margin-top: 18px;
`;
export const CurrencyLabel = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
  gap: 6px;
`;

export const CurrencySymbol = styled.div`
  font-size: 16px;
  font-weight: 500px;
  color: var(--agg-text-color, #fff);
`;
export const AddressWrap = styled.div`
  font-size: 14px;
  color: #8e8e8e;
  opacity: 0.5;
  display: flex;
  gap: 4px;
`;
export const CurrencyName = styled.a`
  font-size: 14px;
  color: #8e8e8e;
  opacity: 0.5;
  display: flex;
  gap: 4px;
  align-items: center;
`;
export const Button = styled.button`
  border-radius: 6px;
  background: var(--button-color);
  width: 200px;
  height: 36px;
  flex-shrink: 0;
  color: var(--button-text-color);
  font-size: 16px;
  font-weight: 600;
  border: none;
  margin-top: 30px;
  cursor: pointer;
`;
export const CancelButton = styled.div`
  color: #a49b9a;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 20px;
  cursor: pointer;
`;
