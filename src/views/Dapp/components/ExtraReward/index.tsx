import { StyledExtraReward, StyledExtraRewardContent, StyledCoin, StyledTitle, StyledLinkButton } from './styles';
import RankModal from '../RankModal';
import { useState } from 'react';

export default function ExtraWard({ dapp }: any) {
  const [showModal, setShowModal] = useState(false);
  return (
    <StyledExtraReward>
      <StyledExtraRewardContent>
        <StyledCoin />
        <StyledTitle>
          Volume-based competition: <span className="bold">10K DapDap PTS</span> will be shared between top traders
          <StyledLinkButton
            className="link"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Rank &gt;
          </StyledLinkButton>
        </StyledTitle>
      </StyledExtraRewardContent>
      <RankModal
        dapp={dapp}
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />
    </StyledExtraReward>
  );
}
