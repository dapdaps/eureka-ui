import {
  StyledChainBox,
  StyledChainIcon,
  StyledChains,
  StyledContainer,
  StyledLabel
} from '@/modules/lending/components/Chains/styles';
import type { Chain } from '@/modules/lending/models';

const LendingChains = (props: Props) => {
  const { chains = [], curChain, onSwitchChain, from } = props;

  const isMulti = chains.length > 1;

  const handleSwitchChain = (chain: Chain) => {
    if (from === 'layer') {
      onSwitchChain?.({ chainId: chain.chain_id });
    } else {
      onSwitchChain?.({ chainId: `0x${chain.chain_id.toString(16)}` });
    }
  };

  return (
    <StyledContainer className={isMulti ? 'multi' : ''}>
      <StyledLabel>{isMulti ? 'Chains:' : 'Chain:'}</StyledLabel>
      <StyledChains>
        {chains.map((chain) => (
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

export default LendingChains;

export interface Props {
  chains: Chain[];
  curChain: Chain;
  from?: string;

  onSwitchChain?(params: { chainId: number | string }): void;
}
