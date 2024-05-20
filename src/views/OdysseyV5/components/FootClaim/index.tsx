import Image from 'next/image';

import useClaim from '../../hooks/useClaim';
import TrapeziformBtn from '../TrapeziformBtn';
import { StyledContainer, StyledContent } from './styles';

export default function FootClaim({ unclaimed, totalReward, explored, onRefreshDetail, id }: any) {
  const { loading, onClaim } = useClaim(id, onRefreshDetail);

  return unclaimed > 0 ? (
    <StyledContainer>
      <StyledContent>
        <div className="txt">
          You have explored <span className="count">{explored}</span> times on Mode by DapDap,
          <span className="count"> {totalReward - unclaimed} </span> PTS has been claimed.
        </div>

        <TrapeziformBtn handleClick={onClaim} loading={loading}>
          Claim {unclaimed}
          <Image src="/images/odyssey/v5/coin.svg" alt="" width={21} height={21} />
        </TrapeziformBtn>
      </StyledContent>
    </StyledContainer>
  ) : null;
}
