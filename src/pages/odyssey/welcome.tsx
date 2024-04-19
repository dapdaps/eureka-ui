import { useDefaultLayout } from '@/hooks/useLayout';
import OdysseyWelcomeView from '@/views/Odyssey/welcome';
import type { NextPageWithLayout } from '@/utils/types';

const OdysseyWelcomePage: NextPageWithLayout = () => {
  return <OdysseyWelcomeView />;
};

OdysseyWelcomePage.getLayout = useDefaultLayout;

export default OdysseyWelcomePage;
