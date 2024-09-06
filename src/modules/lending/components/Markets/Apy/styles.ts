import styled from 'styled-components';

export const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;
export const StyledApy = styled.div`
  color: var(--agg-primary-color, #fff);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const RewardApyItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
export const RewardIcon = styled.img`
  width: 14px;
  height: 14px;
`;
export const RewardApy = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: var(--agg-thirdry-color, #979abe);
`;
