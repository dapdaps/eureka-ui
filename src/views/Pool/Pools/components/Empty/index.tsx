import useAccount from '@/hooks/useAccount';
import EmptyIcon from '../../../components/EmptyIcon';
import useDappConfig from '../../../hooks/useDappConfig';
import ConnectWalletButton from '@/views/Pool/components/ConnectWalletButton';
import SwitchNetworkButton from '@/views/Pool/components/SwitchNetworkButton';
import { StyledContainer, StyledText } from './style';

export default function Empty() {
  const { account, chainId } = useAccount();
  const { currentChain } = useDappConfig();
  return (
    <StyledContainer>
      <EmptyIcon />
      <StyledText>Your active V3 liquidity positions will appear here.</StyledText>

      {!account && <ConnectWalletButton style={{ width: 446, height: 62, fontSize: 18 }} />}
      {currentChain.chain_id !== chainId && (
        <SwitchNetworkButton style={{ width: 446, height: 62, fontSize: 18 }} chain={currentChain} />
      )}
    </StyledContainer>
  );
}
