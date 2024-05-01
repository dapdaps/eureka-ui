import styled from 'styled-components';

export const StyledTokenWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const StyledTokenIcon = styled.img`
  width: 26px;
  height: 26px;
`;

export const StyledPanel = styled.div`
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #2e3142;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

export const StyledPanelItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledPanelValue = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
