import styled from 'styled-components';

export const StyledContainer = styled.div<{ $borderColor: string; $borderWidth: string }>`
  position: relative;
  font-family: Montserrat;
  border: ${({ $borderColor }) => `1px solid ${$borderColor}` || 'none'};
`;
