import styled from 'styled-components';

const StyledContainer = styled.div<{ $disabled: boolean }>`
  width: 133px;
  height: 36px;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: italic;
  font-weight: 700;
  line-height: 100%; /* 16px */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid #ffeeda;
  color: ${({ $disabled }) => ($disabled ? '#000' : '#FFEEDA')};
  background-color: ${({ $disabled }) => ($disabled ? '#FFEEDA' : 'transparent')};
`;

export default function Fragments({ amount, disabled }: any) {
  return <StyledContainer $disabled={disabled}>{amount} Fragments</StyledContainer>;
}
