import Button from '../polygon-btn';
import useSwitchChain from '@/hooks/useSwitchChain';

export default function SwitchNetworkButton({ chain, ...rest }: any) {
  const { switching, switchChain } = useSwitchChain();

  return (
    <Button
      {...rest}
      onClick={() => {
        switchChain({
          chainId: chain.chain_id,
        });
      }}
    >
      {switching ? 'Switch Network...' : `Switch Network to ${chain.name}`}
    </Button>
  );
}
