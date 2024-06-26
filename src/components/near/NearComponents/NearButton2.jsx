import styled from 'styled-components';

const NearButton2 = ({ children, className, style, onClick, color }) => {
  return (
    <StyledButton className={className} onClick={onClick} style={style} color={color}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  border-radius: 16px;
  padding: 0.375rem 0.75rem;
  border: 0;
  font-weight: 700;
  background: ${(p) => bgColor[p.color]?.default};
  color: #101010;
  &:hover {
    background: ${(p) => bgColor[p.color]?.hover};
    color: #000;
  }
`;

export const nearButtonColor = {
  yellow: 'yellow',
};

const bgColor = {
  [nearButtonColor.yellow]: {
    default: 'linear-gradient(180deg, #EEF3BF 0%, #E9F456 100%)',
    hover: 'linear-gradient(180deg,#edf4af 0%,#e3ef37 100%)',
  },
};

export default NearButton2;
