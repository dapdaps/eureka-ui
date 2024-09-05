import { useRouter } from 'next/router';

import popupsData from '@/config/all-in-one/chains';
import useAuthCheck from '@/hooks/useAuthCheck';
import useAddChain from '@/hooks/useAddChain';

export function useChainSelect(props: Props) {
  const {
    onRouterBefore = () => {
    },
    onCheckAfter = () => {
    },
  } = props;

  const router = useRouter();
  const { check } = useAuthCheck({ isNeedAk: false });
  const { add: addChain } = useAddChain();

  const addNetwork = async (chainId: number) => {
    const addRes = await addChain({
      chainId,
    });
    if (!addRes.success) {
      return false
    }
    return true
  };

  const handleClick = (path: string) => {
    check(async () => {
      onCheckAfter();
      const currChain = popupsData[path];
      const result = await addNetwork(currChain.chainId);
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
