import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import List from '@/views/networks/list';

const Page: NextPageWithLayout = () => {
  return <List />;
};

Page.getLayout = useDefaultLayout;

export default Page;
