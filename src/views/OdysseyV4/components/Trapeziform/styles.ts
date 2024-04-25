import styled from 'styled-components';

export const StyledContainer = styled.div<{
  $borderColor: string;
  $bgColor: string;
  $corner: string;
}>`
  position: relative;
  background-color: ${({ $bgColor }) => ` ${$bgColor}` || 'transparent'};
  border: ${({ $borderColor }) => `1px solid  ${$borderColor}` || 'none'};
  clip-path: ${({ $corner }) =>
    `polygon(${$corner}px 0%, 100% 0%, 100% calc(100% - ${$corner}px), calc(100% - ${$corner}px) 100%, 0% 100%, 0% ${$corner}px)`};

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: ${({ $corner }) => ` ${$corner}px` || '15px'};
    height: ${({ $corner }) => ` ${$corner}px` || '15px'};
    background-color: ${({ $borderColor }) => ` ${$borderColor}` || 'none'};
    clip-path: polygon(0% 0%, 100% 0%, 0% 100%);
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    width: ${({ $corner }) => ` ${$corner}px` || '15px'};
    height: ${({ $corner }) => ` ${$corner}px` || '15px'};
    background-color: ${({ $borderColor }) => ` ${$borderColor}` || 'none'};
    clip-path: polygon(100% 0%, 100% 100%, 0% 100%);
  }
`;
