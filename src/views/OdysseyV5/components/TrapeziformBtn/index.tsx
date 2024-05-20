import Loading from '@/components/Icons/Loading';

import { StyledContainer } from './styles';

export default function TrapeziformBtn({ children, handleClick, loading, ...rest }: any) {
  const onClick = () => {
    if (loading) return false;
    handleClick && handleClick();
  };

  return (
    <StyledContainer onClick={onClick} {...rest}>
      {loading ? <Loading size={20} /> : children}
    </StyledContainer>
  );
}
