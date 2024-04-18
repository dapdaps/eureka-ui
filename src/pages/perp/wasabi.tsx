import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import WasabiView from '@/views/Perp/wasabi';

const WasabiPage: NextPageWithLayout = () => {
  return <WasabiView/>;
};


WasabiPage.getLayout = useDefaultLayout;

export default WasabiPage;