
import { useDefaultLayout } from '@/hooks/useLayout';

import type { NextPageWithLayout } from '@/utils/types';
import LaunchpadYoursPage from '@/views/Launchpad/yours';
export const Page: NextPageWithLayout = () => {
  return <LaunchpadYoursPage />
};

Page.getLayout = useDefaultLayout;

export default Page;
