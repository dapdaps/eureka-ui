import styled from 'styled-components';

export const StyledContainer = styled.div`
  --odyssey-container-gutter: 100px;
  --odyssey-container-width: 1542px;
  --odyssey-primary-color: #DFFE00;

  background: #000;
  padding-bottom: 60px;
  font-family: Chakra Petch;
`;

export const StyledContent = styled.div`
  margin: 0 auto;
`;

export const StyledNavigator = styled.div`
  width: 56px;
  height: 401px;
  border-radius: 10px;
  background: rgba(35, 37, 43, 0.80);
  backdrop-filter: blur(5px);
  position: fixed;
  right: 20px;
  top: 289px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 49px;
  
  .nav-item {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    flex-grow: 0;
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .pointer {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #979ABE;
      transition: all 0.3s linear;
    }
    
    .title {
      display: none;
      position: absolute;
      color: ${() => `var(--odyssey-primary-color)`};
      text-align: right;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 120%;
      text-transform: capitalize;
      left: 0;
      top: 50%;
      transform: translate(calc(-100% - 33px), -50%);
      white-space: nowrap;
    }

    &.active {
      .pointer {
        background: ${() => `var(--odyssey-primary-color)`};
        filter: ${() => `drop-shadow(0px 0px 10px var(--odyssey-primary-color))`};
      }
    }
    
    &:hover {
      .title {
        display: block;
      }
    }

    &:not(:last-child) {
      &::after {
        content: "";
        display: block;
        width: 1px;
        height: 43px;
        opacity: 0.5;
        background: #979ABE;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 26px;
      }
    }
  }
`;
