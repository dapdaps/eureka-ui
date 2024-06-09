
import { useDefaultLayout } from '@/hooks/useLayout';

import type { NextPageWithLayout } from '@/utils/types';
import LaunchpadHomePage from '@/views/Launchpad/home';
export const Page: NextPageWithLayout = () => {
  return <LaunchpadHomePage />
};

Page.getLayout = useDefaultLayout;

export default Page;
