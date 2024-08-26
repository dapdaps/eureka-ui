import useSwitchChain from '@/hooks/useSwitchChain';

import Button from './Button';

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
      {switching ? 'Switch Network...' : `Switch Network to ${chain.name}`}
    </Button>
  );
}
