import Loading from '@/components/Icons/Loading';

import { StyledContainer } from './styles';

const Button = (props: Props) => {
  const { children, style, className, onClick, disabled, loading } = props;

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (disabled || loading) return;
    onClick && onClick();
  };

  return (
    <StyledContainer
      style={style}
      className={`${className} ${disabled ? 'disabled' : ''}`}
      disabled={disabled}
      onClick={handleClick}
    >
      {loading && <Loading size={16} />}
      {children}
    </StyledContainer>
  );
};

export default Button;

interface Props {
  children: any;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
  loading?: boolean;

  onClick?(): void;
}
