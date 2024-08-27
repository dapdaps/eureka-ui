import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import OdysseyHomepageList from '@/views/Odyssey/list';

const OdysseyHomepagePage: NextPageWithLayout = () => {
  return <OdysseyHomepageList />;
};

OdysseyHomepagePage.getLayout = useDefaultLayout;

export default OdysseyHomepagePage;
