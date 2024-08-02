import { useDefaultLayout } from '@/hooks/useLayout';
import OdysseyHomepageList from '@/views/Odyssey/list';
import type { NextPageWithLayout } from '@/utils/types';

const OdysseyHomepagePage: NextPageWithLayout = () => {
  return <OdysseyHomepageList />;
};

OdysseyHomepagePage.getLayout = useDefaultLayout;

export default OdysseyHomepagePage;
