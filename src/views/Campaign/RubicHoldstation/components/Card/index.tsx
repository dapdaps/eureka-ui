import { StyledContainer } from './styles';

const Card = (props: Props) => {
  const { children, className, style } = props;

  return (
    <StyledContainer className={className} style={style}>
      {children}
    </StyledContainer>
  );
};

export default Card;

interface Props {
  children: any;
  className?: string;
  style?: React.CSSProperties;
}
