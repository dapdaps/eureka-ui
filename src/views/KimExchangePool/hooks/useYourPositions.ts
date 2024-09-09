import { Contract } from 'ethers';
import { useCallback, useEffect, useRef, useState } from 'react';

import multicallAddresses from '@/config/contract/multicall';
import useAccount from '@/hooks/useAccount';
import { multicall } from '@/utils/multicall';
import useDappConfig from '@/views/Pool/hooks/useDappConfig';

import positionAbi from '../abi/positions';
import { getPairByTokens, revertTokenAddress } from '../token';

export default function useYourPositions() {
  const { provider, chainId, account } = useAccount();
  const { contracts, pairs, tokens } = useDappConfig();

  const [pools, setPools] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const timer = useRef<any>();

  const queryList = useCallback(async () => {
    if (!chainId) return;
    setLoading(true);
    setPools([]);
    try {
      const { PositionManager } = contracts[chainId];
      const PositionContract = new Contract(PositionManager, positionAbi, provider);

      const balance = (await PositionContract.balanceOf(account)).toNumber();

      if (!balance) {
        setLoading(false);
        return;
      }

      const tokenIdCalls = [...Array(balance).keys()].map((i) => ({
        address: PositionManager,
        name: 'tokenOfOwnerByIndex',
        params: [account, i]
      }));

      const multicallAddress = multicallAddresses[chainId];

      const tokenIds = await multicall({
        abi: positionAbi,
        calls: tokenIdCalls,
        options: {},
        multicallAddress,
        provider
      });

      const positionsCalls = tokenIds.map((tokenId: any) => ({
        address: PositionManager,
        name: 'positions',
        params: [tokenId.toString()]
      }));

      const positions = await multicall({
        abi: positionAbi,
        calls: positionsCalls,
        options: {},
        multicallAddress,
        provider
      });

      const _tokens = tokens[chainId];

      const _pools: any = [];
      positions.forEach((position: any, i: number) => {
        const _token0 = revertTokenAddress(position.token0, chainId);
        const _token1 = revertTokenAddress(position.token1, chainId);
        const pair = getPairByTokens({
          token0: position.token0.toLowerCase(),
          token1: position.token1.toLowerCase(),
          pairs: Object.values(pairs),
          chainId
        });
        if (!pair) return;
        const item = {
          tokenId: tokenIds[i].toString(),
          liquidity: position.liquidity,
          tickLower: position.tickLower,
          tickUpper: position.tickUpper,
          token0: _tokens[_token0],
          token1: _tokens[_token1],
          address: pair.address,
          tickSpacing: pair.tickSpacing
        };
        if (position.liquidity.gt(0)) {
          _pools.unshift(item);
        } else {
          _pools.push(item);
        }
      });

      setPools(_pools);

      setLoading(false);
    } catch (err) {
      console.log('Query Your Positions failure: %o', err);
      setLoading(false);
    }
  }, [provider, account, chainId, contracts, pairs, tokens]);

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (!account || !chainId || !contracts || !contracts[chainId] || !pairs || !tokens) {
        setPools([]);
        setLoading(false);
        return;
      }
      if (provider) queryList();
    }, 500);
  }, [provider, account, chainId, contracts, pairs, tokens]);

  return { pools, loading };
}
