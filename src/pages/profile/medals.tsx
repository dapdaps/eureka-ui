import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import MedalsView from '@/views/Profile/medals';

const MedalsPage: NextPageWithLayout = () => {
  return <MedalsView />;
};

MedalsPage.getLayout = useDefaultLayout;

export default MedalsPage;
