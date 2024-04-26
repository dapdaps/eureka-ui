import { memo } from 'react';
import Modal from '@/components/Modal';
import Button from '@/views/Pool/components/Button';
import Loading from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';
import useDappConfig from '../../../hooks/useDappConfig';
import ConnectWalletButton from '@/views/Pool/components/ConnectWalletButton';
import SwitchNetworkButton from '@/views/Pool/components/SwitchNetworkButton';
import AmountPanel from '../AmountPanel';
import useCollectFee from '../../hooks/useCollectFee';
import { StyledContainer, StyledDesc } from './styles';

const CollectModal = ({ id, open, token0, token1, amount0, amount1, onClose, onSuccess }: any) => {
  const { loading, onCollect } = useCollectFee(id, onSuccess);
  const { account, chainId } = useAccount();
  const { contracts, defaultChain } = useDappConfig();
  return (
    <Modal
      display={open}
      title="Claim fees"
      width={462}
      onClose={onClose}
      content={
        <StyledContainer>
          <AmountPanel token0={token0} token1={token1} amount0={amount0} amount1={amount1} />
          <StyledDesc>Collecting fees will withdraw currently available fees for you.</StyledDesc>
          {!account ? (
            <ConnectWalletButton style={{ width: '100%', height: 60 }} />
          ) : chainId && !contracts[chainId] ? (
            <SwitchNetworkButton style={{ width: '100%', height: 60 }} chain={defaultChain} />
          ) : (
            <Button onClick={onCollect} style={{ width: '100%', height: 60 }}>
              {loading ? <Loading size={20} /> : 'Collect'}
            </Button>
          )}
        </StyledContainer>
      }
    />
  );
};

export default memo(CollectModal);
