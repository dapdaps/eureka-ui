import styled from 'styled-components';

export { StyledLoadingWrapper } from '@/views/Pool/Detail/styles';

export const StyledContainer = styled.div`
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #262836;
  box-sizing: border-box;
  margin: 30px auto 0px;
`;

export const StyledHeader = styled.div`
  height: 76px;
  padding: 0px 30px;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    opacity: 0.8;
  }
`;

export const StyledContent = styled.div`
  padding: 0px 30px 24px;
  border-top: 1px solid #3d363d;
`;
