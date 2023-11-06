import { useCallback, useEffect, useState } from 'react';
import { BigNumber, Contract } from 'ethers';
import useAccount from '@/hooks/useAccount';
import { multicallv3 } from '@/utils/multicall';
import config from '@/config/uniswap/linea';
import { usePositionsStore } from '@/stores/positions';
import positionAbi from '../abi/positionAbi';

export default function usePositions() {
  const { account, provider } = useAccount();
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState([]);
  const positionsStore = usePositionsStore();
  const getPositions = useCallback(async () => {
    const PositionContract = new Contract(config.contracts.positionAddress, positionAbi, provider);
    try {
      setLoading(true);
      const balanceResult = await PositionContract.balanceOf(account);
      const accountBalance = balanceResult.toNumber();
      if (!accountBalance) return;
      const tokenRequests = [];
      for (let i = 0; i < accountBalance; i++) {
        tokenRequests.push({
          address: config.contracts.positionAddress,
          name: 'tokenOfOwnerByIndex',
          params: [account, i],
        });
      }
      const tokenIdResults = await multicallv3({
        abi: positionAbi,
        calls: tokenRequests,
        multiAddress: config.contracts.multiAddress,
        provider,
      });
      const positionRequests = tokenIdResults.map((tokenId: BigNumber) => ({
        address: config.contracts.positionAddress,
        name: 'positions',
        params: [tokenId.toString()],
      }));
      const results = await multicallv3({
        abi: positionAbi,
        calls: positionRequests,
        multiAddress: config.contracts.multiAddress,
        provider,
      });
      const cachedPositions: { [key: string]: any } = {};
      const _positions = results.map((result: any, i: number) => {
        cachedPositions[tokenIdResults[i].toString()] = result;
        return {
          tokenId: tokenIdResults[i].toString(),
          fee: result.fee,
          feeGrowthInside0LastX128: result.feeGrowthInside0LastX128,
          feeGrowthInside1LastX128: result.feeGrowthInside1LastX128,
          liquidity: result.liquidity,
          nonce: result.nonce,
          operator: result.operator,
          tickLower: result.tickLower,
          tickUpper: result.tickUpper,
          token0: result.token0,
          token1: result.token1,
          tokensOwed0: result.tokensOwed0,
          tokensOwed1: result.tokensOwed1,
        };
      });
      positionsStore.set({ positions: cachedPositions });
      setPositions(_positions);
      setLoading(false);
    } catch (err) {
      console.log('err', err);
      setLoading(false);
    }
  }, [provider, account]);
  useEffect(() => {
    if (provider && account) getPositions();
  }, [provider, account]);
  return { loading, positions };
}
