import { styled } from 'styled-components';

const Wrap = styled.div`
  padding: 24px 15px;
  /*min-height: 100vh;*/
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChainsWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Yours = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 16px;
`;
const YoursTableWrapper = styled.div`
  color: var(--agg-primary-color, #fff);
  background-color: var(--agg-secondary-color, rgba(53, 55, 73, 0.2));
  border: 1px solid var(--agg-border-color, rgba(53, 55, 73, 0.2));
  border-radius: 12px;
  width: 50%;
`;
const Title = styled.div`
  height: 60px;
  padding: 10px 20px 0;
  color: var(--agg-primary-color, #fff);
  /* border-bottom: 1px solid #292c42; */
`;
const SubTitle = styled.div`
  display: flex;
  align-items: center;
`;
const Label = styled.div`
  color: #979abe;
  font-size: 16px;
  font-weight: 400;
  margin-right: 5px;
`;
const Value = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  margin-right: 15px;
`;

export { Wrap, FlexContainer, ChainsWrap, Yours, YoursTableWrapper, Title, SubTitle, Label, Value };
