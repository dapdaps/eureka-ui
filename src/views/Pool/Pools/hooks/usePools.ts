import { useCallback, useEffect, useState, useRef } from 'react';
import { Contract } from 'ethers';
import multicallAddresses from '@/config/contract/multicall';
import { multicall } from '@/utils/multicall';
import useAccount from '@/hooks/useAccount';
import useDappConfig from '../../hooks/useDappConfig';
import positionAbi from '../../abi/position';

export default function usePools() {
  const { provider, chainId, account } = useAccount();
  const { contracts } = useDappConfig();

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
        params: [account, i],
      }));

      const multicallAddress = multicallAddresses[chainId];

      const tokenIds = await multicall({
        abi: positionAbi,
        calls: tokenIdCalls,
        options: {},
        multicallAddress,
        provider,
      });

      const positionsCalls = tokenIds.map((tokenId: any) => ({
        address: PositionManager,
        name: 'positions',
        params: [tokenId.toString()],
      }));

      const positions = await multicall({
        abi: positionAbi,
        calls: positionsCalls,
        options: {},
        multicallAddress,
        provider,
      });

      const pools = positions.map((position: any, i: number) => {
        return {
          tokenId: tokenIds[i].toString(),
          fee: position.fee,
          liquidity: position.liquidity,
          tickLower: position.tickLower,
          tickUpper: position.tickUpper,
          token0: position.token0,
          token1: position.token1,
          chainId,
        };
      });

      setPools(pools);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [provider, account, chainId]);

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (!account || !chainId || !contracts || !contracts[chainId]) {
        setPools([]);
        setLoading(false);
        return;
      }
      if (provider) queryList();
    }, 500);
  }, [provider, account, chainId, contracts]);

  return { pools, loading };
}
