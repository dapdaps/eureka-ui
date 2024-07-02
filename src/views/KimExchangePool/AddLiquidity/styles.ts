import styled from 'styled-components';

export { StyledContainer, StyledLoadingWrapper } from '../RemoveLiquidity/styles';

export const StyledContent = styled.div`
  padding: 20px 30px 26px;
  display: flex;
  gap: 36px;
`;

export const StyledCurrentPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #979abe;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 14px;
  margin-bottom: 38px;
  .price {
    color: #fff;
  }
`;

export const StyledLabels = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  padding-top: 18px;
`;

export const StyledLabel = styled.div<{ $active: boolean }>`
  width: 113px;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  border: 1px solid ${({ $active }) => ($active ? '#fff' : '#373a53')};
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;
