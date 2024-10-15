import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 16px 16px 14px;
  border-radius: 12px;
  border: 1px solid #373a53;
  transition: 0.3s;
`;
export const InputBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  gap: 8px;
`;
export const InputField = styled.div`
  flex-shrink: 1;
  flex-grow: 1;
`;
export const InputWarpper = styled.div`
  height: 46px;
  padding: 10px 0px;
  @media (max-width: 900px) {
    height: 40px;
  }
`;
export const Input = styled.input`
  font-size: 32px;
  width: 100%;
  color: var(--agg-text-color, #fff);
  font-weight: 500;
  background-color: transparent;
  outline: none;
  border: none;
  height: 40px;
  vertical-align: bottom;
  @media (max-width: 900px) {
    font-size: 20px;
    height: 34px;
  }
`;
export const Value = styled.div`
  padding-top: 10px;
  color: var(--agg-fourth-color, #979abe);
  font-size: 14px;
  line-height: 16px;
`;
export const CurrencyField = styled.div``;

export const CurrencySelect = styled.div<{ selectable: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  padding: 3px 10px 3px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  svg {
    color: var(--agg-text-color, #979abe);
  }

  ${({ selectable }) =>
    selectable &&
    `  border: 1px solid var(--agg-border-active-color, #373a53);
  background: var(--agg-bg-color, #2e3142);`}

  @media (max-width: 768px) {
    svg {
      width: 12px !important;
    }
    padding: 0px 12px 0px 6px;
  }
`;
export const CurrencyWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  /* width: 80px; */
`;
export const CurrencyIcon = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
  }
`;
export const CurrencySymbol = styled.div`
  font-size: 18px;
  color: var(--agg-text-color, #fff);
  margin-left: 7px;
  white-space: nowrap;
  min-width: 100px;
  .fz-14 {
    font-size: 14px;
  }
  @media (max-width: 768px) {
    width: calc(100% - 30px);
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    .fz-14 {
      font-size: 12px;
    }
  }
`;
export const Amount = styled.div`
  padding-top: 18px;
  color: var(--agg-fourth-color, #979abe);
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  gap: 4px;
  align-items: center;
  flex-wrap: nowrap;
`;
export const Label = styled.div`
  color: var(--agg-text-color, #979abe);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
