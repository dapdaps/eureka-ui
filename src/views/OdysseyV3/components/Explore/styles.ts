import styled from 'styled-components';

export const StyledContainer = styled.div`
  margin: 20px auto 0px;
  width: 1188px;
`;

export const StyledContent = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledItem = styled.div<{ $disabled: boolean }>`
  height: 70px;
  border-radius: 12px;
  border: 1px solid #373a53;
  background: #1e2028;
  box-sizing: border-box;
  padding: 14px 28px 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
`;

export const StyledItemTitle = styled.div`
  flex-shrink: 0;
  color: #fff;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 24px */
`;

export const StyledItemLeft = styled.div`
  display: flex;
  gap: 26px;
  align-items: center;
`;

export const StyledItemRight = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
