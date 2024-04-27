import { useRouter } from 'next/router';
import { useDefaultLayout } from '@/hooks/useLayout';
import { LiquidityContext } from '@/views/Pool/context';
import View from '@/views/Pool/Pools';
import type { NextPageWithLayout } from '@/utils/types';

export const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const dapp = router.query.dapp as string;
  return (
    <LiquidityContext.Provider
      value={{
        dapp,
        tokenId: router.query.id,
      }}
    >
      <View dapp={dapp} />
    </LiquidityContext.Provider>
  );
};

Page.getLayout = useDefaultLayout;

export default Page;
