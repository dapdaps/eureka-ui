import styled from 'styled-components';

export const StyledContainer = styled.div`
  font-family: Montserrat;
  padding: 67px 0 80px;
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
  padding-top: 36px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
