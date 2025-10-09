import styled from 'styled-components';

export const StyledBox = styled.div<{ $isMulti?: boolean }>`
  background-color: var(--agg-secondary-color, #1b1e27);
  border: 1px solid var(--agg-primary-color, #33364b);
  width: 500px;
  height: ${({ $isMulti }) => ($isMulti ? '80px' : '68px')};
  padding: 12px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  column-gap: 30px;
`;
export const StyledInput = styled.input`
  background-color: transparent;
  color: var(--agg-primary-color, #fff);

  font-size: 18px;
  font-weight: 400;
  height: 22px;
  border: none;
  outline: none;
  width: 100%;
`;
export const StyledValue = styled.div`
  color: rgba(151, 154, 190, 0.3);

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 8px;
`;
export const StyledRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
export const StyledBalance = styled.div`
  color: #979abe;
  text-align: right;

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 8px;
`;
export const StyledBalanceAmount = styled.span`
  color: var(--agg-fourth-color, #fff);
  text-decoration-line: underline;
  cursor: pointer;
`;
