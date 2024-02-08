import { useCallback, useEffect, useState, useMemo } from 'react';
import { get } from '@/utils/http';
import { sortTokens } from '../utils/sortTokens';
import { getTokenAddress } from '../utils';

import { useAddLiquidityStore } from '@/stores/addLiquidity';

export default function useFeeFrequency({ token0, token1 }: any) {
  const [frequency, setFrequency] = useState<any>({});
  const liquidityStore: any = useAddLiquidityStore();

  const [token0Address, token1Address] = useMemo(() => {
    if (!token0 || !token1) return ['', ''];
    const [_token0, _token1] = sortTokens(token0, token1);
    const _token0Address = getTokenAddress(_token0.address, true);
    const _token1Address = getTokenAddress(_token1.address, true);
    return [_token0Address, _token1Address];
  }, [token0, token1]);

  const getFeeFrequency = useCallback(async () => {
    if (!token0Address || !token1Address) return;
    try {
      const result = await get(
        `https://api.dapdap.tech/api/uniswap/mint?token0=${token0Address.toLowerCase()}&token1=${token1Address.toLowerCase()}`,
      );
      setFrequency(result?.data || {});

      let max = [0, 0];
      Object.entries(result.data).forEach(([key, value]) => {
        if (Number(value) > max[1]) {
          max = [Number(key), Number(value)];
        }
      });
      liquidityStore.setFee(max[0]);
    } catch (err) {}
  }, [token0Address, token1Address]);

  useEffect(() => {
    getFeeFrequency();
  }, [token0Address, token1Address]);

  return frequency;
}
