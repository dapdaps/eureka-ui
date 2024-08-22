import { memo, useState } from 'react';

import CollectModal from '../../components/CollectModal';
import Panel from '../Panel';
import { StyledContainer } from './styles';

const FeesPanel = ({ id, token0, token1, amount0, amount1, onCollectSuccess }: any) => {
  const [showCollectModal, setShowCollectModal] = useState(false);
  return (
    <StyledContainer>
      <Panel
        type={2}
        token0={token0}
        token1={token1}
        amount0={amount0}
        amount1={amount1}
        onCollect={() => {
          setShowCollectModal(true);
        }}
      />
      <CollectModal
        id={id}
        open={showCollectModal}
        token0={token0}
        token1={token1}
        amount0={amount0}
        amount1={amount1}
        onClose={() => {
          setShowCollectModal(false);
        }}
        onSuccess={() => {
          setShowCollectModal(false);
          onCollectSuccess();
        }}
      />
    </StyledContainer>
  );
};

export default memo(FeesPanel);
