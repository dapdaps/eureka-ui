import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useDefaultLayout } from '@/hooks/useLayout';

const Campaigns: any = {
  'rubic-holdstation': dynamic(() => import('@/views/Campaign/RubicHoldstation')),
};

const CampaignPage = () => {
  const router = useRouter();
  const title = router.query.title as string;

  const Com = Campaigns[title];

  return (
    <>
      {
        Com && (
          <Com />
        )
      }
    </>
  );
};

CampaignPage.getLayout = useDefaultLayout;

export default CampaignPage;
