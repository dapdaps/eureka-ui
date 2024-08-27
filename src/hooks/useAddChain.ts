import { useState } from 'react';

import chainCofig from '@/config/chains';
import type { Chain } from '@/types';

import useAccount from './useAccount';
import useConnectWallet from './useConnectWallet';

export default function useAddChain() {
  const { account } = useAccount();
  const { onConnect } = useConnectWallet();
  const [pending, setPending] = useState(false);

  const addChain = async (params: AddChainParams) => {
    const result: Result = { success: true, error: null };
    const { chainId, currChain } = params;

    if (!currChain) {
      result.success = false;
      return result;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: `0x${chainId.toString(16)}`,
          rpcUrls: currChain.rpcUrls,
          chainName: currChain.chainName,
          nativeCurrency: currChain.nativeCurrency,
          blockExplorerUrls: [currChain.blockExplorers],
        }],
      });
      return result;
    } catch (err) {
      result.success = false;
      result.error = err;
      return result;
    }
  };

  const add = async (params: Params): Promise<Result> => {
    const result: Result = { success: true, error: null };
    const { chainId } = params;
    const currChain = chainCofig[chainId];

    if (typeof window.ethereum === 'undefined' || !currChain) {
      result.success = false;
      return result;
    }

    setPending(true);
    if (!account) {
      const result = await onConnect();
      if (!result?.length) {
        setPending(false);
        result.success = false;
        return result;
      }
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${Number(chainId).toString(16)}` }],
      });
    } catch (error: any) {
      // un-add
      if (error.code === 4902) {
        const addRes = await addChain({ ...params, currChain });
        setPending(false);
        return addRes;
      }
      // switch failure
      setPending(false);
      result.success = false;
      result.error = error;
      return result;
    }
    setPending(false);
    return result;
  };

  return { pending, add };
}

interface Params {
  chainId: number;
}

interface AddChainParams extends Params {
  currChain?: Chain;
}

interface Result {
  success: boolean;
  error: any;
}
