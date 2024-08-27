
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import FjordPage from '@/views/Fjord/index';
export const Page: NextPageWithLayout = () => {
  return <FjordPage />
};

Page.getLayout = useDefaultLayout;

export default Page;
