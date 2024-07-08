import { useLrtLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import LrtView from '@/views/lrts';

const LrtPage: NextPageWithLayout = () => {
  return <LrtView />;
};

LrtPage.getLayout = useLrtLayout;

export default LrtPage;
