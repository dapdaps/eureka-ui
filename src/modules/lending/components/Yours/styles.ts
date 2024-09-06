import styled from 'styled-components';

export const Yours = styled.div`
  display: flex;
  gap: 20px;
`;
export const YoursTableWrapper = styled.div`
  background-color: var(--agg-secondary-color, rgba(53, 55, 73, 0.2));
  border: 1px solid var(--agg-border-color);
  border-radius: 6px;
  width: 50%;
`;
export const Title = styled.div`
  padding: 20px;
  border-bottom: 1px solid var(--agg-border-color, #292c42);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Label = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #7c7f96;
  &.yours-table-title {
    color: var(--yours-table-title);
  }
`;
export const Value = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-top: 4px;
  color: var(--agg-primary-color, #fff);
  &.supply-color {
    color: var(--supply-color);
  }
  &.borrow-color {
    color: var(--borrow-color);
  }
`;
export const Right = styled.div`
  text-align: right;
`;
