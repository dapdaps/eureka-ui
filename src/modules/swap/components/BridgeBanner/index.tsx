import { useMemo } from 'react';

import ArrowIcon from '@/components/Icons/ArrowIcon';
import { bridge } from '@/config/theme/dapp';

import { StyledContainer } from './styles';

export default function BridgeBanner({ currentChain, chains, isChainSupported, localConfig }: any) {
  const chain = useMemo(() => {
    if (isChainSupported) return currentChain;
    const defaultChainId = Object.keys(localConfig.networks)[0];
    return chains.find((_chain: any) => Number(_chain.chain_id) === Number(defaultChainId));
  }, [chains, isChainSupported, currentChain]);

  const theme = useMemo(() => bridge[chain.chain_id], [chain]);

  return (
    <StyledContainer
      style={{ ...theme }}
      onClick={() => {
        if (!isChainSupported) return;
        window.open('/super-bridge', '_blank');
      }}
    >
      <div className="bridge-text">
        <img className="icon" src={chain.logo} />

        <div className="text-wrapper">
          <div className="text-l">{chain.name} Chain token bridge</div>
          <div className="text-m">{`Deposit tokens to the ${chain.name} network`}</div>
        </div>
      </div>
      <ArrowIcon />
    </StyledContainer>
  );
}
