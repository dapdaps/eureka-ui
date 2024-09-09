import { Contract, providers, utils } from 'ethers';
import { useEffect, useState } from 'react';

import chains from '@/config/chains';
import useAccount from '@/hooks/useAccount';
import { useUpdateBalanceStore } from '@/views/SuperSwap/hooks/useUpdateBalanceStore';

const TOKEN_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
];

export default function useTokenBalance(address: string | 'native', decimals: number, chainId?: number) {
  // console.info('use-token-bal:', address, decimals);
  const { account, provider: walletProvider, chainId: walletChainId } = useAccount();
  const [tokenBalance, setTokenBalance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fresh, setFresh] = useState(0);
  const { updater } = useUpdateBalanceStore();

  const getBalance = async () => {
    if (!account || !address) return;

    setIsLoading(true);
    try {
      const _provider =
        chainId && chains[chainId] ? new providers.JsonRpcProvider(chains[chainId].rpcUrls[0]) : walletProvider;
      if (address === 'native') {
        const rawBalance = await _provider.getBalance(account);
        // console.info('get-native-bal', rawBalance);
        setTokenBalance(utils.formatEther(rawBalance));
      } else {
        const TokenContract = new Contract(address, TOKEN_ABI, _provider);
        const rawBalance = await TokenContract.balanceOf(account);
        console.log('rawBalance: ', rawBalance);
        setTokenBalance(utils.formatUnits(rawBalance, decimals));
      }
    } catch (error) {
      setIsError(true);
      console.info('useTokenBalance_ERROR', error);
    } finally {
      setIsLoading(false);
    }
  };
  const update = () => {
    setFresh((n) => n + 1);
  };
  useEffect(() => {
    getBalance();
  }, [account, address, decimals, fresh, chainId, walletChainId, updater]);

  return { tokenBalance, isError, isLoading, update };
}
