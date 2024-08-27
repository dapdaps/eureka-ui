import { useRouter } from 'next/router';

import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import AllInOneDetailView from '@/views/AllInOne/Detail';

const AllInOneDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const chain = router.query.chain as string;
  let menu = router.query.menu as string;
  if (menu) {
    menu = menu.toLowerCase();
  }

  return chain ? (
    <AllInOneDetailView chain={chain} menu={menu} />
  ) : (
    <div />
  );
};

AllInOneDetail.getLayout = useDefaultLayout;

export default AllInOneDetail;
