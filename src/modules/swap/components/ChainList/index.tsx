import React, { useState } from 'react';

import { ArrowWrapper, Overlay, SelectChainWrapper, StyledContainer } from './styles';

export default function ChainList({ currentChain, chains, onSwitchChain }: any) {
  const [showList, setShowList] = useState(false);
  return (
    <StyledContainer>
      <ArrowWrapper
        onClick={() => {
          if (!chains || chains.length === 0) return;
          setShowList(!showList);
        }}
      >
        <div className="chain-name">{currentChain.name}</div>
        {chains?.length > 0 && (
          <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5.5 5.5L10 1" stroke="currentColor" stroke-width="2" />
          </svg>
        )}
      </ArrowWrapper>
      {showList && (
        <SelectChainWrapper>
          {chains.map((chain: any) => {
            const { name, chain_id } = chain;

            const active = chain_id === currentChain.chain_id;

            return (
              <div
                key={name + chain_id}
                className={` ${active ? 'active' : ''}`}
                onClick={() => {
                  onSwitchChain?.({ chainId: `0x${chain.chain_id.toString(16)}` });
                  setShowList(false);
                }}
              >
                <div className="chain-filed">
                  <img className="chain-icon" src={chain.logo} />

                  <div className="chain-name">{name}</div>
                </div>

                <div className={` ${active ? 'active-check-icon' : 'check-icon'}`}>
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L6 10L15 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </div>
              </div>
            );
          })}
        </SelectChainWrapper>
      )}
      {showList && (
        <Overlay
          onClick={() => {
            setShowList(false);
          }}
        />
      )}
    </StyledContainer>
  );
}
