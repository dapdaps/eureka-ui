import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import ShuShSearchView from '@/views/ShuSh/Search';

const ShuShSearchPage: NextPageWithLayout = () => {
  return <ShuShSearchView />;
};

ShuShSearchPage.getLayout = useDefaultLayout;

export default ShuShSearchPage;
