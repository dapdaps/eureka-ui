import styled from 'styled-components';

export { StyledSubtitle } from '../PriceRange/styles';

export const StyledContainer = styled.div`
  margin-top: 20px;
`;

export const StyledTokens = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 18px;
`;

export const StyledToken = styled.div`
  width: 240px;
  height: 45px;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #2e3142;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`;

export const StyledTokenIcon = styled.img`
  width: 22px;
  height: 22px;
  margin-right: 5px;
`;

export const StyledTokenTitle = styled.div`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const StyledTokenAmount = styled.div`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
