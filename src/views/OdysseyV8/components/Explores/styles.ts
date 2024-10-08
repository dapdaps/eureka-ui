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
  margin: 0 auto 100px;
  width: 1188px;
`;
export const StyledItemWrap = styled.div`
  padding-top: 20px;
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

export const StyledItem = styled.div<{ $disabled: boolean }>`
  height: 70px;
  border-radius: 12px;
  border: 1px solid #373a53;
  background: #1e2028;
  box-sizing: border-box;
  padding: 14px 28px 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const StyledItemTitle = styled.div`
  width: 100%;
  flex-shrink: 0;
  color: #fff;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 24px */
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
