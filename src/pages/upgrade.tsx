import UpgradeView from '@/views/Upgrade';
import { useSimpleLayout } from '@/hooks/useLayout';

import type { NextPageWithLayout } from '@/utils/types';

const Upgrade: NextPageWithLayout = () => {
  return (
    <UpgradeView />
  );
};

Upgrade.getLayout = useSimpleLayout;

export default Upgrade;
