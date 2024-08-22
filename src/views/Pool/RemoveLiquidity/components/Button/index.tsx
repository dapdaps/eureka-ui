import Loading from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';
import useApprove from '@/hooks/useApprove';
import ConnectWalletButton from '@/views/Pool/components/ConnectWalletButton';
import SwitchNetworkButton from '@/views/Pool/components/SwitchNetworkButton';

import Button from '../../../components/Button';
import useDappConfig from '../../../hooks/useDappConfig';

const style = { width: '100%', height: 62, marginTop: 20 };

const ActionButton = ({ onClick, text, value, token, spender }: any) => {
  const {
    approve: handleTokenApprove,
    approved: valueApproved,
    approving: valueApproving,
    checking: valueChecking,
  } = useApprove({
    amount: value,
    token: token,
    spender,
  });

  if (valueChecking) {
    return (
      <Button style={style} disabled>
        <Loading size={20} />
      </Button>
    );
  }

  if (!valueApproved) {
    return (
      <Button style={style} onClick={handleTokenApprove} disabled={valueApproving}>
        {valueApproving ? <Loading size={20} /> : `Approve ${token.symbol}`}
      </Button>
    );
  }

  return (
    <Button style={style} onClick={onClick}>
      {text}
    </Button>
  );
};

const RemoveButton = (props: any) => {
  const { account, chainId } = useAccount();
  const { currentChain } = useDappConfig();
  const { errorTips, loading } = props;
  if (!account || !chainId) {
    return <ConnectWalletButton style={style} />;
  }

  if (chainId !== currentChain.chain_id) {
    return <SwitchNetworkButton style={style} chain={currentChain} />;
  }

  if (errorTips) {
    return (
      <Button style={style} disabled>
        Select a percent
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
  return <ActionButton {...props} />;
};

export default RemoveButton;
