import Image from 'next/image';

import TrapeziformBtn from '../TrapeziformBtn';
import { StyledContainer, StyledContent } from './styles';

export default function FootClaim({}: any) {
  return (
    <StyledContainer>
      <StyledContent>
        <div className="txt">You have unlocked 1 dApps on Blast by DapDap</div>
        <TrapeziformBtn width="202px" height="61px">
          Claim 200
          <Image src="/images/odyssey/v4/coin.svg" alt="" width={21} height={21} />
        </TrapeziformBtn>
      </StyledContent>
    </StyledContainer>
  );
}
