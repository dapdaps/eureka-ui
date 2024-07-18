import styled from 'styled-components';

export const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 75px;
  height: 75px;
  border-radius: 12px;
  background: #191a26;
  justify-content: center;
`;

export const StyledValue = styled.div`
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 26px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const StyledDesc = styled.div`
  color: #676e87;
  text-align: center;
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StyledContainer = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  &.black {
    ${StyledValue},
    ${StyledDesc} {
      color: #000;
    }
  }
`;
