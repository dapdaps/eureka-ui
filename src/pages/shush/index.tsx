import { useRouter } from 'next/router';

import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import ShuShView from '@/views/ShuSh';
import ShuShOrderView from '@/views/ShuSh/order';

const ShuShPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { questId, id } = router.query;
  return id ? <ShuShOrderView id={id} questId={questId} /> : <ShuShView questId={questId} />;
};

ShuShPage.getLayout = useDefaultLayout;

export default ShuShPage;
