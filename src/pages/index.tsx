import { useSimpleLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import IntroPageView from '@/views/Intro';

const HomePage: NextPageWithLayout = () => {
  return <IntroPageView/>;
};


HomePage.getLayout = useSimpleLayout;

export default HomePage;