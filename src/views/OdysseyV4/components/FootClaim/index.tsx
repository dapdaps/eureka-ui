import Image from 'next/image';

import Trapeziform from '../Trapeziform';
import TrapeziformBtn from '../TrapeziformBtn';
import { StyledContainer, StyledContent } from './styles';

export default function FootClaim({ unclaimed, unlocked }: any) {
  const TrapLayout = {
    borderColor: '#FFDD4D',
    corner: 34,
  };
  //TODO CLAIM
  return unlocked > 0 ? (
    <StyledContainer>
      <Trapeziform {...TrapLayout} className="content">
        <div className="txt">You have unlocked {unlocked} dApps on Blast by DapDap</div>
        <TrapeziformBtn width="202px" height="61px">
          Claim {unclaimed}
          <Image src="/images/odyssey/v4/coin.svg" alt="" width={21} height={21} />
        </TrapeziformBtn>
      </Trapeziform>
    </StyledContainer>
  ) : null;
}
