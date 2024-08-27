import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import HomeView from '@/views/Home';

const HomePage: NextPageWithLayout = () => {
  return <HomeView />;
};

HomePage.getLayout = useDefaultLayout;

export default HomePage;
