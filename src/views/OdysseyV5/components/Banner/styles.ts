import styled from 'styled-components';

export const StyledContainer = styled.div`
  height: 880px;
  position: relative;
  padding-top: 58px;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;

const Image = `
  position: absolute;
`;

const FloatAnimation = `
  @keyframes float {
      0% {
        transform: translate3d(0, 0, 0);
      }
      25% {
        transform: translate3d(0, 10px, 0);
      }
      75% {
        transform: translate3d(0, -10px, 0);
      }
      100% {
        transform: translate3d(0, 0, 0);
      }
    }
`;

export const StyledContent = styled.div`
  ${Image};
  width: 100%;
  max-width: ${() => `var(--odyssey-container-width)`};
  z-index: 4;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  top: 193px;
  gap: 66px;
  padding-left: ${() => `var(--odyssey-container-gutter)`};
  padding-right: ${() => `var(--odyssey-container-gutter)`};
`;

export const StyledMoon = styled.div`
  ${Image};
  ${FloatAnimation};
  z-index: 1;
  bottom: 0;
  animation-name: float;
  animation-duration: 10s;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;

export const StyledMoonDark = styled.div`
  ${Image};
  z-index: 3;
  top: -58px;
  transform: translateX(-460px);
`;

export const StyledMountain = styled.div<{ src: string }>`
  ${Image};
  z-index: 2;
  height: 627px;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ src }) => `url("${src}") no-repeat center bottom / cover`};
`;

export const StyledSlogan = styled.div`
`;

export const StyledTitle = styled.div`
  .title {
    margin: 0;
    font-size: 60px;
    font-weight: 500;
    line-height: 72px;
    color: #fff;
    text-align: center;

    &.sub {
      font-size: 24px;
      font-weight: 400;
      line-height: 24px;
      margin-top: 19px;
    }
  }

  .dark {
    color: #000;
  }
`;
