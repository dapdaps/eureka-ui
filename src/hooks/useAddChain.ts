import { useEffect, useRef, useState } from 'react';

import chainCofig from '@/config/chains';
import type { Chain } from '@/types';

import useAccount from './useAccount';
import useConnectWallet from './useConnectWallet';

// flatten chainId to decimal number
const normalizeChainId = (chainId: string | number): number | null => {
  if (!chainId) return null;
  console.log(typeof chainId === 'string', chainId);

  if (typeof chainId === 'string') {
    return parseInt(chainId, chainId.startsWith('0x') ? 16 : 10);
  }
  return chainId;
};

export default function useAddChain() {
  const { account } = useAccount();
  const { onConnect } = useConnectWallet();
  const [pending, setPending] = useState(false);
  const accountRef = useRef(account);

  useEffect(() => {
    accountRef.current = account;
  }, [account]);

  const addChain = async (params: AddChainParams) => {
    const result: Result = { success: true, error: null };
    const { chainId, currChain } = params;
    const normalizedChainId = normalizeChainId(chainId);

    if (!currChain || !normalizedChainId) {
      result.success = false;
      return result;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${normalizedChainId.toString(16)}`,
            rpcUrls: currChain.rpcUrls,
            chainName: currChain.chainName,
            nativeCurrency: currChain.nativeCurrency,
            blockExplorerUrls: [currChain.blockExplorers]
          }
        ]
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
    const normalizedChainId = normalizeChainId(chainId);

    if (!normalizedChainId) {
      result.success = false;
      result.error = 'Invalid chainId';
      return result;
    }

    const currChain = chainCofig[normalizedChainId];

    if (typeof window.ethereum === 'undefined' || !currChain) {
      result.success = false;
      return result;
    }

    setPending(true);
    console.log(accountRef.current, '<=setPending==accountRef.current');

    if (!accountRef.current) {
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
        params: [{ chainId: `0x${Number(normalizedChainId).toString(16)}` }]
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
