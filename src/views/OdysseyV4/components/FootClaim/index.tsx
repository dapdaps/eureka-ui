import Image from 'next/image';

import useClaim from '../../hooks/useClaim';
import Trapeziform from '../Trapeziform';
import TrapeziformBtn from '../TrapeziformBtn';
import { StyledContainer, StyledContent } from './styles';

export default function FootClaim({ unclaimed, unlocked, onRefreshDetail, id }: any) {
  const { loading, onClaim } = useClaim(id, onRefreshDetail);
  const TrapLayout = {
    borderColor: '#FFDD4D',
    corner: 34,
  };

  return unlocked > 0 ? (
    <StyledContainer>
      <Trapeziform {...TrapLayout} className="content">
        <div className="txt">
          You have unlocked <span className="count">{unlocked}</span> dApps on Blast by DapDap
        </div>
        <TrapeziformBtn width="202px" height="61px" handleClick={onClaim} loading={loading}>
          Claim {unclaimed}
          <Image src="/images/odyssey/v4/coin.svg" alt="" width={21} height={21} />
        </TrapeziformBtn>
      </Trapeziform>
    </StyledContainer>
  ) : null;
}
