import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const HomePage: NextPageWithLayout = () => {
  return <div>111</div>;
};

HomePage.getLayout = useDefaultLayout;

export default HomePage;
