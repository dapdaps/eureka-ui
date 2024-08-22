import Loading from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';
import useApprove from '@/hooks/useApprove';
import ConnectWalletButton from '@/views/Pool/components/ConnectWalletButton';
import SwitchNetworkButton from '@/views/Pool/components/SwitchNetworkButton';

import Button from '../../components/Button';
import useDappConfig from '../../hooks/useDappConfig';
import { StyledButtons } from './styles';

const style = { width: '100%', height: 62, marginTop: 20 };

const ActionButton = ({ onClick, text, value0, value1, token0, token1, spender }: any) => {
  const {
    approve: handleToken0Approve,
    approved: value0Approved,
    approving: value0Approving,
    checking: value0Checking,
  } = useApprove({
    amount: value0,
    token: token0,
    spender,
  });

  const {
    approve: handleToken1Approve,
    approved: value1Approved,
    approving: value1Approving,
    checking: value1Checking,
  } = useApprove({
    amount: value1,
    token: token1,
    spender,
  });

  if (value0Checking || value1Checking) {
    return (
      <Button style={style} disabled>
        <Loading size={20} />
      </Button>
    );
  }

  if (!value0Approved && value0 && !value1Approved && value1) {
    return (
      <StyledButtons>
        <Button style={style} onClick={handleToken0Approve} disabled={value0Approving}>
          {value0Approving ? <Loading size={20} /> : `Approve ${token0.symbol}`}
        </Button>
        <Button style={style} onClick={handleToken1Approve} disabled={value1Approving}>
          {value1Approving ? <Loading size={20} /> : `Approve ${token1.symbol}`}
        </Button>
      </StyledButtons>
    );
  }

  if (!value0Approved && value0) {
    return (
      <Button style={style} onClick={handleToken0Approve} disabled={value0Approving}>
        {value0Approving ? <Loading size={20} /> : `Approve ${token0.symbol}`}
      </Button>
    );
  }

  if (!value1Approved && value1) {
    return (
      <Button style={style} onClick={handleToken1Approve} disabled={value1Approving}>
        {value1Approving ? <Loading size={20} /> : `Approve ${token1.symbol}`}
      </Button>
    );
  }

  return (
    <Button style={style} onClick={onClick}>
      {text}
    </Button>
  );
};

const AddButton = ({ errorTips, loading, ...rest }: any) => {
  const { account, chainId } = useAccount();
  const { currentChain } = useDappConfig();
  if (!account || !chainId) {
    return <ConnectWalletButton style={style} />;
  }

  if (chainId !== currentChain.chain_id) {
    return <SwitchNetworkButton style={style} chain={currentChain} />;
  }

  if (!rest.token0 || !rest.token1) {
    return (
      <Button style={style} disabled>
        Select Token
      </Button>
    );
  }

  if (errorTips) {
    return (
      <Button style={style} disabled>
        {errorTips}
      </Button>
    );
  }

  if (loading) {
    return (
      <Button style={style} disabled>
        <Loading size={20} />
      </Button>
    );
  }

  return <ActionButton {...rest} />;
};

export const CreateButton = ({ text, loading, onClick }: any) => {
  const { account, chainId } = useAccount();
  const { currentChain } = useDappConfig();
  if (!account || !chainId) {
    return <ConnectWalletButton style={style} />;
  }

  if (chainId !== currentChain.chain_id) {
    return <SwitchNetworkButton style={style} chain={currentChain} />;
  }
  if (loading) {
    return (
      <Button style={style} disabled>
        <Loading size={20} />
      </Button>
    );
  }

  return (
    <Button style={style} onClick={onClick}>
      {text || 'Create Pair'}
    </Button>
  );
};

export default AddButton;
