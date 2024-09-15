import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

import { useDefaultLayout } from '@/hooks/useLayout';

const Campaigns: any = {
  'rubic-holdstation': dynamic(() => import('@/views/Campaign/RubicHoldstation'))
};

const CampaignPage = () => {
  const params = useSearchParams();
  const title = params.get('category') as string;

  const Com = Campaigns[title];

  return <>{Com && <Com />}</>;
};

CampaignPage.getLayout = useDefaultLayout;

export default CampaignPage;