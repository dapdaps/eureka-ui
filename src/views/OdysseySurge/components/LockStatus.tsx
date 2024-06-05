import styled from 'styled-components';

const StyledContainer = styled.div<{ $status: string, $border?: boolean }>`
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 10px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  border-radius: 4px;
  border: ${({ $border  }) => ($border ? '1px solid #3D405A' : 'unset')};
  color: ${({ $status }) => ($status === 'unlocked' ? '#00FEB2' : '#979abe')};
  background-color: ${({ $status }) => ($status === 'unlocked' ? 'rgba(0, 254, 178, 0.30)' : 'transparent')};
  backdrop-filter: blur(2px);
  &.explored {
    background: rgba(0, 255, 209, 0.5);
    color: #00FEB2;
  }
`;
const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

export default function LockStatus({ status, border }: any) {
  return !status ? (
    <StyledContainer $status={status} $border={border}>Unexplored</StyledContainer>
  ) : (
    <StyledContainer $status={status} className="explored">
      <Icon src="/images/odyssey/v2-1/explore-finished.svg" />
      Explored
    </StyledContainer>
  );
}
