import { StyledContainer } from './styles';

export default function Trapeziform({ children, borderColor, bgColor, corner, ...rest }: any) {
  return (
    <StyledContainer $borderColor={borderColor} $bgColor={bgColor} $corner={corner} {...rest}>
      {children}
    </StyledContainer>
  );
}
