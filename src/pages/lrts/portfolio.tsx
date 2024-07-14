import { useLrtLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import PortfolioView from '@/views/lrts/portfolio';

const PortFolioPage: NextPageWithLayout = () => {
  return <PortfolioView />;
};

PortFolioPage.getLayout = useLrtLayout;

export default PortFolioPage;
