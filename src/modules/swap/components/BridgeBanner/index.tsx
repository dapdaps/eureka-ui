import { useMemo } from 'react';

import ArrowIcon from '@/components/Icons/ArrowIcon';
import { bridge } from '@/config/theme/dapp';

import { StyledContainer } from './styles';

export default function BridgeBanner({ currentChain, isChainSupported }: any) {
  const theme = useMemo(() => bridge[currentChain.chain_id], [currentChain]);

  return (
    <StyledContainer
      style={{ ...theme }}
      onClick={() => {
        if (!isChainSupported) return;
        window.open('/super-bridge', '_blank');
      }}
    >
      <div className="bridge-text">
        <img className="icon" src={currentChain.logo} />

        <div className="text-wrapper">
          <div className="text-l">{currentChain.name} Chain token bridge</div>
          <div className="text-m">{`Deposit tokens to the ${currentChain.name} network`}</div>
        </div>
      </div>
      <ArrowIcon />
    </StyledContainer>
  );
}
