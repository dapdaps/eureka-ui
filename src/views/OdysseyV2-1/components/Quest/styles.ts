import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 100%;
  position: relative;
  &::after {
    background: url('/images/odyssey/v2-1/plate-left.svg') center center no-repeat;
    background-size: contain;
    width: 52px;
    height: 235px;
    position: absolute;
    top: 68px;
    left: 0;
    display: block;
    content: '';
  }
`;

export const StyledContent = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 80px;
  position: relative;
`;

export const StyledTitle = styled.div`
  background: linear-gradient(180deg, #FFF 39.2%, #33C5F4 80%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-family: Trans-America;
  font-size: 42px;
  font-style: normal;
  font-weight: 400;
`;

export const StyledSubTitle = styled.div`
  color: #FFF;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  margin-bottom: 60px;
  `;

export const StyledBody = styled.div`
  padding: 0 ${() => `var(--odyssey2-container-gutter)`};
  max-width: ${() => `var(--odyssey2-content-width)`};
  width: 100%;
  margin: 0 auto;
`;

export const StyledQuestWrap = styled.div`
  width: 100%;
  position: relative;
  &.lending::after {
    display: block;
    content: '';
    position: absolute;
    top: -388px;
    right: 0;
    width: 582px;
    height: 552px;
    background-size: contain;
    background: url('/images/odyssey/v2-1/rocket.svg') center no-repeat;
  }
`;