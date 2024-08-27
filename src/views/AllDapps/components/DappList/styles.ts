import styled from 'styled-components';

export const StyledContainer = styled.div``;

export const StyledDappList = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  column-gap: 16px;
  row-gap: 20px;
  flex-wrap: wrap;
  
  .advertise {
    width: 405px;
    position: relative;
    transition: transform .2s ease;
    &:hover {
      transform: translateY(-5px);
    }
    
    &-card {
      width: 405px;
      height: 312px;
      position: relative;
      transition: transform .2s ease;
      &:hover {
        transform: translateY(-5px);
      }
    }
  }
`;

export const StyledFoot = styled.div`
  padding-top: 50px;
`;


export const StyledEmptyContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
  position: relative;
`;

export const StyledEmptyItem = styled.div`
  background: #101115;
  width: 405px;
  height: 312px;
  border-radius: 20px;
  border: 1px solid #202329;
  flex-shrink: 0;
`;


export const StyledEmptyShadow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%);
`;


export const StyledEmptyInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


export const StyledEmptyText = styled.div`
  background: linear-gradient(90deg, #FFF 0%, #979ABE 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-family: Montserrat;
  font-size: 20px;
  font-weight: 600;
`;