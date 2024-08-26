import Detail from '@/views/Pool/Detail';
import AddLiquidity from '@/views/Pool/AddLiquidity';
import Pools from '@/views/Pool/Pools';
import { LiquidityContext } from '@/views/Pool/context';
import { useRouter } from 'next/router';

const ThrusterFinancePools = (props: any) => {
  const { dapp, chainId, currentChain, localConfig, chains, poolPage } = props;

  const router = useRouter();

  console.log(router.query);

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
      {
        poolPage === 'detail' && (
          <Detail />
        )
      }
      {
        poolPage === 'add' && (
          <AddLiquidity />
        )
      }
      {
        poolPage === 'pools' && (
          <Pools />
        )
      }
    </LiquidityContext.Provider>
  );
};

export default ThrusterFinancePools;
