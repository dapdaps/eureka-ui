import { useSimpleLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import IntroPageView from '@/views/Intro';

const IntroPage: NextPageWithLayout = () => {
  return <IntroPageView/>;
};


IntroPage.getLayout = useSimpleLayout;

export default IntroPage;