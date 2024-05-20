import { styled } from "styled-components";

export const StyledContainer = styled.div`
  position: relative;
  background: url("/images/odyssey/v5/mastery/bg.svg") no-repeat left 50% top -80px / 927px 927px;
`;
export const StyledInner = styled.div`
  padding: ${() => `116px var(--odyssey-container-gutter) 137px`};
  max-width: ${() => `var(--odyssey-container-width)`};
  width: 100%;
  margin: 0 auto;
  background: url("/images/odyssey/v5/mastery/fireworks.svg") no-repeat right 6.48% bottom -63px / 228px 209px;
`;
export const StyledTitle = styled.div`
  text-align: center;

  .title {
    margin: 0;
    font-size: 52px;
    font-weight: 500;
    line-height: 62px;
    color: #ffffff;

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
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 20px;
  margin-top: 50px;
`;
export const StyledEarnedList = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 17px;
  flex-wrap: wrap;
  
  > div {
    flex: 1;
  }
`;
export const StyledEarnedContent = styled.ul`
  margin: 37px 0 0;
  padding: 0;
  
  li {
    margin: 49px 0 0;
    padding: 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 14px;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    color: #ffffff;
    white-space: wrap;
    position: relative;
    
    &:first-child {
      margin-top: 0;
    }

    &:not(&:last-child) {
      &::after {
        content: "";
        display: block;
        width: 1px;
        background: #3D405A;
        position: absolute;
        height: calc(100% + 49px - 30px);
        left: 5px;
        top: 24px;
      }
    }
  }

  .point {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: ${() => `var(--odyssey-primary-color)`};
    margin-top: 4px;
    flex-shrink: 0;
    flex-grow: 0;
  }
`;

export const StyledCardContainer = styled.div`
  min-height: 785px;
  border-radius: 16px;
  background: #1A1A1A;
  padding: 38px 32px 28px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 30px;
`;
export const StyledCardHead = styled.div`
  font-size: 36px;
  font-weight: 500;
  line-height: 43px;
  text-align: left;
  color: ${() => `var(--odyssey-primary-color)`};
`;
export const StyledCardContent = styled.div`
  .section {
    &.points-earned {
      .item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: nowrap;
        gap: 8px;
        background: #343434;
        height: 34px;
        line-height: 34px;
        font-size: 16px;
        font-weight: 400;
        padding-right: 8px;
        border-radius: 17px;
        color: #ffffff;
        white-space: nowrap;
      }
    }

    &.result {
      margin-top: 40px;
      
      .list {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
      }
      
      .item {
        font-size: 16px;
        font-weight: 400;
        line-height: 19px;
        text-align: left;
        color: #ffffff;
      }
    }
  }
  .title {
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    text-align: left;
    color: ${() => `var(--odyssey-primary-color)`};
  }
  .list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin: 14px 0 0;
    padding: 0;
    list-style: none;
    
    .item {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  }
`;
export const StyledCardFoot = styled.div`
  margin-top: auto;
  padding-top: 54px;
`;

