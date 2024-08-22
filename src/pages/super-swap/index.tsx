import { useDefaultLayout } from '@/hooks/useLayout';
import useTokenPopularList from '@/hooks/useTokenPopularList';
import type { NextPageWithLayout } from '@/utils/types';
import SuperSwap from '@/views/SuperSwap';

const SuperSwapPage: NextPageWithLayout = () => {
  useTokenPopularList()
  return <SuperSwap />;
};

SuperSwapPage.getLayout = useDefaultLayout;

export default SuperSwapPage;
