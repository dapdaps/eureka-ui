import styled from 'styled-components';

export const StyledPage = styled.div`
  padding: 42px 80px 0;
`;

export const DappName = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const StyledPowerHints = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  margin-top: 10px;
`;

export const StyledDappWrapper = styled.div`
  position: relative;
  padding-top: 18px;
`;

export const StyledLoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 0;
`;

export const StyledDAppContent = styled.div`
  margin: 0 auto;
  padding: 20px 0;
  // fix#DAP-799
  position: relative;
  z-index: 2;
  // fix#DAP-804
  max-width: 1260px;
  min-width: 1060px;
`;
