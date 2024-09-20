import { useEffect, useMemo, useState } from 'react';

import { chains } from '@/config/bridge';
import useAddChain from '@/hooks/useAddChain';
import useToast from '@/hooks/useToast';

import useAccount from './useAccount';
import useConnectWallet from './useConnectWallet';
type ChainParams = string | number | { chainId: string | number };

declare global {
  interface Window {
    ethereum: any;
  }
}


export default function useSwitchChain() {
  const { account } = useAccount();
  const { onConnect } = useConnectWallet();
  const [switching, setSwitching] = useState(false);
  const { add: addChain } = useAddChain();
  const [currentChainId, setCurrentChainId] = useState<number | null>(null);


  
  const toast = useToast();

  const switchChain = async (params: ChainParams, cb?: any) => {
    setSwitching(true);
    if (!account) {
      const result = await onConnect();
      if (!result?.length) {
        setSwitching(false);
        return;
      }
    }
    try {
      const rawChainId = typeof params === 'object' ? params.chainId : params;
      let chainId: number;
  
      if (typeof rawChainId === 'string' && rawChainId.toLowerCase().startsWith('0x')) {
        chainId = parseInt(rawChainId, 16); 
      } else {
        chainId = Number(rawChainId);
      }
  
      if (isNaN(chainId) || chainId <= 0) {
        throw new Error('Invalid chainId');
      }
  
      await addNetwork(chainId);
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
        toast.fail('Failed to switch network!');
        return;
      }
      toast.success({
        title: 'Switch successfully!',
      });
    } catch (error) {
      console.log(error, '<=====addChain');
    }
  };



  useEffect(() => {
    const getCurrentChainId = async () => {
      try {
        const chainId = await window.ethereum?.request({ method: 'eth_chainId' });
        if (chainId) {
          setCurrentChainId(Number(chainId));
        }
      } catch (error) {
        console.error('get ID fail:', error);
      }
    };

    getCurrentChainId();

    const handleChainChanged = (chainId: string) => {
      setCurrentChainId(Number(chainId));
    };

    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  const currentChain = useMemo(
    () => (currentChainId ? chains[currentChainId] : null),
    [currentChainId],
  );


  return { switching, switchChain, currentChain };
}
