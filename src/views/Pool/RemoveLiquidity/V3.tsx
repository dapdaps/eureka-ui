import { memo, useState } from 'react';

import Loading from '@/components/Icons/Loading';
import Modal from '@/components/Modal';
import useAccount from '@/hooks/useAccount';
import ConnectWalletButton from '@/views/Pool/components/ConnectWalletButton';
import SwitchNetworkButton from '@/views/Pool/components/SwitchNetworkButton';

import Button from '../components/Button';
import Tokens from '../Detail/components/Tokens';
import useDappConfig from '../hooks/useDappConfig';
import Amount from './components/Amount';
import Token from './components/Token';
import useRemove from './hooks/useRemove';
import { StyledContent } from './styles';

const Remove = ({ amount0, amount1, feeAmount0, feeAmount1, open, onClose, onSuccess, detail }: any) => {
  const { token0, token1 } = detail;
  const [percent, setPercent] = useState(0);
  const { loading, onRemove } = useRemove({ detail, percent, amount0, amount1, onSuccess });
  const { account, chainId } = useAccount();
  const { currentChain } = useDappConfig();

  return (
    <Modal
      display={open}
      title="Remove Liquidity"
      width={462}
      onClose={onClose}
      content={
        <StyledContent>
          <Tokens {...detail} type="V3" />
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
          ) : chainId !== currentChain.chain_id ? (
            <SwitchNetworkButton style={{ width: '100%', height: 62, marginTop: 20 }} chain={currentChain} />
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
