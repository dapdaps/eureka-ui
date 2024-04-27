import Button from './Button';
import useSwitchChain from '@/hooks/useSwitchChain';

export default function SwitchNetworkButton({ style, chain }: any) {
  const { switching, switchChain } = useSwitchChain();

  return (
    <Button
      style={style}
      onClick={() => {
        switchChain({
          chainId: chain.chain_id,
        });
      }}
    >
      {switching ? 'Switch Network...' : `Switch Network to ${chain.chainName}`}
    </Button>
  );
}
