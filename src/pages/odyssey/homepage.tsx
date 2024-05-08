import { useDefaultLayout } from '@/hooks/useLayout';
import OdysseyHomepageView from '@/views/Odyssey/homepage';
import type { NextPageWithLayout } from '@/utils/types';

const OdysseyHomepagePage: NextPageWithLayout = () => {
  return <OdysseyHomepageView />;
};

OdysseyHomepagePage.getLayout = useDefaultLayout;

export default OdysseyHomepagePage;
