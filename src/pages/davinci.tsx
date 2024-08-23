import { useSimpleLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import DavinciView from '@/views/Davinci';

const DavinciPage: NextPageWithLayout = () => {
  return <DavinciView />;
};

DavinciPage.getLayout = useSimpleLayout;

export default DavinciPage;
