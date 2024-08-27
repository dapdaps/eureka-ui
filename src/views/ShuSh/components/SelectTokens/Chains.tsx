import { memo } from 'react';
import styled from 'styled-components';

import { StyledTitle } from './styles';

const StyledContainer = styled.div`
  width: 72px;
  padding-top: 20px;
  box-sizing: border-box;
  overflow: auto;
  border-right: 1px solid #373a53;
`;

const StyledChainWrapper = styled.div<{ $active: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  border: 1px solid ${({ $active }) => ($active ? '#FCC42C' : '#373A53')};
  background: ${({ $active }) => ($active ? 'rgba(252, 196, 44, 0.10)' : 'rgba(55, 58, 83, 0.10)')};
  padding: 8px;
  box-sizing: border-box;
  margin-top: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    border-color: rgba(252, 196, 44, 0.6);
  }

  &:active {
    border-color: rgba(252, 196, 44, 0.8);
  }
`;

const StyledChainIcon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 8px;
`;

const StyledChainList = styled.div`
  max-height: calc(50vh + 60px);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0px 8px 20px 12px;
`;

const Chains = ({ networks, selected, onSelect }: any) => {
  return (
    <StyledContainer>
      <StyledTitle style={{ textAlign: 'center' }}>Chain</StyledTitle>
      <StyledChainList>
        {networks?.map((network: any) => (
          <StyledChainWrapper
            onClick={() => {
              onSelect(network);
            }}
            key={network.name}
            $active={network.name === selected?.name}
          >
            <StyledChainIcon src={network.icon} />
          </StyledChainWrapper>
        ))}
      </StyledChainList>
    </StyledContainer>
  );
};

export default memo(Chains);
