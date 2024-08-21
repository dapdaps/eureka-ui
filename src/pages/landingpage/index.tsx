import { useSimpleLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import LandingHomePageView from '@/views/Landingpage';

const LandingHomePage: NextPageWithLayout = () => {
  return <LandingHomePageView/>;
};


LandingHomePage.getLayout = useSimpleLayout;

export default LandingHomePage;