import styled from 'styled-components';

export const StyledBox = styled.div`
  background-color: var(--agg-secondary-color, #1b1e27);
  border: 1px solid var(--agg-primary-color, #33364b);
  width: 500px;
  height: 68px;
  padding: 12px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
`;
export const StyledInput = styled.input`
  background-color: transparent;
  color: var(--agg-primary-color, #fff);

  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  height: 22px;
  border: none;
  outline: none;
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
