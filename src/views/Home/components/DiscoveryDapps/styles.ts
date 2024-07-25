import styled from 'styled-components';
import Link from 'next/link';

export const StyledWrapper = styled.div`
  width: 1244px;
  margin: 0 auto;
`;

export const StyledContainer = styled.div`
  margin-top: 170px;
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

export const StyledViewAll = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 11px;
  width: 118px;
  height: 48px;
  flex-shrink: 0;
  color: #FFF;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-radius: 10px;
  border: 1px solid #333648;
  background: #18191E;
  cursor: pointer;
  transition: all 0.3s linear;

  &:hover {
    opacity: 0.7;
    text-decoration: none;
  }
`;
