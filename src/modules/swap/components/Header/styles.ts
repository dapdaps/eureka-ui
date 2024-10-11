import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
`;

export const StyledLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 16px;

  color: var(--agg-text-color, white);
  font-size: 20px;
  font-weight: 700;
  line-height: 22px;

  .chain-icon {
    width: 26px;
    height: 26px;
    border-radius: 8px;
  }
`;

export const StyledSettings = styled.div`
  display: flex;
  align-items: center;
  padding-right: 13px;
  gap: 14px;
`;

export const StyledActionButton = styled.button`
  transition: 0.5s;
  cursor: pointer;
  background: transparent;
  color: #53577b;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;
