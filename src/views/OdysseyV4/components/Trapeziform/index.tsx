import { StyledContainer } from './styles';

export default function Trapeziform({ children, borderColor, borderWidth, ...rest }: any) {
  return (
    <StyledContainer $borderColor={borderColor} $borderWidth={borderWidth} {...rest}>
      {children}
    </StyledContainer>
  );
}
