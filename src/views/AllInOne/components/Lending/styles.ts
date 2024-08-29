import styled from 'styled-components';

export const StyledLending = styled.div`
  max-width: 1000px;
`;
export const StyledLendingEntry = styled.div`
  min-width: 650px;
`;
export const StyledChain = styled.div<{ bg?: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  background: ${({ bg }) => bg || '#16181D'};
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    width: 80%;
    height: 80%;
  }
`;
export const StyledSupplied = styled.div<{ sub?: boolean }>`
  font-size: 16px;
  color: #fff;
  ${({ sub }) => sub ? 'font-size: 12px;color: #6c6e87;' : ''}
`;
export const StyledContent = styled.div`
  margin-top: 30px;
`;

export const StyledConnectButton = styled.button<{ bg: string, color?: string }>`
  text-align: center;
  background: ${props => props.bg};
  color: ${props => props.color ?? '#fff'};
  width: 100%;
  max-width: 488px;
  height: 60px;
  border-radius: 10px;
  margin-top: 20px;
  font-size: 18px;
  opacity: 0.8;
  transition: opacity 0.2s linear;

  &:hover {
    opacity: 1;
  }
`;

export const StyledAccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;
export const StyledAccountTip = styled.div`
  font-size: 32px;
  line-height: 38px;
`;

export const StyledSwitchButton = styled.button<{ bg?: string }>`
`;