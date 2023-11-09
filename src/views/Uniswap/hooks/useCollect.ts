import { useCallback, useState } from 'react';
import { Contract, utils } from 'ethers';
import config from '@/config/uniswap/linea';
import Big from 'big.js';
import useAccount from '@/hooks/useAccount';
import positionAbi from '../abi/positionAbi';

export default function useCollect(onSuccess: () => void, onError?: () => void) {
  const [collecting, setCollecting] = useState<boolean>();
  const { account, provider } = useAccount();
  const collect = useCallback(
    async (detail: any, collectData: any) => {
      if (!provider || !account) return;
      setCollecting(true);
      try {
        const signer = await provider.getSigner(account);
        const PositionContract = new Contract(config.contracts.positionAddress, positionAbi, signer);
        const args = [
          detail.tokenId,
          account,
          // utils.parseUnits(collectData.collectToken0.toFixed(detail.token0.decimals), detail.token0.decimals),
          // utils.parseUnits(collectData.collectToken1.toFixed(detail.token1.decimals), detail.token1.decimals),
          '340282366920938463463374607431768211455',
          '340282366920938463463374607431768211455',
        ];

        const estimateGas = await PositionContract.estimateGas.collect(args);
        const tx = await PositionContract.collect(args, { gasLimit: estimateGas.add(1000) });
        const res = await tx.wait();
        if (res.status === 1) {
          onSuccess();
        }
        onError?.();
        setCollecting(false);
      } catch (err) {
        console.log(err);
        onError?.();
        setCollecting(false);
      }
    },
    [provider, account],
  );

  return { collecting, collect };
}
