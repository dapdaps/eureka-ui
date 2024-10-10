import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import LineaLiquid from '@/views/LineaLiquid';

const OdysseyHomepagePage: NextPageWithLayout = () => {
  return <LineaLiquid />;
};

OdysseyHomepagePage.getLayout = useDefaultLayout;

export default OdysseyHomepagePage;
