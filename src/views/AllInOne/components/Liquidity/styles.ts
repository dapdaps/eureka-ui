import styled from 'styled-components';

export const StyledLiquidityEntry = styled.div`
  min-width: 1200px;
`;

export const StyledTokensList = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
`;
export const StyledTokens = styled.div<{ bg?: string, borderColor?: string }>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: -5px;
  border: ${({ borderColor }) => `1px solid ${borderColor || '#999'}`};
  background: ${({ bg }) => bg || '#16181D'};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  flex-grow: 0;
  font-size: 14px;
  color: #fff;
  
  img {
    width: 100%;
    height: 100%;
  }
`;
export const StyledTokenName = styled.div`
  white-space: nowrap;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const StyledTokenBadge = styled.div`
  padding: 0 4px;
  height: 22px;
  line-height: 22px;
  border-radius: 50%;
  overflow: hidden;
  background: #2a2c39;
  color: #747690;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  flex-grow: 0;
  font-size: 10px;
`;
export const StyledChain = styled.div<{ bg?: string }>`
  width: 24px;
  height: 24px;
  border-radius: 8px;
  overflow: hidden;
  background: ${({ bg }) => bg || '#16181D'};
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    width: 100%;
    height: 100%;
  }
`;
export const StyledBadge = styled.div`
  padding: 0 8px;
  height: 24px;
  line-height: 24px;
  border-radius: 8px;
  overflow: hidden;
  background: #2a2c39;
  color: #747690;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  flex-grow: 0;
  font-size: 14px;
`;
export const StyledContent = styled.div`
  margin-top: 12px;
`;
