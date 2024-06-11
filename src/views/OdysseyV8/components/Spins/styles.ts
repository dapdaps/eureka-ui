import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 1260px;
  margin: 0 auto;
  .quest-item {
    width: 400px;
    position: relative;
  }
  .quest-desc {
    color: #979abe;
    font-family: Montserrat;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top: 18px;
    margin-bottom: 18px;
    height: 120px;
  }
`;

export const StyledContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;
const Bg = styled.div`
  height: 497px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

export const BgFoot = styled(Bg)`
  margin-top: -230px;
  background-image: url('/images/odyssey/v4/ellipse-foot.png');
`;

export const Head = styled.div`
  padding: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const QuestBg = styled.div<{ $color: string }>`
  width: 420px;
  height: 210.753px;
  transform: rotate(-15deg);
  flex-shrink: 0;
  position: absolute;
  left: -38%;
  top: -12%;
  border-radius: 420px;
  opacity: 0.3;
  background: radial-gradient(50% 50% at 50% 50%, ${({ $color }) => $color} 0%, rgba(0, 0, 0, 0) 100%);
`;
export const HeadLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  .name {
    color: #fff;
    text-align: center;
    font-size: 24px;
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
  padding: 0px 30px 30px;
`;
export const BodyLeft = styled.div`
  width: 414px;
  flex-shrink: 0;
`;

export const QuestGoldHints = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  margin-top: 9px;
  text-align: center;
`;

export const QuestGold = styled.div`
  color: #ebf479;
  font-family: Montserrat;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 36px */
  text-transform: uppercase;
  text-align: center;
`;

export const RankGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const Spins = styled.div`
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 16px;
  color: #00ffd1;
  font-family: '5squared pixel';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  text-transform: capitalize;
  border: 1px solid #00ffd1;
  background-color: rgba(0, 255, 209, 0.11);
  border-radius: 8px;
`;
