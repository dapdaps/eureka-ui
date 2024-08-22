import { useRouter } from 'next/router';

import AddLiquidity from '@/views/Pool/AddLiquidity';
import { LiquidityContext } from '@/views/Pool/context';
import Detail from '@/views/Pool/Detail';
import Pools from '@/views/Pool/Pools';

export default function PoolDapp({ dapp, chainId, currentChain, localConfig, chains }: any) {
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
        id: router.query.id,
        fee: router.query.fee,
      }}
    >
      {router.query.path === 'position' ? <Detail /> : router.query.path === 'add' ? <AddLiquidity /> : <Pools />}
    </LiquidityContext.Provider>
  );
}
