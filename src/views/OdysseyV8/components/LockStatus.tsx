import styled from 'styled-components';

const StyledContainer = styled.div<{ $status: string }>`
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 12px;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  border-radius: 4px;
  border: 1px solid #3d405a;
  color: ${({ $status }) => ($status === 'unlocked' ? '#00FFD1' : '#979abe')};
  background-color: ${({ $status }) => ($status === 'unlocked' ? 'rgba(0, 255, 209, .5)' : 'transparent')};
  &.explored {
    background: rgba(0, 255, 209, 0.5);
    color: #00ffd1;
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
      <Icon src="/images/odyssey/v4/done.svg" />
      Explored
    </StyledContainer>
  );
}
