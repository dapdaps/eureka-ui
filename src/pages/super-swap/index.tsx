import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import SuperSwap from '@/views/SuperSwap';
import useTokenPriceList from '@/hooks/useTokenPriceList';

const SuperSwapPage: NextPageWithLayout = () => {
  useTokenPriceList()
  return <SuperSwap />;
};

SuperSwapPage.getLayout = useDefaultLayout;

export default SuperSwapPage;
