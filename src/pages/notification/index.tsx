import { useDefaultLayout, useSimpleLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import List from '@/views/notification';

const Page: NextPageWithLayout = () => {

    return <List />;
};

Page.getLayout = useDefaultLayout;

export default Page;