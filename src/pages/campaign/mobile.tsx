import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

import { useSimpleLayout } from '@/hooks/useLayout';

const Campaigns: any = {
  'rubic-holdstation': dynamic(() => import('@/views/Campaign/RubicHoldstation/Mobile'))
};

const CampaignMobilePage = () => {
  const params = useSearchParams();
  const title = params.get('category') as string;

  const Com = Campaigns[title];

  return <>{Com && <Com />}</>;
};

CampaignMobilePage.getLayout = useSimpleLayout;

export default CampaignMobilePage;
