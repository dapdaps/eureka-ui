import ClaimButton from '@/views/OdysseySurge/components/ClaimButton';

import { StyledContainer, StyledContentText } from './styles';

export default function FootClaim({ unclaimed, totalReward, lines = 0, loading, onClaim }: any) {
  return unclaimed > 0 && (
    <StyledContainer>
      <StyledContentText>You have completed <span className="count">{lines}</span> lines of dApps in the MATRIX game,
        there
        are <span className="count">{totalReward - unclaimed}</span> DapDap PTS to be claimed.</StyledContentText>
      <ClaimButton count={unclaimed} onClaim={onClaim} loading={loading} />
    </StyledContainer>
  );
}
