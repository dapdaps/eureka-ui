import { memo } from 'react';

import Loading from '@/components/Icons/Loading';
import Modal from '@/components/Modal';
import useAccount from '@/hooks/useAccount';
import Button from '@/views/Pool/components/Button';
import ConnectWalletButton from '@/views/Pool/components/ConnectWalletButton';
import SwitchNetworkButton from '@/views/Pool/components/SwitchNetworkButton';

import useDappConfig from '../../../hooks/useDappConfig';
import useCollectFee from '../../hooks/useCollectFee';
import AmountPanel from '../AmountPanel';
import { StyledContainer, StyledDesc } from './styles';

const CollectModal = ({ id, open, token0, token1, amount0, amount1, onClose, onSuccess }: any) => {
  const { loading, onCollect } = useCollectFee(id, onSuccess);
  const { account, chainId } = useAccount();
  const { currentChain } = useDappConfig();
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
          ) : chainId !== currentChain.chain_id ? (
            <SwitchNetworkButton style={{ width: '100%', height: 60 }} chain={currentChain} />
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
