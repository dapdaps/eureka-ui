import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  gap: 20px;
`;
export const StyledNotes = styled.div`
  font-size: 32px;
  line-height: 38px;
  color: #fff;
`;
export const StyledButton = styled.button`
  text-align: center;
  background: var(--agg-primary-color, var(--button-color));
  color: var(--agg-secondary-color, var(--button-text-color));
  width: 100%;
  max-width: 488px;
  height: 60px;
  border-radius: 10px;
  font-size: 18px;
  opacity: 0.8;
  transition: opacity 0.2s linear;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  .all-in-one-lending-switch-chain-loading {
    width: 16px;
    flex-grow: 0;
    flex-shrink: 0;
  }

  &:hover {
    opacity: 1;
  }

  &.loading {
    cursor: not-allowed;
  }
`;
