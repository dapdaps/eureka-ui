import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 26px;
  position: relative;
  pre {
    display: none;
  }
`;

export const StyledWidgetWrapper = styled.div`
  width: 560px;
  position: relative;
`;

export const StyledPanel = styled.div`
  width: 100%;
  position: relative;
  padding: 24px 16px 16px;
  border-radius: 16px;
  border: 1px solid var(--agg-border-color, #373a53);
  background: var(--agg-bg-color, #262836);
`;

export const ExchangeIconWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
`;

export const ExchangeIconInner = styled.div`
  height: 34px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  svg {
    color: var(--agg-text-color, #fff);
  }
`;
