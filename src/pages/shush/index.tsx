import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import ShuShView from '@/views/ShuSh';
import ShuShOrderView from '@/views/ShuSh/order';
import { useRouter } from 'next/router';

const ShuShPage: NextPageWithLayout = () => {
  const router = useRouter();
  return router.query.id ? <ShuShOrderView id={router.query.id} /> : <ShuShView />;
};

ShuShPage.getLayout = useDefaultLayout;

export default ShuShPage;
