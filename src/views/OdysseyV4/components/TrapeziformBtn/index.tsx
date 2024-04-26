import Loading from '@/components/Icons/Loading';

import { StyledContainer } from './styles';

export default function TrapeziformBtn({ children, width, height, handleClick, loading }: any) {
  const onClick = () => {
    if (loading) return false;
    handleClick();
  };

  return (
    <StyledContainer $width={width} $height={height} onClick={onClick}>
      {loading ? <Loading size={20} /> : children}
    </StyledContainer>
  );
}
