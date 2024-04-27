import { memo, useState } from 'react';
import Modal from '@/components/Modal';
import Loading from '@/components/Icons/Loading';
import Tokens from '../Detail/components/Tokens';
import Amount from './components/Amount';
import Token from './components/Token';
import Button from '../components/Button';
import ConnectWalletButton from '@/views/Pool/components/ConnectWalletButton';
import SwitchNetworkButton from '@/views/Pool/components/SwitchNetworkButton';
import useRemove from './hooks/useRemove';
import useDappConfig from '../hooks/useDappConfig';
import useAccount from '@/hooks/useAccount';
import { StyledContent } from './styles';

const Remove = ({ amount0, amount1, feeAmount0, feeAmount1, open, onClose, onSuccess, detail }: any) => {
  const { token0, token1 } = detail;
  const [percent, setPercent] = useState(0);
  const { loading, onRemove } = useRemove({ detail, percent, onSuccess });
  const { account, chainId } = useAccount();
  const { contracts, defaultChain } = useDappConfig();

  return (
    <Modal
      display={open}
      title="Remove Liquidity"
      width={462}
      onClose={onClose}
      content={
        <StyledContent>
          <Tokens {...detail} />
          <Amount percent={percent} setPercent={setPercent} />
          <Token
            amount0={amount0}
            amount1={amount1}
            feeAmount0={feeAmount0}
            feeAmount1={feeAmount1}
            token0={token0}
            token1={token1}
            percent={percent}
          />
          {!account ? (
            <ConnectWalletButton style={{ width: '100%', height: 62, marginTop: 20 }} />
          ) : chainId && !contracts[chainId] ? (
            <SwitchNetworkButton style={{ width: '100%', height: 62, marginTop: 20 }} chain={defaultChain} />
          ) : (
            <Button
              style={{ width: '100%', height: 62, marginTop: 20 }}
              onClick={() => {
                onRemove();
              }}
            >
              {loading ? <Loading size={20} /> : 'Remove'}
            </Button>
          )}
        </StyledContent>
      }
    />
  );
};

export default memo(Remove);
