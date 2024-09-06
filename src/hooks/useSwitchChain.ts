import { useState } from 'react';
import useAddChain from '@/hooks/useAddChain';
import useToast from '@/hooks/useToast';

import useAccount from './useAccount';
import useConnectWallet from './useConnectWallet';

export default function useSwitchChain() {
  const { account } = useAccount();
  const { onConnect } = useConnectWallet();
  const [switching, setSwitching] = useState(false);
  const { add: addChain } = useAddChain();
  const toast = useToast();

  const switchChain = async (params: any, cb?: any) => {
    setSwitching(true);
    if (!account) {
      const result = await onConnect();
      if (!result?.length) {
        setSwitching(false);
        return;
      }
    }
    try {
      await addNetwork(params.chainId);
    } catch (error) {
      console.log(error, 'addNetwork-error');
    } finally {
      setSwitching(false);
      cb?.();
    }
  };

  const addNetwork = async (chainId: number) => {
    try {
      const addRes = await addChain({
        chainId,
      });

      if (!addRes.success) {
        toast.fail('Failed to add network!');
        return;
      }
      toast.success({
        title: 'Add successfully!',
      });
    } catch (error) {
      console.log(error, '<=====addChain');
    }
  };

  return { switching, switchChain };
}
