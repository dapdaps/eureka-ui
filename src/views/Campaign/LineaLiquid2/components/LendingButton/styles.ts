import styled from 'styled-components';

export const StyledButton = styled.button`
  width: 100%;
  height: 46px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--agg-primary-color);
  color: var(--button-text-color);
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  &[disabled] {
    opacity: 0.3;
  }
`;
