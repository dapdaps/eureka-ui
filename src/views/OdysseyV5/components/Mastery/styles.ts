import { styled } from "styled-components";

export const StyledContainer = styled.div`
  padding: ${() => `116px var(--odyssey-container-gutter) 137px`};
  position: relative;
  background: url("/images/odyssey/v5/mastery/bg.svg") no-repeat center / cover;
`;
export const StyledTitle = styled.div`
  text-align: center;

  .title {
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
    
    .primary {
      color: ${() => `var(--odyssey-primary-color)`};
    }
  }
`;
export const StyledContent = styled.div`
  background: url("/images/odyssey/v5/mastery/fireworks.svg") no-repeat left bottom / 228px 209px;
`;
export const StyledCard = styled.div``;

