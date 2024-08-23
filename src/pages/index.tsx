import { useSimpleLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import HomeView from '@/views/Davinci';

const HomePage: NextPageWithLayout = () => {
  return <HomeView />;
};

HomePage.getLayout = useSimpleLayout;

export default HomePage;
