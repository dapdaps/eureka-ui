import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import SuperSwap from '@/views/SuperSwap';

const SuperSwapPage: NextPageWithLayout = () => {
  return <SuperSwap />;
};

SuperSwapPage.getLayout = useDefaultLayout;

export default SuperSwapPage;
