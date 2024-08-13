import { isMobile } from 'react-device-detect';

import { useDefaultLayout, useMarketingLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import Invite from '@/views/marketing/invite';
import { InviteConfig } from '@/config/marketing/invite';
const LandingPage: NextPageWithLayout = () => {
  // from coin68
  return <Invite { ...InviteConfig.coin68 } isMobile={isMobile}/>
};

LandingPage.getLayout = isMobile ? useMarketingLayout : useDefaultLayout;

export default LandingPage;
