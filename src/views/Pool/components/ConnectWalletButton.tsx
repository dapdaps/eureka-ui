import useConnectWallet from '@/hooks/useConnectWallet';

import Button from './Button';

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
