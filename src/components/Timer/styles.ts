import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  border: 1px solid rgba(55, 53, 53, 1);
  border-radius: 6px;
  background-color: rgba(19, 18, 18, 1);

`;
export const StyledLine = styled.div`
  margin: 0 22px 0 18px;
  width: 1px;
  height: 55px;
  background: #979ABE;
`

export const StyledValue = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const StyledDesc = styled.div`
  color: #979ABE;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;