import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';

const lp_abi = [
  {
    inputs: [],
    name: 'totalUnderlying',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
];

const wrappedToken_abi = [
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: '_nlpAmount', type: 'uint256' }],
    name: 'getWnlpByNlp',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'nlpPerToken',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
];

const pairingToken_abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'userInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'lockedShares',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];

export default function useTokenDetail(token: any, update?: number) {
  const [loading, setLoading] = useState(false);
  const [totalDeposited, setTotalDeposited] = useState<any>(null);
  const [yourDeposited, setYourDeposited] = useState<any>(null);
  const [nlpPerToken, setNlpPerToken] = useState<any>(null);
  const { account, chainId, provider } = useAccount();

  async function fetchTotalUnderlying() {
    if (!token || !token.lpTokenAddress || !provider) return;
    try {
      const contract = new ethers.Contract(token.lpTokenAddress, lp_abi, provider);
      const totalUnderlying = await contract.totalUnderlying();
      setTotalDeposited(new Big(totalUnderlying.toString()).div(10 ** token.decimals).toFixed(0));
    } catch (error) {
      console.error('Error fetching totalUnderlying:', error);
    } finally {
    }
  }

  async function fetchYourDeposited() {
    if (!token || !provider) return;
    try {
      setLoading(true);
      if (token.wrappedTokenAddress) {
        const contract = new ethers.Contract(token.wrappedTokenAddress, wrappedToken_abi, provider);
        const yourDeposited = await contract.balanceOf(account);
        setYourDeposited(new Big(yourDeposited.toString()).div(10 ** token.decimals).toFixed(0));
      } else if (token.pairingToken && token.pairingToken.length > 0) {
        const contract = new ethers.Contract(token.pairingToken[0].stakerAddress, pairingToken_abi, provider);
        const yourDeposited = await contract.userInfo(account);
        setYourDeposited(new Big(yourDeposited.shares.toString()).div(10 ** token.decimals).toFixed(0));
      }
    } catch (error) {
      console.error('Error fetching yourDeposited:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchNlpPerToken() {
    if (!token || !provider || !token.wrappedTokenAddress) return;
    try {
      const contract = new ethers.Contract(token.wrappedTokenAddress, wrappedToken_abi, provider);
      const nlpPerToken = await contract.nlpPerToken();

      setNlpPerToken(new Big(nlpPerToken.toString()).div(10 ** token.decimals).toFixed(0));
    } catch (error) {
      console.error('Error fetching nlpPerToken:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchGetWnlpByNlp(nlpAmount: string) {
    if (!token || !provider || !token.wrappedTokenAddress) return;
    try {
      const contract = new ethers.Contract(token.wrappedTokenAddress, wrappedToken_abi, provider);
      const getWnlpByNlp = await contract.getWnlpByNlp(nlpAmount);
      return getWnlpByNlp.toString();
    } catch (error) {
      console.error('Error fetching getWnlpByNlp:', error);
    } finally {
    }
  }

  useEffect(() => {
    fetchTotalUnderlying();
    fetchYourDeposited();
  }, [token && token.lpTokenAddress, update]);

  useEffect(() => {
    fetchNlpPerToken();
  }, [token && token.wrappedTokenAddress]);

  return {
    totalDeposited,
    yourDeposited,
    nlpPerToken,
    fetchGetWnlpByNlp,
    loading
  };
}

export function checkTokenType(token) {
  if (token.wrappedTokenAddress) {
    return 'Supply';
  }

  if (token.pairingToken && token.pairingToken.length > 0) {
    return 'Pair';
  }
}
