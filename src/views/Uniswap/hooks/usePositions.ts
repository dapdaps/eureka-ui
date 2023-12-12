import { useCallback, useEffect, useState, useRef } from 'react';
import { Contract } from 'ethers';
import useAccount from '@/hooks/useAccount';
import { multicallv3 } from '@/utils/multicall';
import config from '@/config/uniswap';
import positionAbi from '../abi/positionAbi';

export default function usePositions() {
  const { account, provider, chainId } = useAccount();
  const [loading, setLoading] = useState(!!account);
  const [positions, setPositions] = useState([]);
  const timer = useRef<any>();
  const getPositions = useCallback(async () => {
    const PositionContract = new Contract(config.contracts.positionAddress, positionAbi, provider);
    try {
      setLoading(true);
      const balanceResult = await PositionContract.balanceOf(account);
      const accountBalance = balanceResult.toNumber();
      if (!accountBalance) {
        setLoading(false);
        return;
      }
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
      const positionRequests = tokenIdResults.map((tokenId: any) => ({
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
        const _position = {
          tokenId: tokenIdResults[i].toString(),
          fee: result.fee,
          feeGrowthInside0LastX128: result.feeGrowthInside0LastX128,
          feeGrowthInside1LastX128: result.feeGrowthInside1LastX128,
          liquidity: result.liquidity.toString(),
          nonce: result.nonce,
          operator: result.operator,
          tickLower: result.tickLower,
          tickUpper: result.tickUpper,
          token0: result.token0,
          token1: result.token1,
          tokensOwed0: result.tokensOwed0,
          tokensOwed1: result.tokensOwed1,
        };
        cachedPositions[tokenIdResults[i].toString()] = _position;
        return _position;
      });
      setPositions(_positions);
      setLoading(false);
    } catch (err) {
      console.log('err', err);
      setPositions([]);
      setLoading(false);
    }
  }, [provider, account]);
  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (!account || chainId !== config.chainId) setPositions([]);
      if (provider && account && chainId === config.chainId) getPositions();
    }, 300);
  }, [provider, account, chainId]);
  return { loading, positions };
}
