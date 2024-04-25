import styled from 'styled-components';

export const StyledContainer = styled.div``;

export const StyledContent = styled.div`
  max-width: 1400px;
  margin: -160px auto 0;
`;
const Bg = styled.div`
  height: 497px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;
export const BgHead = styled(Bg)`
  background-image: url('/images/odyssey/v4/ellipse-head.png');
  margin-top: -341px;
`;
export const BgFoot = styled(Bg)`
  margin-top: -230px;
  background-image: url('/images/odyssey/v4/ellipse-foot.png');
`;

export const Head = styled.div`
  height: 138px;
  padding: 0 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const HeadLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  .name {
    color: #fff;
    text-align: center;
    font-family: Gantari;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
export const HeadRight = styled.div`
  display: flex;
  flex-direction: column;
  .numbers {
    color: #fff;
    font-family: Gantari;
    font-size: 26px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .strings {
    color: #fff;
    text-align: center;
    font-family: Gantari;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .str {
  }
`;
export const Body = styled.div`
  padding: 32px;
  display: flex;
  justify-content: space-between;
  gap: 32px;
`;
export const BodyLeft = styled.div``;
export const BodyRight = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .rewards {
    display: flex;
    align-items: center;
    gap: 25px;
  }
  .title {
    color: #ebf479;
    font-family: Montserrat;
    font-size: 36px;
    font-weight: 700;
    text-transform: uppercase;
  }
  .status {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .body {
    color: #979abe;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
  }
  .foot {
    display: flex;
    justify-content: flex-end;
  }
`;
