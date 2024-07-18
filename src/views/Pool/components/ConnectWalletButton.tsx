import Button from './Button';
import useConnectWallet from '@/hooks/useConnectWallet';

export default function ConnectWalletButton({ style }: any) {
  const { onConnect } = useConnectWallet();
  return (
    <Button
      style={style}
      onClick={() => {
        onConnect();
      }}
    >
      Connect wallet
    </Button>
  );
}
