import Link from 'next/link';
import styled from 'styled-components';

export const StyledWrapper = styled.div`
  width: 1244px;
  margin: 0 auto;
`;

export const StyledContainer = styled.div`
  margin-top: 113px;
  font-family: Montserrat;
`;

export const StyledSwiperWrapper = styled.div`
  position: relative;
  margin-top: 54px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: nowrap;
`;

export const StyledMask = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
  width: 0;
  background: linear-gradient(270deg, #000 0%, rgba(0, 0, 0, 0.00) 100%);
  
  &.left {
    background: linear-gradient(-270deg, #000 0%, rgba(0, 0, 0, 0.00) 100%);
  }
`;

export const StyledFooter = styled(StyledWrapper)`
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
`;
