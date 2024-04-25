import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: relative;
  width: 1342px;
  height: 145px;
  font-family: Montserrat;
  display: flex;
  margin: 0 auto;
  align-items: center;
  background: rgba(22, 24, 29, 0.8);
  backdrop-filter: blur(5px);
  border: 1px solid #fff;
  .xLine {
    position: absolute;
    width: 1270px;
    height: 1px;
    border-top: 1px solid #000;
    left: 36px;
    &.top {
      top: -1px;
    }
    &.bottom {
      bottom: -1px;
    }
  }
  .yLine {
    position: absolute;
    width: 1px;
    height: 73px;
    border-left: 1px solid #000;
    &.left {
      left: -1px;
    }

    &.right {
      right: -1px;
    }
  }
`;
export const Item = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #fff;
  &:last-child {
    border-right: none;
  }
`;
export const Title = styled.div`
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  text-transform: capitalize;
`;
export const Value = styled.div`
  color: #fff;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  text-transform: capitalize;
`;

// export const StyledContent = styled.div`
//   padding-top: 36px;
//   gap: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;
