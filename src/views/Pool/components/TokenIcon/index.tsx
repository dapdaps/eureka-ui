import styled from 'styled-components';

const StyledTokenIcon = styled.img<{ size: number }>`
  border-radius: 50%;
  width: ${({ size }) => size + 'px'};
  height: ${({ size }) => size + 'px'};
`;

export default function TokenIcon({ token, size = 22, style }: any) {
  return <StyledTokenIcon src={token?.icon || '/assets/tokens/default_icon.png'} size={size} style={style} />;
}
