import styled from "styled-components";

export const Wrapper = styled.div`
  .NavigationMenuRoot {
    display: flex;
    align-items: center;
  }

  .NavigationMenuList {
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 0;
    gap: 30px;
    ul {
      padding: 0;
    }
    li {
      display: flex;  
      align-items: center;
      position: relative;
      a {
        &:hover {
          text-decoration: none;
        }
      }
    }
  }

  .CaretDown {
    transition: transform 250ms ease;
  }

  [data-state='open'] {
    &.NavigationMenuTrigger{
      padding: 10px 14px;
      border-radius: 12px;
      background-color: #1F2229;
      box-sizing: border-box;
      cursor: pointer;
    }

    .CaretDown {
      color: #EBF479;
      transform: rotate(-180deg);
    }
  }

  .NavigationMenuTrigger,
  .NavigationMenuLink {
    all: unset;
    outline: none;
    user-select: none;
    font-weight: 600;
    line-height: 1;
    font-size: 16px;
    font-family: Montserrat;
    color: #fff;
    position: relative;
    gap: 2px;
    padding: 10px 14px;

    .arrow-icon {
      width: 12px;
      height: 6px;
      margin-left: 5px;
      fill: currentColor;
    }
  }
  /* .NavigationMenuTrigger:focus,
  .NavigationMenuLink:focus {
    color: #EBF479;
    padding: 10px 14px;
    border-radius: 12px;
    background-color: #1F2229;
    box-sizing: border-box;
    .arrow-icon:hover { color: #EBF479; }
  } */


  .NavigationMenuTrigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .NavigationMenuLink {
    display: block;
    text-decoration: none;
    font-size: 14px;
    line-height: 1;
    font-weight: 600;
  }

  .NavigationMenuContentV2 {
    position: absolute;
    background-color: #1F2229;
    animation-duration: 250ms;
    animation-timing-function: ease;
    border-radius: 12px;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(51, 54, 72, 1);
    background: rgba(31, 34, 41, 1);
    &.bridge { 
      top: 56px;
      left: 0px;
      width: 754px;
      padding: 25px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    &.chains {
      top: 56px;
      width: 425px;
      left: -152px
    }
  }

  .NavigationMenuContent {
    position: absolute;
    background-color: #1F2229;
    animation-duration: 250ms;
    animation-timing-function: ease;
    border-radius: 12px;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(51, 54, 72, 1);
    background: rgba(31, 34, 41, 1);
  }


  .NavigationMenuContent[data-motion='from-start'] {
    animation-name: enterFromLeft;
  }
  .NavigationMenuContent[data-motion='from-end'] {
    animation-name: enterFromRight;
  }
  .NavigationMenuContent[data-motion='to-start'] {
    animation-name: exitToLeft;
  }
  .NavigationMenuContent[data-motion='to-end'] {
    animation-name: exitToRight;
  }
  @media only screen and (min-width: 600px) {
    .NavigationMenuContent {
      width: auto;
    }
  }

  .NavigationMenuIndicator {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 10px;
    top: 100%;
    overflow: hidden;
    z-index: 1;
    transition: width, transform 250ms ease;
  }
  .NavigationMenuIndicator[data-state='visible'] {
    animation: fadeIn 200ms ease;
  }
  .NavigationMenuIndicator[data-state='hidden'] {
    animation: fadeOut 200ms ease;
  }


  .List {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 0;
    list-style: none;
    width: 754px;
    gap: 50px;
    &.bridge {
      gap: 0;
      padding: 0 10px;
    }
    &.chain {
      width: 425px;
      padding: 0
    }
  }
  @media only screen and (min-width: 600px) {
    .List.one {
      width: 500px;
      grid-template-columns: 0.75fr 1fr;
    }
    .List.two {
      width: 400px;
      grid-auto-flow: column;
      grid-template-rows: repeat(3, 1fr);
    }
  }

  .ListItemLink {
    display: block;
    outline: none;
    text-decoration: none;
    user-select: none;
    padding: 16px 8px 4px 8px;
    padding-left: 55px;
    border-radius: 6px;
    font-size: 15px;
    line-height: 1;
    position: relative;
  }
  .ListItemLink i {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
    font-size: 22px;
    color: #706f6c;
  }

  .ListItemLink:hover {
    text-decoration: none;
    background-color: #f3f3f2;
  }

  .ListItemHeading {
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: 5px;
    color: #1b1b18;
  }

  .ListItemText {
    line-height: 1.4;
    font-weight: initial;
    color: #868682;
  }

  .Callout {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    padding: 25px;
    text-decoration: none;
    outline: none;
    user-select: none;
  }

  .CalloutHeading {
    color: white;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.2;
    margin-top: 16px;
    margin-bottom: 7px;
  }

  .CalloutText {
    font-size: 14px;
    line-height: 1.3;
  }

  .ViewportPosition {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    top: 100%;
    left: 0;
    perspective: 2000px;
  }

  @keyframes enterFromRight {
    from {
      opacity: 0;
      transform: translateX(200px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes enterFromLeft {
    from {
      opacity: 0;
      transform: translateX(-200px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes exitToRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(200px);
    }
  }

  @keyframes exitToLeft {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-200px);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: rotateX(-30deg) scale(0.9);
    }
    to {
      opacity: 1;
      transform: rotateX(0deg) scale(1);
    }
  }

  @keyframes scaleOut {
    from {
      opacity: 1;
      transform: rotateX(0deg) scale(1);
    }
    to {
      opacity: 0;
      transform: rotateX(-10deg) scale(0.95);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;