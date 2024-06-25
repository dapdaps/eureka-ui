import { Desc, StyledContainer, Title } from './styles';

export default function Pilcrow({ title, desc }: any) {
  return (
    <StyledContainer>
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
      
    </StyledContainer>
  );
}
