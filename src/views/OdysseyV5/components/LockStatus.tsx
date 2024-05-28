import styled from 'styled-components';

const StyledContainer = styled.div<{ $status: string }>`
  display: flex;
  align-items: center;
  padding: 8px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  border-radius: 4px;
  border: 1px solid #3D405A;
  color: ${({ $status }) => ($status === 'unlocked' ? '#979abe' : '#979abe')};
  background-color: ${({ $status }) => ($status === 'unlocked' ? '#000' : '#000')};
  &.explored {
    background: rgba(223, 254, 0, 0.3);
    color: rgba(223, 254, 0, 1);
  }
`;
const Icon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 8px;
`;

export default function LockStatus({ status }: any) {
  return !status ? (
    <StyledContainer $status={status}>Unexplored</StyledContainer>
  ) : (
    <StyledContainer $status={status} className="explored">
      <Icon src="/images/odyssey/v5/explore-finished.svg" />
      Explored
    </StyledContainer>
  );
}
