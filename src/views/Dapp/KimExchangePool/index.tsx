import { useRouter } from 'next/router';

import KimExchangePool from '@/views/KimExchangePool';
import AddLiquidity from '@/views/KimExchangePool/AddLiquidity';
import Detail from '@/views/KimExchangePool/Detail';
import IncreaseLiquidity from '@/views/KimExchangePool/IncreaseLiquidity';
import RemoveLiquidity from '@/views/KimExchangePool/RemoveLiquidity';
import { LiquidityContext } from '@/views/Pool/context';

export default function KimExchangePoolDapp({ dapp, chainId, currentChain, localConfig, chains }: any) {
  const router = useRouter();
  return (
    <LiquidityContext.Provider
      value={{
        dapp,
        ...localConfig,
        chainId,
        chains,
        currentChain,
        tokenId: router.query.id,
        token0: router.query.token0,
        token1: router.query.token1,
        tab: router.query.sub
      }}
    >
      {router.query.path === 'position' && <Detail />}
      {router.query.path === 'remove' && <RemoveLiquidity />}
      {router.query.path === 'add' && <AddLiquidity />}
      {router.query.path === 'increase' && <IncreaseLiquidity />}
      {!router.query.path && <KimExchangePool />}
    </LiquidityContext.Provider>
  );
}
