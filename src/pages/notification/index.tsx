import { useDefaultLayout, useSimpleLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import List from '@/views/notification';
import { useEffect } from 'react';

const Page: NextPageWithLayout = () => {

    return <List />;
};

Page.getLayout = useDefaultLayout;

export default Page;