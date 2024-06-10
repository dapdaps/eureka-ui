import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import LaunchpadDetailPage from '@/views/Launchpad/detail/index';

export const Page: NextPageWithLayout = () => {
  return <LaunchpadDetailPage />;
};

Page.getLayout = useDefaultLayout;

export default Page;
