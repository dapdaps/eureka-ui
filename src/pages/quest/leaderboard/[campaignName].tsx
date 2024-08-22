import { useRouter } from 'next/router';

import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import BnsCompaignView from '@/views/bns/compaign';
import QuestLeaderboardView from '@/views/QuestLeaderboard';

const BnsLeaderboardPage: NextPageWithLayout = () => {
  const router = useRouter();
  const campaignName = router.query.campaignName;
  return campaignName === 'DapDapXBNS' ? <BnsCompaignView /> : <QuestLeaderboardView />;
};

BnsLeaderboardPage.getLayout = useDefaultLayout;

export default BnsLeaderboardPage;
