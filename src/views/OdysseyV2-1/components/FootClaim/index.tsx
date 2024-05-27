import Image from 'next/image';

import useClaim from '../../hooks/useClaim';
import { StyledContainer, StyledContentText } from './styles';
import ClaimButton from '@/views/OdysseyV2-1/components/ClaimButton';

export default function FootClaim({ unclaimed, totalReward, explored, lines = 0, onRefreshDetail, id }: any) {
  const { loading, onClaim } = useClaim(id, onRefreshDetail);
    return unclaimed > 0 ? (
    <StyledContainer>
      <StyledContentText>You have completed <span className='count'>{lines}</span> lines of dApps in the MATRIX game, there
        are <span className='count'>{totalReward - unclaimed}</span> DapDap PTS to be claimed.</StyledContentText>
     <ClaimButton count={200} onClaim={onClaim} loading={loading}/>
    </StyledContainer>
  ) : null;
}
