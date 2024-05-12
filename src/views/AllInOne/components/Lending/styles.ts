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
  margin-top: 12px;
`;
