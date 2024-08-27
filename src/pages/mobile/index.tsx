import { useSimpleLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import MobileHomeView from '@/views/Mobile/index';

const MobileHomePage: NextPageWithLayout = () => {
  return <MobileHomeView />;
};

MobileHomePage.getLayout = useSimpleLayout;

export default MobileHomePage;
