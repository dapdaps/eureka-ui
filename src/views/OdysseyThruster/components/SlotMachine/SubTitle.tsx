import compassImg from '@public/images/others/odyssey/thruster/components/SlotMachine/gold-rush.svg?url';
import styled from 'styled-components';

import StyledRefresh from '@/components/Icons/Refresh';

import Spin from './Spin';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: -20px;
`;

const BtnWrapper = styled.div`
  position: relative;
  margin-left: 69px;
  margin-top: 10px;
`;

export const Score = styled.div`
  height: 72px;
  border-radius: 20px;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  /* background: #000; */
  /* overflow: hidden; */
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
        <img src="/images/odyssey/thruster/icon.svg" />
      </BtnWrapper>
      <Score style={{ width: 668, flexGrow: 'inherit', marginLeft: 20 }}>
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
    </Wrapper>
  );
}
