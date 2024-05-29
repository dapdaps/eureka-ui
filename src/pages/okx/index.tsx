import { isMobile } from 'react-device-detect';

import { useDefaultLayout, useMarketingLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import LandingPC from '@/views/marketing/okx';

const LandingPage: NextPageWithLayout = () => {
  // from okx
  return <LandingPC platform="okx" from="bg" />;
};

LandingPage.getLayout = isMobile ? useMarketingLayout : useDefaultLayout;

export default LandingPage;
