import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import FjordDetailPage from '@/views/Fjord/detail';
export const Page: NextPageWithLayout = () => {
  return <FjordDetailPage />;
};

Page.getLayout = useDefaultLayout;

export default Page;
