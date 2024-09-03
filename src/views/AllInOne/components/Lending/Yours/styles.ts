import styled from 'styled-components';

const Yours = styled.div`
  display: flex;
  gap: 20px;
`;
const YoursTableWrapper = styled.div`
  width: 50%;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #262836;
  padding-bottom: 10px;
`;
const Title = styled.div`
  padding: 20px;
  border-bottom: 1px solid #373a53;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TitleItem = styled.div``;
const Label = styled.div`
  color: #7c7f96;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 4px;
  &.yours-table-title {
    color: #fff;
  }
`;
const Value = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  text-align: right;

  &.supply-color {
    font-size: 18px;
    font-weight: 700;
    text-align: left;
  }

  &.borrow-color {
    font-size: 18px;
    font-weight: 700;
    text-align: left;
    color: var(--borrow-color, #ffffff);
  }
`;

export { Yours, YoursTableWrapper, Title, TitleItem, Label, Value };
