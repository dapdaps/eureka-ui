import { useRouter } from 'next/router';

import popupsData from '@/config/all-in-one/chains';
import useAuthCheck from '@/hooks/useAuthCheck';
import useSwitchChain from '@/hooks/useSwitchChain';

export function useChainSelect(props: Props) {
  const { onRouterBefore = () => {}, onCheckAfter = () => {} } = props;

  const { switching, switchChain } = useSwitchChain();
  const router = useRouter();
  const { check } = useAuthCheck({ isNeedAk: false });

  const handleClick = (path: string) => {
    if (switching) return;
    check(async () => {
      onCheckAfter();
      const currChain = popupsData[path];
      await switchChain({ chainId: `0x${currChain.chainId.toString(16)}` });
      onRouterBefore();
      router.push(`/all-in-one/${currChain.path}`);
    });
  };

  return { handleClick };
}

interface Props {
  onRouterBefore?(): void;

  onCheckAfter?(): void;
}
