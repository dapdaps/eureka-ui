import { useRouter } from 'next/router';
import { LiquidityContext } from '@/views/Pool/context';
import Pools from '@/views/Pool/Pools';
import Detail from '@/views/Pool/Detail';
import AddLiquidity from '@/views/Pool/AddLiquidity';

export default function PoolDapp({ dapp, chainId, dappChains, currentChain, localConfig, network, chains }: any) {
  const router = useRouter();
  console.log(router);
  return (
    <LiquidityContext.Provider
      value={{
        dapp,
        ...localConfig,
        chainId,
        chains,
        currentChain,
        tokenId: router.query.id,
      }}
    >
      {router.query.path === 'position' ? <Detail /> : router.query.path === 'add' ? <AddLiquidity /> : <Pools />}
    </LiquidityContext.Provider>
  );
}
