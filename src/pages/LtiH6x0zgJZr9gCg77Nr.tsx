import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import Analytics from '@/views/analytics';

const AnalyticsPage: NextPageWithLayout = () => {
  return <Analytics />;
};

AnalyticsPage.getLayout = useDefaultLayout;

export default AnalyticsPage;
