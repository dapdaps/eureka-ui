import { useRouter } from 'next/router';

import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import AllInOneView from '@/views/AllInOne';

const AllInOne: NextPageWithLayout = () => {
  const router = useRouter();
  const chain = router.query.chain as string;

  return chain ? (
    <AllInOneView chain={chain} />
  ) : (
    <div />
  );
};

AllInOne.getLayout = useDefaultLayout;

export default AllInOne;
