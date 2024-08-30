import styled from 'styled-components';

const Yours = styled.div`
  display: flex;
  gap: 20px;
`;
const YoursTableWrapper = styled.div`
  width: 50%;
`;
const Title = styled.div`
  padding: 12px 20px;
  border-bottom: 1px solid var(--agg-border-color, #292c42);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TitleItem = styled.div``;
const Label = styled.div`
  color: #979abe;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Value = styled.div`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export { Yours, YoursTableWrapper, Title, TitleItem, Label, Value };
