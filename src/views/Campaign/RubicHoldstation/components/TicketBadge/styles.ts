import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding: 0 12px;
  display: inline-block;
  gap: 9px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 8px;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: #979abe;
  background: rgba(151, 154, 190, 0.3);

  &.active {
    background: linear-gradient(116deg, #c8ff7c 11.9%, #ffa5db 64.92%, #7a78ff 104.11%);
    color: #000;
  }

  > div {
    height: 100%;
  }
`;
