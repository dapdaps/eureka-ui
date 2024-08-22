import { useRouter } from 'next/router';

import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import Trends from '@/views/OnBoarding/Trends';

const TrendsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const chain = router.query.chain as string;

  return chain ? <Trends chain={chain} /> : null;
};

TrendsPage.getLayout = useDefaultLayout;

export default TrendsPage;
