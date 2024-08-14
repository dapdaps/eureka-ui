import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

import { InviteConfig } from '@/config/marketing/invite';
import { QUEST_PATH } from '@/config/quest';
import useAccount from '@/hooks/useAccount';
import { useDefaultLayout, useMarketingLayout } from '@/hooks/useLayout';
import { get } from '@/utils/http';
import type { NextPageWithLayout } from '@/utils/types';
import Invite from '@/views/marketing/invite';
const LandingPage: NextPageWithLayout = () => {
  // const { account } = useAccount();
  // const router = useRouter();

  // const [isKol, setIsKol] = useState(false);

  // const kolName = router.query.kolName;

  // async function getKolInfo() {
  //   const res: any = await get(`${QUEST_PATH}/api/activity/kol`, { name: kolName });

  //   if ((res.code as number) !== 0) return;
  //   const { address, avatar } = res.data;
  //   setIsKol(address === account);
  // }

  // useEffect(() => {
  //   router?.query?.kolName && getKolInfo();
  // }, [router?.query?.kolName]);
  return <Invite {...InviteConfig.kol} isMobile={isMobile} />;
};

LandingPage.getLayout = isMobile ? useMarketingLayout : useDefaultLayout;

export default LandingPage;
