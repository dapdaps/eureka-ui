import Button from '../../components/Button';
import NumberBall from '../../components/NumberBall';
import {
  StyledPrize,
  StyledPrizePot,
  StyledRound,
  StyledRoundContent,
  StyledRoundHeader,
  StyledRoundInner,
  StyledRoundNumbers,
  StyledRoundTime,
  StyledRoundTitle
} from './styles';

export default function Round({ round }: any) {
  return (
    <StyledRound>
      <StyledRoundInner>
        <StyledRoundHeader>
          <StyledRoundTitle>Round {round}</StyledRoundTitle>
          <StyledRoundTime>Drawn Sep 16, 2024, 15:00 UTC</StyledRoundTime>
        </StyledRoundHeader>
        <StyledRoundContent>
          <StyledPrizePot>
            <div>Prize Pot</div>
            <StyledPrize size={36} style={{ marginTop: 12 }}>
              $4500
            </StyledPrize>
          </StyledPrizePot>
          <StyledRoundNumbers>
            <NumberBall />
            <NumberBall />
            <NumberBall />
            <NumberBall />
            <NumberBall />
          </StyledRoundNumbers>
          <Button disabled>Check Now</Button>
        </StyledRoundContent>
      </StyledRoundInner>
    </StyledRound>
  );
}
