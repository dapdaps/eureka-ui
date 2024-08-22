import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import SingleDapp from '@/views/SingleDapp';

// set dynamic routes for dapps in config file

export const Page: NextPageWithLayout = () => {
  return <SingleDapp dappPathname="layer-bank" />;
};

Page.getLayout = useDefaultLayout;

export default Page;
