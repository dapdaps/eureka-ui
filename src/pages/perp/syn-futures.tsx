import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import SynFuturesView from '@/views/Perp/syn-futures';

const SynFuturesPage: NextPageWithLayout = () => {
  return <SynFuturesView/>;
};


SynFuturesPage.getLayout = useDefaultLayout;

export default SynFuturesPage;