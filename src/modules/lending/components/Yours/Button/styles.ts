import styled from 'styled-components';

export const Button = styled.button`
  height: 33px;
  text-align: center;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0px 10px;
  opacity: 1;

  &:hover {
    opacity: 0.8;
  }

  &.withdraw {
    background: var(--agg-primary-color, var(--withdraw-bg-color));
    border: 1px solid var(--withdraw-border-color);
    color: var(--agg-secondary-color, var(--withdraw-color));

    &:hover {
      background: var(--agg-primary-color, var(--withdraw-bg-hover-color));
    }
  }
  &.claim {
    background: var(--claim-bg-color);
    border: 1px solid var(--claim-border-color);
    color: var(--claim-color);

    &:hover {
      background: var(--claim-bg-hover-color);
    }
  }
  &.repay {
    background: var(--agg-pink-color, var(--repay-bg-color));
    border: 1px solid var(--repay-border-color);
    color: var(--agg-secondary-color, var(--replay-color));
    &:hover {
      background: var(--agg-pink-color, var(--repay-bg-hover-color));
    }
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;
