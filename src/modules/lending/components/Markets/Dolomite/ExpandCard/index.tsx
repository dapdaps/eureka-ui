import {
  StyledCard,
  StyledContainer,
  StyledContent,
  StyledExpand,
  StyledExpandContent,
  StyledExpandIcon,
  StyledExpandIconSvg
} from './styles';

const ExpandCard = (props: Props) => {
  const { children, content, expand, expandHeight, style, arrowStyle, expandStyle, onToggle } = props;

  const handleClick = () => {
    onToggle(!expand);
  };

  return (
    <StyledContainer style={style}>
      <StyledCard onClick={handleClick}>
        <StyledContent>{content}</StyledContent>
        <StyledExpandIcon style={arrowStyle}>
          <StyledExpandIconSvg
            className={expand ? 'expand' : ''}
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="8"
            viewBox="0 0 11 8"
            fill="none"
          >
            <path
              d="M5.94103 7.02391C5.5407 7.52432 4.77961 7.52432 4.37929 7.02391L0.459914 2.1247C-0.0638966 1.46993 0.402276 0.499999 1.24078 0.499999L9.07953 0.5C9.91804 0.5 10.3842 1.46993 9.8604 2.12469L5.94103 7.02391Z"
              fill="#979ABE"
            />
          </StyledExpandIconSvg>
        </StyledExpandIcon>
      </StyledCard>
      <StyledExpand
        variants={{
          expand: {
            opacity: 1,
            display: 'block',
            height: expandHeight || 292,
            transition: {
              duration: 0.3,
              opacity: {
                delay: 0.1
              }
            }
          },
          collapse: {
            opacity: 0,
            height: 0,
            display: 'none',
            transition: {
              duration: 0.3,
              height: {
                delay: 0.1
              },
              display: {
                delay: 0.3
              }
            }
          }
        }}
        animate={expand ? 'expand' : 'collapse'}
        initial="collapse"
        style={expandStyle}
      >
        <StyledExpandContent>{children}</StyledExpandContent>
      </StyledExpand>
    </StyledContainer>
  );
};

export default ExpandCard;

interface Props {
  expand: boolean;
  children: any;
  content: any;
  expandHeight?: number;
  arrowStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  expandStyle?: React.CSSProperties;

  onToggle(expand: boolean): void;
}
