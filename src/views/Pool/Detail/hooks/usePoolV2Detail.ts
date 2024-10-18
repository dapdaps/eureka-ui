import Big from 'big.js';
import { useCallback, useEffect, useState } from 'react';

import multicallAddresses from '@/config/contract/multicall';
import useAccount from '@/hooks/useAccount';
import { multicall } from '@/utils/multicall';

import poolV2 from '../../abi/poolV2';
import { getTokenAmountsV2 } from '../helpers';

export default function usePoolV2Detail(chainId: number, address?: string) {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<any>();
  const { provider, account } = useAccount();

  const queryDetail = useCallback(async () => {
    if (!address || !chainId || !account) return;
    setLoading(true);

    try {
      const calls = [
        {
          address,
          name: 'token0'
        },
        {
          address,
          name: 'token1'
        },
        {
          address,
          name: 'balanceOf',
          params: [account]
        },
        {
          address,
          name: 'totalSupply'
        },
        {
          address,
          name: 'getReserves'
        }
      ];
      const multicallAddress = multicallAddresses[chainId];

      const result = await multicall({
        abi: poolV2,
        options: {},
        calls,
        multicallAddress,
        provider
      });
      const liquidity = result[2] ? result[2][0] : 0;
      const { amount0, amount1 } = getTokenAmountsV2({
        liquidity,
        totalSupply: result[3],
        reserve0: result[4][0],
        reserve1: result[4][1]
      });

      setDetail({
        token0: result[0][0],
        token1: result[1][0],
        amount0,
        amount1,
        chainId,
        liquidity,
        reserve0: result[4][0],
        reserve1: result[4][1],
        share: Big(liquidity).div(result[3]).mul(100).toFixed(18)
      });
      setLoading(false);
    } catch (err) {
      console.log('err', err);
      setLoading(false);
      setDetail(null);
    }
  }, [address, chainId, account]);

  useEffect(() => {
    queryDetail();
  }, [address, account]);

  return { detail, loading, queryDetail };
}
