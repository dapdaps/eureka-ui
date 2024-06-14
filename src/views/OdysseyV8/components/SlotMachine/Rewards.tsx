import styled from 'styled-components';
import Spin from './Spin';
import { Score, ScoreBg, ScoreText } from './SubTitle';

const Texts = styled.div`
  display: flex;
  align-items: center;
`;

export default function Rewards() {
  return (
    <Score>
      <Spin
        renderChildren={() => (
          <ScoreBg>
            <Texts>
              <ScoreText>YOu win:</ScoreText>
            </Texts>
          </ScoreBg>
        )}
      />
    </Score>
  );
}
