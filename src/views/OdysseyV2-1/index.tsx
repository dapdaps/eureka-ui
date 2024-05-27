import {
  StyledOdysseyV2Container
} from '@/views/OdysseyV2-1/styles';

import Banner from '@/views/OdysseyV2-1/components/Banner';
import useDetail from '@/views/OdysseyV2-1/hooks/useDetail';
import Matrix from '@/views/OdysseyV2-1/components/Matrix';
import Quest from '@/views/OdysseyV2-1/components/Quest/index';
import useQuests from '@/views/OdysseyV2-1/hooks/useQuests';
import Explores from '@/views/OdysseyV2-1/components/Explores';
import Noti from '@/views/OdysseyV4/components/Noti';
import { useEffect, useState } from 'react';
import useUserInfo from '@/hooks/useUserInfo';
import FootClaim from '@/views/OdysseyV2-1/components/FootClaim';
import { useRouter } from 'next/router';
import useAuthBind from '@/views/QuestProfile/hooks/useAuthBind';
import { useThrottleFn } from 'ahooks';

const OdysseyV21 = () => {
  const router = useRouter();
  const { id } = router.query;
  const [exploredAmount, setExploredAmount] = useState(0);

  const { loading: questingLoading, quests,  setQuests } = useQuests();
  const [exploredAmountLoading, setExploredAmountLoading] = useState(false);
  const { detail, loading, queryDetail } = useDetail(id, {
    quests,
    setExploredAmount,
    setQuests,
  });
  const [showNoti, setShowNoti] = useState(true);
  const { userInfo, queryUserInfo } = useUserInfo();
  const { run: queryDetailThrottle } = useThrottleFn(queryDetail, { wait: 500 });

  useAuthBind({
    onSuccess: () => {
      queryUserInfo();
    },
    redirect_uri: `${window.location.origin}${window.location.pathname}?id=${id}`,
  });

  useEffect(() => {
    let _exploredAmount = 0;
    for (const questKey in quests) {
      if (questKey === 'mode') continue;
      quests[questKey].forEach((it: any) => {
        _exploredAmount += it.exploredAmount || 0;
      });
    }
    setExploredAmount(_exploredAmount);
  }, [quests]);

  return <StyledOdysseyV2Container>
    {showNoti ? <Noti onClose={() => setShowNoti(false)} /> : null}
    <Banner detail={detail} loading={loading}/>
    <Matrix />
    <Explores
      onRefreshDetail={queryDetailThrottle}
      queryDetail={queryDetail}
      detail={detail}
      list={quests.social}
      userInfo={userInfo}
      detailLoading={exploredAmountLoading}
      setDetailLoading={setExploredAmountLoading}
      loading={questingLoading} />

    <Quest
      list={quests}
      detailLoading={exploredAmountLoading}
      setDetailLoading={setExploredAmountLoading}
      onRefreshDetail={queryDetail}
      loading={questingLoading} />

    <FootClaim
      unclaimed={detail?.user?.unclaimed_reward}
      totalReward={detail?.user?.total_reward}
      explored={exploredAmount}
      onRefreshDetail={queryDetailThrottle}
      id={id}
    />
  </StyledOdysseyV2Container>
}


export default OdysseyV21;