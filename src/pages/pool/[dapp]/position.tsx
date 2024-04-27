import { useRouter } from 'next/router';
import { useDefaultLayout } from '@/hooks/useLayout';
import { LiquidityContext } from '@/views/Pool/context';
import View from '@/views/Pool/Detail';
import type { NextPageWithLayout } from '@/utils/types';

export const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const dapp = router.query.dapp as string;

  if (!dapp) return <div />;

  return (
    <LiquidityContext.Provider
      value={{
        dapp,
        tokenId: router.query.id,
      }}
    >
      <View dapp={dapp} tokenId={router.query.id} />
    </LiquidityContext.Provider>
  );
};

Page.getLayout = useDefaultLayout;

export default Page;
