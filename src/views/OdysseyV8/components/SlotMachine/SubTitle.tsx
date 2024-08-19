import styled from 'styled-components';
import StyledRefresh from '@/components/Icons/Refresh';
import compassImg from '@public/images/others/odyssey/v8/components/SlotMachine/gold-rush.svg?url';
import Spin from './Spin';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: -20px;
`;

const CompassWapper = styled.div`
  position: absolute;
  background: url(${compassImg.src}) center center no-repeat;
  width: 207px;
  height: 68px;
  top: 60px;
  right: 30px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;

const BtnWrapper = styled.div`
  position: relative;
  width: 194px;
  margin-left: 69px;
  margin-top: 10px;
`;

const BtnBg = styled.div`
  width: 100%;
  height: 64px;
  border-radius: 16px;
  background: linear-gradient(180deg, #17181c -118.46%, #191a1f 100%);
  backdrop-filter: blur(10px);
`;

const Btn = styled.div`
  width: 194px;
  height: 62px;
  border-radius: 16px;
  background: linear-gradient(180deg, #5b5e69 0%, #3f424e 100%);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 18px;
  font-style: italic;
  font-weight: 700;
  position: absolute;
  top: -10px;
  cursor: pointer;
  transition: 0.1s;

  &:hover {
    transform: translateY(3px);
  }
  &:active {
    transform: translateY(6px);
  }
`;

export const Score = styled.div`
  height: 72px;
  border-radius: 20px;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  background: #000;
  overflow: hidden;
`;

export const ScoreBg = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 72px;
`;

export const ScoreText = styled.div`
  color: #00ffd1;
  text-align: center;
  font-family: '5squared pixel';
  font-size: 26px;
  font-weight: 400;
  text-transform: capitalize;
  display: inline-block;
`;

export default function SubTitle({ setPrizePoolShow, availableSpins, totalSpins, refreshing, onRefresh }: any) {
  return (
    <Wrapper>
      <BtnWrapper>
        <BtnBg />
        <Btn
          onClick={() => {
            if (!refreshing) onRefresh();
          }}
        >
          <StyledRefresh refreshing={refreshing} />
          <span>Refresh Spin</span>
        </Btn>
      </BtnWrapper>
      <Score style={{ width: 336, flexGrow: 'inherit', marginLeft: 72 }}>
        <Spin
          renderChildren={() => (
            <ScoreBg>
              <ScoreText>Spins:</ScoreText>
              <ScoreText>
                {availableSpins} / {totalSpins}
              </ScoreText>
            </ScoreBg>
          )}
        />
      </Score>
      <CompassWapper
        onClick={() => {
          setPrizePoolShow(true);
        }}
      />
    </Wrapper>
  );
}
