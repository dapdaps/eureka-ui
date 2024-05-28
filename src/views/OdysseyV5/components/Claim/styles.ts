import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 100%;
  max-width: 1292px;
  margin: 0 auto;
  position: relative;
  padding-left: 50px;
  padding-right: 50px;
`;

export const StyledTitle = styled.div`
  font-size: 52px;
  color: #fff;
  text-align: center;
  .hilight {
    color: ${() => `var(--odyssey-primary-color)`};
  }
`;

export const StyledSubTitle = styled.div`
  color: #fff;
  text-align: center;
  font-size: 20px;
  margin-top: 12px;
  margin-bottom: 42px;
  font-weight: 300;
`;

export const StlyedDesc = styled.div`
  display: flex;
  align-items: center;
  padding-left: 72px;
  column-gap: 8px;
  margin-bottom: 18px;
`;

export const StyledDescIcon =  styled.div`
`;

export const StyledDescText =  styled.div`
  font-size: 16px;
  color: #979ABE;
  font-weight: 400;
`;


export const StyledListContainer = styled.div`
  background: #1A1A1A;
  border-radius: 10px;
  padding: 30px;
  color: #fff;
  font-size: 18px;
`;

export const StyledList = styled.div<{ one?: boolean }>`
  display: grid;
  align-items: center;
  column-gap: 20px;
  grid-template-columns: 20% auto 20%;
  &:not(&:last-child) {
    margin-bottom: 38px;
  }
  ${({ one }) =>
    !one
      ? `
     &:first-child {
    color: #979ABE;
      }`
      : ``}
`;

export const StyledListItem = styled.div`
  width: 100%;
  font-weight: 400;
  display: flex;
  align-items: center;
  column-gap: 11px;
  &:last-child {
    text-align: right;
    justify-content: end;
  }
`;

export const StyledText = styled.div`
  font-size: 20px;
  font-weight: 300;
  color: #fff;
  margin: 18px 0;
  padding-left: 10px;
`;

export const StyledListItemIcon = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  object-fit: contain;
`;

export const StyledListItemText = styled.div``;

export const StyledPlate = styled.div`
  position: absolute;
  top: -50px;
  left: -40px;
  z-index: 0;
`;

export const StyledAllContainer = styled.div`
  width: 100%;
  position: relative;
  padding-top: 100px;
  padding-bottom: 144px;
`;