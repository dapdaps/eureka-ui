import { isMobile } from 'react-device-detect';

import { InviteConfig } from '@/config/marketing/invite';
import { useDefaultLayout, useMarketingLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import Invite from '@/views/marketing/invite';

const LandingPage: NextPageWithLayout = () => {
  // from okx
  return <Invite {...InviteConfig.okx} isMobile={false} />
};

LandingPage.getLayout = isMobile ? useMarketingLayout : useDefaultLayout;

export default LandingPage;
