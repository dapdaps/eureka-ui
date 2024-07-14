import { useLrtLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import Earning from '@/views/lrts/earning';

const EarningPage: NextPageWithLayout = () => {
  return <Earning />;
};

EarningPage.getLayout = useLrtLayout;

export default EarningPage;
