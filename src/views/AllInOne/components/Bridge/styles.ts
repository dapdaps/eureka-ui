import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: relative;
`;

export const StyledBody = styled.div`
  position: relative;
`;

export const StyledFoot = styled.div`
  margin-top: 20px;
`;

export const StyledDownIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 38px;
  height: 38px;
  border-radius: 8px;
  border: 4px solid #262836;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2E3142;
  cursor: pointer;
  transition: all .3s ease;
  z-index: 1;

  &:hover {
    background: #1f212d;
  }
`;

export const StyledCard = styled.div`
  position: relative;
  border: 1px solid #373A53;
  border-radius: 16px;
  background: #262836;
`;
export const StyledCardHead = styled.div`
  padding: 12px 20px;
  border-radius: 16px 16px 0 0;
`;
export const StyledCardBody = styled.div`
  border-top: 1px solid #373A53;
  padding: 12px 20px;
  border-radius: 0 0 16px 16px;
  
  &.editable {
    background: #20212D;
  }
`;

export const StyledButton = styled.button<{ bgColor: string, color: string }>`
  background: ${props => props.bgColor};
  color: ${props => props.color};
  padding: 19px 0;
  text-align: center;
  width: 100%;
  font-weight: 600;
  border-radius: 10px;
  line-height: 22px;
  font-size: 18px;
`;


