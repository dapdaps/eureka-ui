import styled from 'styled-components';

export const StyledContainer = styled.div<{ $selected?: boolean }>`
  flex: 1;
  height: 40px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: ${({ $selected }) => ($selected ? '#32364B' : '#212330')};
  cursor: ${({ $selected }) => ($selected ? 'default' : 'pointer')};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  transition: background 0.2s ease-in-out;
`;
export const StyledIcon = styled.img`
  width: 26px;
  height: 26px;
  flex-shrink: 0;
`;
export const StyledSymbol = styled.div`
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
export const StyledApy = styled.div`
  color: #33c5f4;
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-left: 4px;
`;
