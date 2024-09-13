import { styled } from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 40px;
  padding: 4px;
  box-sizing: border-box;
  border-radius: 8px;

  &.multi {
    border: 1px solid var(--agg-primary-color, #373a53);
    background: var(--agg-secondary-color, rgba(33, 35, 48, 0.5));
  }
`;

const StyledLabel = styled.div`
  color: var(--agg-thirdry-color, #979abe);
  text-align: right;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  padding: 7px;
  box-sizing: border-box;

  &.multi {
    border-radius: 8px;
    border: 1px solid #373a53;
    background: #32364b;
  }
`;

const StyledChains = styled.div`
  display: flex;
  align-items: center;
`;

const StyledChainBox = styled.div`
  flex-shrink: 0;
  border-radius: 8px;
  padding: 4px 7px;
  box-sizing: border-box;
  cursor: pointer;
  border: 1px solid transparent;
  &.active {
    border: 1px solid #373a53;
    background: #32364b;
  }
  &:hover {
    background: rgba(50, 54, 75, 0.8);
  }
`;

const StyledChainIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const Chain = (props: any) => {
  const { curChain, onSwitchChain, from } = props;

  const chains = props.chains || [];
  const isMulti = chains.length > 1;

  const handleSwitchChain = (chain: any) => {
    if (from === 'layer') {
      onSwitchChain({ chainId: chain.chain_id });
    } else {
      onSwitchChain?.({ chainId: `0x${chain.chain_id.toString(16)}` });
    }
  };

  return (
    <StyledContainer className={isMulti ? 'multi' : ''}>
      <StyledLabel>{isMulti ? 'Chains:' : 'Chain:'}</StyledLabel>
      <StyledChains>
        {chains.map((chain: any) => (
          <StyledChainBox
            key={chain.chain_id}
            className={curChain.chain_id === chain.chain_id ? 'active' : ''}
            onClick={() => {
              handleSwitchChain(chain);
            }}
          >
            <StyledChainIcon src={chain.logo} />
          </StyledChainBox>
        ))}
      </StyledChains>
    </StyledContainer>
  );
};

export default Chain;
