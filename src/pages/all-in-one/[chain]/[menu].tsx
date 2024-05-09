import { useRouter } from 'next/router';

import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import AllInOneDetailView from '@/views/AllInOne/Detail';

const AllInOneDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const chain = router.query.chain as string;
  const menu = router.query.menu as string;
  
  return chain ? (
    <AllInOneDetailView chain={chain} menu={menu} />
  ) : (
    <div />
  );
};

AllInOneDetail.getLayout = useDefaultLayout;

export default AllInOneDetail;
