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
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;

      .logo {
        color: #ebf479;
      }
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

  .modeDappMasterySwiper {
    width: 100%;
  }
`;
export const StyledEarnedList = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 17px;
  flex-wrap: wrap;
  height: 100%;
  > div {
    flex: 1;
  }
`;
export const StyledEarnedContent = styled.ul`
  margin: 37px 0 0;
  padding: 0;
  list-style: none;
  
  .condition-item {
    margin: 49px 0 0;
    padding: 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    color: #ffffff;
    white-space: wrap;
    position: relative;

    .condition-item-inner {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 14px;
    }
    
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

  .kim-liquidity-coins {
    list-style: none;
    margin: 10px 0 0;
    padding: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;

    .coin-item {
      margin: 0;
      padding: 0;
      
      display: flex;
      align-items: center;
      gap: 0;
      color: #979ABE;
      font-family: Gantari;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;

      .item-icon {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: nowrap;
        gap: 0;

        > img {
          flex-shrink: 0;
          flex-grow: 0;

          &:last-child {
            transform: translateX(-7px);
          }
        }
      }

      .item-name {
        margin-left: -3px;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
`;

export const StyledCardContainer = styled.div`
  min-height: 785px;
  border-radius: 16px;
  background: #1A1A1A;
  padding: 38px 30px 28px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 30px;
  height: 100%;
`;
export const StyledCardHead = styled.div`
  font-size: 36px;
  font-weight: 500;
  line-height: 43px;
  text-align: left;
  color: ${() => `var(--odyssey-primary-color)`};
`;
export const StyledCardContent = styled.div`
  min-height: 242px;
  margin-bottom: 54px;
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
    gap: 15px 8px;
    margin: 14px 0 0;
    padding: 0;
    list-style: none;
    
    .item {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  }
  .primary-text {
    color: ${() => `var(--odyssey-primary-color)`};
  }
`;
export const StyledCardFoot = styled.div`
  margin-top: auto;
  height: 100%;
  padding-top: 30px;
`;

export const StyledLeftBtn = styled.div`
  color: #979ABE;
  border: 2px solid transparent;
  &:hover {
    color: ${() => `var(--odyssey-primary-color)`};
    border: 2px solid #979ABE;
  }
`;
export const StyledRightBtn = styled.div`
  color: #979ABE;
  border: 2px solid transparent;
  &:hover {
    color: ${() => `var(--odyssey-primary-color)`};
    border: 2px solid #979ABE;
  }
`;
export const StyledPageBtn = styled.div`
  .btn {
    width: 60px;
    height: 60px;
    background: rgba(33, 35, 42, 0.9);
    margin-left: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;


export const StyledArrow = styled.div`
transform: rotate(-180deg);`;

