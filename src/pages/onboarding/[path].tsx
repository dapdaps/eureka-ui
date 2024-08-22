import { useRouter } from 'next/router';

import { PathToId } from '@/config/all-in-one/chains';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import OnBoarding from '@/views/OnBoarding';

const OnBoardingPage: NextPageWithLayout = () => {
  const router = useRouter();
  const path = router.query.path as string;

  return path && PathToId[path] ? <OnBoarding path={path} /> : null;
};

OnBoardingPage.getLayout = useDefaultLayout;

export default OnBoardingPage;
