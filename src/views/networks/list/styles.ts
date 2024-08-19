import styled from 'styled-components';
import Image from 'next/image';

export const StyledContainer = styled.div`
  font-family: Montserrat;
`;

export const StyledBanner = styled.div`
  width: 1234px;
  height: 600px;
  margin: 0 auto;
  padding-top: 180px;
  background: url('/images/networks/bg.png') no-repeat;
  background-size: cover;
  text-align: center;
`;
export const StyledTitle = styled.div`
  color: #fff;
  text-align: center;
  font-size: 46px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 46px */
  text-transform: uppercase;
  margin-bottom: 27px;
  .highlight {
    color: #ebf479;
    font-size: 46px;
    font-style: normal;
    font-weight: 700;
    line-height: 100%;
    text-transform: uppercase;
  }
`;
export const StyledDesc = styled.div`
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 32px */
`;

export const StyledWrap = styled.div`
  width: 1260px;
  margin: -122px auto 0;
`;

export const StyledH1 = styled.div`
  color: #fff;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const StyledHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px 27px;
`;

export const StyledFilters = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
  color: #ffffff;
  
  .filter-icon {
    color: #3D405A;
    cursor: pointer;
    transition: color .2s ease;
    
    &:first-of-type {
      margin-left: 8px;
    }
  }
  .active {
    color: #EBF479;
  }
`;

export const StyledFilterText = styled.div`
  color: #979ABE;
  font-size: 14px;
`;