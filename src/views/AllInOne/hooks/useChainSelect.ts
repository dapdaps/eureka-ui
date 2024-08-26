import { useSetChain } from '@web3-onboard/react';
import { useRouter } from 'next/router';

import popupsData from '@/config/all-in-one/chains';
import useAuthCheck from '@/hooks/useAuthCheck';

export function useChainSelect(props: Props) {
  const {
    onRouterBefore = () => {
    },
    onCheckAfter = () => {
    },
  } = props;

  const router = useRouter();
  const { check } = useAuthCheck({ isNeedAk: false });
  const [{}, setChain] = useSetChain();

  const handleClick = (path: string) => {
    check(async () => {
      onCheckAfter();
      const currChain = popupsData[path];
      const result = await setChain({ chainId: `0x${currChain.chainId.toString(16)}` });
      if (result) {
        onRouterBefore();
        router.push(`/all-in-one/${currChain.path}`);
      }
    });
  };

  return { handleClick };
}

interface Props {
  onRouterBefore?(): void;

  onCheckAfter?(): void;
}
