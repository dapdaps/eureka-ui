import { styled } from "styled-components";

export const StyledContainer = styled.div`
  padding: ${() => `62px var(--odyssey-container-gutter) 40px`};
  background: url("/images/odyssey/v5/blitz/bg.png") no-repeat center / cover;
`;
export const StyledHead = styled.div``;
export const StyledContent = styled.div``;
export const StyledFoot = styled.div``;
export const StyledTitle = styled.div`
  text-align: center;

  .title {
    margin: 0;
    font-size: 52px;
    font-weight: 500;
    line-height: 62px;
    color: #000000;
    
    &.sub {
      font-size: 20px;
      font-weight: 300;
      line-height: 20px;
      margin-top: 20px;
    }
  }
`;
