import { useState } from 'react';
import useAccount from '@/hooks/useAccount';
import { multicallv3 } from '@/utils/multicall';
import erc20Abi from '@/config/abi/erc20';
import config from '@/config/uniswap';

export default function useImportToken() {
  const [token, setToken] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { provider } = useAccount();

  const getImportToken = async (address: string) => {
    try {
      setLoading(true);
      const result = await multicallv3({
        abi: erc20Abi,
        calls: [
          {
            address,
            name: 'symbol',
          },
          {
            address,
            name: 'name',
          },
          {
            address,
            name: 'decimals',
          },
        ],
        multiAddress: config.contracts.multiAddress,
        provider,
      });
      setToken({
        symbol: result[0][0],
        name: result[1][0],
        decimals: result[2][0],
        address,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return {
    token,
    loading,
    getImportToken,
  };
}
