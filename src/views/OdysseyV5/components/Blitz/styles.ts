import { styled } from 'styled-components';

export const StyledContainer = styled.div`
  background: url("/images/odyssey/v5/blitz/bg.png") no-repeat center / cover;
`;
export const StyledInner = styled.div`
  padding: ${() => `62px var(--odyssey-container-gutter) 40px`};
  max-width: ${() => `var(--odyssey-container-width)`};
  width: 100%;
  margin: 0 auto;
`;
export const StyledHead = styled.div``;
export const StyledContent = styled.div`
  margin-top: 88px;
`;
export const StyledFoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  gap: 461px;
  margin-top: 116px;
  white-space: nowrap;

  .title {
    font-size: 18px;
    font-weight: 400;
    line-height: 23px;
    text-align: center;
    color: #000000;
  }
  .value {
    font-size: 42px;
    font-weight: 700;
    line-height: 63px;
    text-align: center;
    color: #000000;
  }
`;
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

export const StyledEarnedCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: 33px;

  .modeDappBlitzSwiper {
    width: 100%;
    overflow: hidden;
    .swiper-slide {
      width: 430px;
    }
  }
  .tips {
    padding-bottom: 23px;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    text-align: center;
    color: #979ABE;
  }
  .section {
    .title {
      font-size: 16px;
      font-weight: 400;
      line-height: 19px;
      text-align: left;
      color: ${() => `var(--odyssey-primary-color)`};;
    }
    .list {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin: 14px 0 0;
      padding: 0;
      list-style: none;
    }
    .item {
      font-size: 20px;
      font-weight: 400;
      line-height: 24px;
      text-align: left;
      color: #ffffff;
    }
    &.earned {}
    &.requirements {}
  }
`;
export const StyledEarnedItem = styled.li<{ type?: string }>`
  margin: 0;
  padding: 0 8px 0 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: left;
  color: #ffffff;
  background: #2A2A2A;
  height: 34px;
  border-radius: ${({ type }) => type === 'rect' ? '4px' : '17px'};
  white-space: nowrap;
`;
