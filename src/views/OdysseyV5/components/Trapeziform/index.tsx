import { StyledContainer } from './styles';

export default function Trapeziform({ children, borderColor, bgColor, corner, handleClick, ...rest }: any) {
  const onClcik = () => {
    handleClick && handleClick?.();
  };

  return (
    <StyledContainer $borderColor={borderColor} $bgColor={bgColor} $corner={corner} onClick={onClcik} {...rest}>
      {children}
    </StyledContainer>
  );
}
