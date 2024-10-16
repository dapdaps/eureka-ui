import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import OdysseyHomepageView from '@/views/Odyssey/homepage';

const OdysseyHomepagePage: NextPageWithLayout = () => {
  return <OdysseyHomepageView />;
};

OdysseyHomepagePage.getLayout = useDefaultLayout;

export default OdysseyHomepagePage;
