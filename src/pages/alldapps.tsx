import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import AllDapps from '@/views/AllDapps';

const AllDappsColumn: NextPageWithLayout = () => {
  return (
    <AllDapps />
  );
};

AllDappsColumn.getLayout = useDefaultLayout;

export default AllDappsColumn;
