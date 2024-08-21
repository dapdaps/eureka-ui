
import { InviteConfig } from '@/config/marketing/invite';
import { useDefaultLayout, useMarketingLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import Invite from '@/views/marketing/invite';
import { isMobile } from 'react-device-detect';

const LandingPage: NextPageWithLayout = () => {
  return <Invite {...InviteConfig.coin98} isMobile={isMobile} />
};

LandingPage.getLayout = isMobile ? useMarketingLayout : useDefaultLayout;

export default LandingPage;
