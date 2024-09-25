import styled from 'styled-components';

export const RewardsTable = styled.div`
  background-color: var(--agg-secondary-color, rgba(53, 55, 73, 0.2));
  border: 1px solid var(--agg-border-color);
  margin-top: 20px;
  border-radius: 6px;
`;
export const Title = styled.div`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 400;
  color: var(--agg-primary-color, #fff);
  border-bottom: 1px solid var(--agg-border-color, #292c42);
`;
export const NoReward = styled.div`
  margin: 28px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;
