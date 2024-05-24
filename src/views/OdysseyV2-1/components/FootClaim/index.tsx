import Image from 'next/image';

import useClaim from '../../hooks/useClaim';
import { StyledContainer, StyledContentText, StyledContentClaim, StyledClaimContainer } from './styles';

export default function FootClaim({ unclaimed, totalReward, unlocked, onRefreshDetail, id }: any) {
  // const { loading, onClaim } = useClaim(id, onRefreshDetail);

  const claimElement = (count: number, classname?: string) => (
    <StyledContentClaim className={classname}>
      Claim <span className='claim-text'>{count}</span> PTS
    </StyledContentClaim>
  );

  return unclaimed > 0 ? (
    <StyledContainer>
      <StyledContentText>You have completed <span className='count'>2</span> lines of dApps in the MATRIX game, there
        are <span className='count'>2</span> DapDap PTS to be claimed.</StyledContentText>
      <StyledClaimContainer>
        {
          claimElement(400, 'bottom')
        }
        {
          claimElement(400)
        }
      </StyledClaimContainer>

    </StyledContainer>
  ) : null;
}
