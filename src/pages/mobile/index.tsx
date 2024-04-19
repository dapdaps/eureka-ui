import { useSimpleLayout } from '@/hooks/useLayout';
import MobileHomeView from '@/views/Mobile/index';
import type { NextPageWithLayout } from '@/utils/types';

const MobileHomePage: NextPageWithLayout = () => {
  return <MobileHomeView />;
};

MobileHomePage.getLayout = useSimpleLayout;

export default MobileHomePage;
