import styled from 'styled-components';

export const StyledTagItem = styled.div`
  display: flex;
  align-items: center;
`;
export const StyledTagItemInner = styled.div`
  border-radius: 34px;
  height: 32px;
  display: flex;
  align-items: center;
  padding: 0 9px;
  
  &.tag-default {
    border: 1px solid #373A53;
    background: rgba(16, 17, 21, 0.8);
    padding: 17px 9px;
    .reward-text {
      color: #979ABE;
      font-weight: 600;
      margin-right: 8px;
    }
  }

  &.tag-active {
    background: linear-gradient(90deg, #F79CFF 0%, #FFBD7F 50%, #7FC9FF 100%);
    position: relative;
    background-clip: padding-box;
    border: 1px solid transparent;
    height: 36px;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 0;
      margin: 1px;
      border-radius: inherit; /*important*/
      background: rgba(16, 17, 21);
    }

    .reward-text {
      font-weight: 700;
      font-size: 16px;
      line-height: 16px;
      background: linear-gradient(90deg, #FFAF65 3.39%, #FF84EB 50.73%, #9B82FF 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      position: relative;
      z-index: 2;
      margin-right: 8px;
    }
  }
`;
