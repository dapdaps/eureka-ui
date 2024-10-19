import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import FjordYoursPage from '@/views/Fjord/yours';
export const Page: NextPageWithLayout = () => {
  return <FjordYoursPage />;
};

Page.getLayout = useDefaultLayout;

export default Page;
