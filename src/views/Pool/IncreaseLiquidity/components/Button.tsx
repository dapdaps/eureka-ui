import Loading from '@/components/Icons/Loading';
import Button from '../../components/Button';
import ConnectWalletButton from '@/views/Pool/components/ConnectWalletButton';
import SwitchNetworkButton from '@/views/Pool/components/SwitchNetworkButton';
import useAccount from '@/hooks/useAccount';
import useApprove from '@/hooks/useApprove';
import useDappConfig from '../../hooks/useDappConfig';
import { StyledButtons } from './styles';

const style = { width: '100%', height: 62, marginTop: 20 };

const ActionButton = ({ onClick, text, value0, value1, token0, token1, spender }: any) => {
  const {
    approve: handleToken0Approve,
    approved: value0Approved,
    approving: value0Approving,
  } = useApprove({
    amount: value0,
    token: token0,
    spender,
  });

  const {
    approve: handleToken1Approve,
    approved: value1Approved,
    approving: value1Approving,
  } = useApprove({
    amount: value1,
    token: token1,
    spender,
  });
  if (!value0Approved && !value1Approved) {
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

  if (!value0Approved) {
    return (
      <Button style={style} onClick={handleToken0Approve} disabled={value0Approving}>
        {value0Approving ? <Loading size={20} /> : `Approve ${token0.symbol}`}
      </Button>
    );
  }

  if (!value1Approved) {
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
  const { contracts, defaultChain } = useDappConfig();
  if (!account || !chainId) {
    return <ConnectWalletButton style={style} />;
  }

  if (!contracts[chainId]) {
    return <SwitchNetworkButton style={style} chain={defaultChain} />;
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

  return <ActionButton {...rest} spender={contracts[chainId].PositionManager} />;
};

export default AddButton;
