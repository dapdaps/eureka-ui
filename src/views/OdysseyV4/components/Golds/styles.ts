import styled from 'styled-components';

export const StyledContainer = styled.div`
  .view-rank {
    height: 62px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: #fff;
    text-align: center;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
  }
  .quest-item {
    margin-bottom: 30px;
  }
`;

export const StyledContent = styled.div`
  /* max-width: 1400px; */
  width: 1188px;
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

  background-repeat: no-repeat;
  background-size: contain;
  &.bg-particle {
    background-image: url('/images/odyssey/v4/bg-particle.png');
  }
  &.bg-ring {
    background-image: url('/images/odyssey/v4/bg-ring.png');
  }
  &.bg-ambient {
    background-image: url('/images/odyssey/v4/bg-ambient.png');
  }
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
export const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`;

export const HeadRight = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Body = styled.div`
  padding: 32px;
  display: flex;
  justify-content: space-between;
  gap: 32px;
`;
export const BodyLeft = styled.div`
  width: 414px;
  flex-shrink: 0;
`;
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
    gap: 18px;
  }
  .rewards-right {
    flex-grow: 1;
  }
  .intro {
    color: #fff;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 400;
  }
  .title {
    color: #ebf479;
    font-family: Montserrat;
    font-size: 36px;
    font-weight: 700;
    text-transform: uppercase;
    margin-top: -8px;
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

export const StyledTimerBox = styled.div`
  display: flex;
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  gap: 20px;
`;

export const Rank = styled.div`
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  display: flex;
  padding-top: 54px;
  align-items: center;
  justify-content: center;
  gap: 10px;

  color: #ebf479;
  font-family: Montserrat;
  font-size: 26px;
  font-weight: 700;

  &.rank1 {
    height: 108px;
    background-image: url('/images/odyssey/v4/bg-rank1.svg');
    margin-bottom: 16px;
  }
  &.rank2 {
    color: #fff;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 700;

    width: 202px;
    height: 100px;
    background-image: url('/images/odyssey/v4/bg-rank2.svg');
  }
  &.rank3 {
    color: #fff;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 700;

    width: 202px;
    height: 100px;
    background-image: url('/images/odyssey/v4/bg-rank3.svg');
  }
`;

export const RankGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const Bdage = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #000;
  font-family: Montserrat;
  font-size: 26px;
  font-weight: 700;
  position: absolute;
  left: 50%;
  top: -20px;
  margin-left: -30px;
  &.bd1 {
    background-image: url('/images/odyssey/v4/bdage1.svg');
  }
  &.bd2 {
    background-image: url('/images/odyssey/v4/bdage2.svg');
  }
  &.bd3 {
    background-image: url('/images/odyssey/v4/bdage3.svg');
  }
`;
