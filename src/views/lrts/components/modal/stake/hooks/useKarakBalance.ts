import { ethers } from 'ethers';
import Big from 'big.js';
import useAccount from '@/hooks/useAccount';
import { useCallback, useEffect, useState } from 'react';

const contracts: Record<number, any> = {
  1: {
    VaultSupervisor: '0x54e44DbB92dBA848ACe27F44c0CB4268981eF1CC',
  },
};

export default function useKarakBalance(chainId?: number) {
  const [balances, setBalances] = useState<any>({});
  const { account, provider } = useAccount();

  const queryBalances = useCallback(async () => {
    if (!chainId || !account || !contracts[chainId]) {
      setBalances({});
      return;
    }
    const Contract = new ethers.Contract(
      contracts[chainId].VaultSupervisor,
      [
        {
          inputs: [{ internalType: 'address', name: 'staker', type: 'address' }],
          name: 'getDeposits',
          outputs: [
            { internalType: 'contract IVault[]', name: 'vaults', type: 'address[]' },
            { internalType: 'contract IERC20[]', name: 'tokens', type: 'address[]' },
            { internalType: 'uint256[]', name: 'assets', type: 'uint256[]' },
            { internalType: 'uint256[]', name: 'shares', type: 'uint256[]' },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      provider?.getSigner(),
    );
    const result = await Contract.getDeposits(account);
    const vaults = result.vaults;
    const shares = result.shares;

    const _b: any = {};

    vaults.forEach((vault: string, i: number) => {
      _b[vault.toLowerCase()] = Big(shares[i] || 0)
        .div(1e18)
        .toString();
    });
    setBalances(_b);
  }, [chainId, account]);

  useEffect(() => {
    queryBalances();
  }, [account]);

  return { balances, queryBalances };
}
