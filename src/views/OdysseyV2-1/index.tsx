import {
  StyledOdysseyV2Container
} from '@/views/OdysseyV2-1/styles';

import Banner from '@/views/OdysseyV2-1/components/Banner';
import useDetail from '@/views/OdysseyV2-1/hooks/useDetail';
import Matrix from '@/views/OdysseyV2-1/components/Matrix';
import Bridge from '@/views/OdysseyV2-1/components/Bridge';
import Swap from '@/views/OdysseyV2-1/components/Swap';
import Lending from '@/views/OdysseyV2-1/components/Lending';
import Staking from '@/views/OdysseyV2-1/components/Staking';
import useQuests from '@/views/OdysseyV2-1/hooks/useQuests';
import Explores from '@/views/OdysseyV2-1/components/Explores';
import Noti from '@/views/OdysseyV4/components/Noti';
import { useState } from 'react';
import useUserInfo from '@/hooks/useUserInfo';
import FootClaim from '@/views/OdysseyV2-1/components/FootClaim';
import { useRouter } from 'next/router';

const OdysseyV21 = () => {
  const router = useRouter();
  const { id } = router.query;
  const { detail, loading, queryDetail } = useDetail();
  const { loading: questingLoading, quests } = useQuests();
  const [showNoti, setShowNoti] = useState(true);
  const { userInfo, queryUserInfo } = useUserInfo();

  return <StyledOdysseyV2Container>
    {showNoti ? <Noti onClose={() => setShowNoti(false)} /> : null}
    <Banner detail={detail} />
    <Matrix />
    <Explores queryDetail={queryDetail} detail={detail} list={quests.social} userInfo={userInfo}/>
    <Bridge list={quests.bridge} onRefreshDetail={queryDetail} />
    <Swap list={quests.swap} onRefreshDetail={queryDetail} />
    <Lending list={quests.lending} onRefreshDetail={queryDetail} />
    <Staking list={quests.staking} onRefreshDetail={queryDetail} />
    <FootClaim
      unclaimed={detail?.user?.unclaimed_reward}
      totalReward={detail?.user?.total_reward}
      unlocked={quests.unlockedAmount}
      onRefreshDetail={queryDetail}
      id={id}
    />
  </StyledOdysseyV2Container>
}


export default OdysseyV21;