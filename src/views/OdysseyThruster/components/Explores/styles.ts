import styled from 'styled-components';

export const StyledContainer = styled.div`
  font-family: Montserrat;
  margin: 0px auto 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .poly-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* gap: 6px; */
    padding: 0 10px;
    width: 266px;
    height: 60px;
    background-color: #121212;
    color: #fff;
    font-family: Montserrat;
    font-size: 16px;
    cursor: pointer;
    .poly-mask {
      position: absolute;
      display: none;
    }
    &:hover {
      .poly-mask {
        display: block;
      }
    }
    &.large {
      width: 276px;
    }
    &.renzo {
      background-repeat: no-repeat;
      /* background-size: contain; */
      background-position: center;
      background-image: url('/images/odyssey/v4/bg-renzo.png');
    }
    &.lido {
      background-repeat: no-repeat;
      /* background-size: contain; */
      background-position: center;
      background-image: url('/images/odyssey/v4/bg-lido.png');
    }
  }
  .poly-lp {
  }
  .poly-lp-last {
    position: absolute;
    margin-left: -14px;
  }
`;

export const StyledContent = styled.div`
  margin: 0 auto 37px;
  /* width: 1113px; */
  &.cols-1,
  &.cols-2 {
    margin: 0 auto;
  }
`;
export const StyledItemWrap = styled.div`
  padding: 0 37px;
  &.cols-1 {
    padding: 0;
  }
  &.cols-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 12px;
    padding: 0;
  }
`;
export const Title = styled.div`
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
  font-size: 42px;
  font-style: normal;
  font-weight: 800;
  text-transform: capitalize;
`;
export const Desc = styled.div`
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 30px;
`;

export const Btns = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
`;

export const StyledItem = styled.div<{ $disabled: boolean; $isComing: boolean }>`
  height: 75px;
  border-radius: 6px;
  border: 1px solid #373535;
  box-sizing: border-box;
  padding: 14px 28px 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${({ $disabled, $isComing }) => ($disabled || $isComing ? 'not-allowed' : 'pointer')};
  filter: ${({ $isComing }) => ($isComing ? 'blur(5px)' : 'none')};
  margin-bottom: 16px;
  background:
    url(/images/odyssey/thruster/bg-task-left.svg) left bottom no-repeat,
    url(/images/odyssey/thruster/bg-task-right.svg) right top no-repeat,
    #1c1b1b;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StyledItemTitle = styled.div`
  width: 100%;
  flex-shrink: 0;
  color: #fff;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const StyledItemLeft = styled.div`
  display: flex;
  gap: 26px;
  align-items: center;
`;

export const StyledItemRight = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const Unexplored = styled.div`
  color: #979abe;
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
