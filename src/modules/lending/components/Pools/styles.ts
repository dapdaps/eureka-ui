import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 40px;
  padding: 4px;
  box-sizing: border-box;
`;

export const StyledLabel = styled.div`
  color: var(--agg-thirdry-color, #979abe);
  text-align: right;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  padding: 7px;
  box-sizing: border-box;

  &.multi {
    border-radius: 8px;
    border: 1px solid #373a53;
    background: #32364b;
  }
`;

export const StyledPools = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--agg-primary-color, #373a53);
  background: var(--agg-secondary-color, rgba(33, 35, 48, 0.5));
  border-radius: 8px;
`;

export const StyledPoolBox = styled.div`
  flex-shrink: 0;
  border-radius: 8px;
  padding: 4px 7px;
  box-sizing: border-box;
  cursor: pointer;
  border: 1px solid transparent;
  &.active {
    border: 1px solid #373a53;
    background: #32364b;
  }
  &:hover {
    background: rgba(50, 54, 75, 0.8);
  }
`;

export const StyledPoolFont = styled.div`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;
