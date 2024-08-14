import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 60vh;
  overflow-y: auto;
`;

export const StyledItem = styled.div<{ isActive: boolean}>`
  border-radius: 8px;
  border: 1px solid #333648;
  background: #20212d;
  padding: 10px 12px 16px;
  cursor: pointer;
  transition: 0.5s;
  border: 1px solid;
  border-color: ${({ isActive }) => (isActive ? '#ebf479' : 'transparent')};
  /* &:hover {
    border-color: #ebf479;
  } */
`;

export const StyledIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 6px;
`;

export const StyledTitle = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const StyledDesc = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StyledTokenIcon = styled.img`
  width: 22px;
  height: 22px;
`;

export const StyledLine = styled.div`
  border-top: 1px dashed #373a53;
  flex-grow: 1;
`;
