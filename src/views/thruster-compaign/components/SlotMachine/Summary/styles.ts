import styled from 'styled-components';

export const LoadingWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 145px;
`;

export const StyledContainer = styled.div`
  position: relative;
  width: 1342px;
  height: 145px;
  font-family: Montserrat;
  display: flex;
  margin: 0 auto;
  align-items: center;
  background: rgba(22, 24, 29, 1);
  margin-bottom: 80px;
  z-index: 5;
  /* border: 1px solid #fff; */
  .corner {
    position: absolute;
    width: 34px;
    height: 34px;
  }
  .leftTop {
    top: 0;
    left: 0;
    border-left: 1px solid rgba(227, 85, 75, 1);
    border-top: 1px solid rgba(227, 85, 75, 1);
  }
  .rightTop {
    top: 0;
    right: 0;
    border-right: 1px solid rgba(227, 85, 75, 1);
    border-top: 1px solid rgba(227, 85, 75, 1);
  }
  .leftBottom {
    bottom: 0;
    left: 0;
    border-left: 1px solid rgba(227, 85, 75, 1);
    border-bottom: 1px solid rgba(227, 85, 75, 1);
  }
  .rightBottom {
    bottom: 0;
    right: 0;
    border-right: 1px solid rgba(227, 85, 75, 1);
    border-bottom: 1px solid rgba(227, 85, 75, 1);
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
