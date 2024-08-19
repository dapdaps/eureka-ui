import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import SuperSwap from '@/views/SuperSwap';
import useTokenPopularList from '@/hooks/useTokenPopularList';

const SuperSwapPage: NextPageWithLayout = () => {
  useTokenPopularList()
  return <SuperSwap />;
};

SuperSwapPage.getLayout = useDefaultLayout;

export default SuperSwapPage;
