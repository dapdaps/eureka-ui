import { memo, useEffect, useState } from 'react';

import Modal from '@/components/Modal';

import Chains from './Chains';
import { StyledContainer } from './styles';
import Tokens from './Tokens';

const SelectTokens = ({ display, networks, tokens, tokenId, onClose, onSelectToken }: any) => {
  const [selectedNetwork, setSelectNetwork] = useState(tokens[tokenId]?.network || {});

  useEffect(() => {
    setSelectNetwork(tokens[tokenId]?.network || {});
  }, [tokenId]);
  return (
    <Modal
      display={display}
      width={392}
      showHeader={false}
      onClose={onClose}
      content={
        <StyledContainer>
          <Chains
            networks={networks}
            selected={selectedNetwork}
            onSelect={(network: any) => {
              setSelectNetwork(network);
            }}
          />
          <Tokens tokens={tokens} selectedNetwork={selectedNetwork} onClose={onClose} onSelectToken={onSelectToken} />
        </StyledContainer>
      }
    />
  );
};

export default memo(SelectTokens);
