import { useState } from 'react';

import RankModal from '../RankModal';
import { StyledCoin, StyledExtraReward, StyledExtraRewardContent, StyledLinkButton,StyledTitle } from './styles';

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
