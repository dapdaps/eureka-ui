import { StyledContainer } from './styles';

export default function TrapeziformBtn({ children, width, height }: any) {
  return (
    <StyledContainer $width={width} $height={height}>
      {children}
    </StyledContainer>
  );
}
