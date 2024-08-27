import { Contract } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';

import positionAbi from '../../abi/position';

export default function useCollectInfo(tokenId: string, contracts: any) {
  const [info, setInfo] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { account, chainId, provider } = useAccount();

  const queryCollectInfo = useCallback(async () => {
    if (!chainId || !tokenId || !contracts[chainId]) return;
    const { PositionManager } = contracts[chainId];
    try {
      setLoading(true);
      const PositionContract = new Contract(PositionManager, positionAbi, provider);
      const result = await PositionContract.callStatic.collect([
        tokenId,
        account,
        '340282366920938463463374607431768211455',
        '340282366920938463463374607431768211455',
      ]);

      setInfo(result);
      setLoading(false);
    } catch (err) {
      setInfo(null);
      setLoading(false);
    }
  }, [chainId, provider]);

  useEffect(() => {
    queryCollectInfo();
  }, [chainId]);

  return { loading, info, queryCollectInfo };
}
