import { styled } from 'styled-components';

export const StyledContainer = styled.div`
  .title {
    color: #FFF;
    font-size: 16px;
    line-height: 20px;
    font-style: normal;
    font-weight: 600;
  }
  .content {
    margin-top: 14px;
  }
`;

export const StyledContent = styled.div`
  margin-top: 14px;
`;

const Title = (props: any) => {
  const { title, children, style } = props;

  return (
    <StyledContainer style={style}>
      <div className="title">{title}</div>
      <StyledContent>
        {children}
      </StyledContent>
    </StyledContainer>
  );
};

export default Title;
