import styled from 'styled-components';

export const StyledContainer = styled.div<{
  $width: string;
  $height: string;
}>`
  position: relative;
  font-family: Montserrat;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  gap: 9px;
  cursor: pointer;
  background-color: #ebf479;
  width: ${({ $width }) => `${$width}` || 'auto'};
  height: ${({ $height }) => `${$height}` || 'auto'};
  clip-path: polygon(
    20px 0,
    100% 0,
    100% 20px,
    100% calc(100% - 20px),
    calc(100% - 20px) 100%,
    20px 100%,
    0 100%,
    0 20px
  );
`;
