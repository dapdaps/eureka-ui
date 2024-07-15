import Button from '../polygon-btn';
import useConnectWallet from '@/hooks/useConnectWallet';

export default function ConnectButton({ chain, ...rest }: any) {
  const { onConnect } = useConnectWallet();

  return (
    <Button
      {...rest}
      onClick={() => {
        onConnect();
      }}
    >
      Connect wallet
    </Button>
  );
}
