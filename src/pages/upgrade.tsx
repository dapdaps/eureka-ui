import { useSimpleLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import UpgradeView from '@/views/Upgrade';

const Upgrade: NextPageWithLayout = () => {
  return (
    <UpgradeView />
  );
};

Upgrade.getLayout = useSimpleLayout;

export default Upgrade;
