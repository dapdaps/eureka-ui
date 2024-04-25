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
  margin-top: -372px;
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
  background-image: url('/images/odyssey/v4/bg-particle.png');
  background-repeat: no-repeat;
  background-size: contain;
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

export const ModalHead = styled.div`
  color: #fff;
  text-align: center;
  font-family: Gantari;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  height: 87px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 44px;
  position: relative;
  overflow: hidden;
  .smoke {
    position: absolute;
    height: 100px;
    width: 837px;
    left: 0;
    bottom: -55px;
    border-radius: 1100px;
    opacity: 0.3;
    background: radial-gradient(50% 50% at 50% 50%, #fff 0%, rgba(255, 255, 255, 0) 100%);
  }
  .left {
    display: flex;
    align-items: center;
    gap: 14px;
  }
`;
export const ModalBody = styled.div`
  color: #fff;
  text-align: center;
  font-family: Gantari;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 25px 30px 38px;
  .desc {
    text-align: left;
    color: #979abe;
    font-family: Gantari;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    margin-bottom: 25px;
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  .rank-table {
    width: 100%;
    flex-shrink: 0;
    border: 1px solid #373a53;
    border-radius: 4px;
    background: rgba(55, 58, 83, 0.2);
  }
  .rank-head {
    width: 100%;
    display: table;
    color: #979abe;
    font-family: Gantari;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 15px 20px 5px;
  }
  .rank-th {
    float: left;
    width: 33.33333%;
  }
  .rank-row {
    width: 100%;
    display: table;
    color: #fff;
    padding: 15px 20px;
    font-family: Gantari;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .rank-col {
    float: left;
    width: 33.33333%;
  }
  .you {
    height: 48px;
    display: flex;
    align-items: center;
    color: #979abe;
    font-family: Gantari;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .your-rank {
    padding: 0 20px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    border: 1px solid #373a53;
    background: rgba(55, 58, 83, 0.2);
    color: #fff;
    font-family: Gantari;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
