import { useThrottleFn } from 'ahooks';
import { useRouter } from 'next/router';
import { useState } from 'react';

import useUserInfo from '@/hooks/useUserInfo';
import Banner from '@/views/OdysseySurge/components/Banner';
import Explores from '@/views/OdysseySurge/components/Explores';
import FootClaim from '@/views/OdysseySurge/components/FootClaim';
import Matrix from '@/views/OdysseySurge/components/Matrix';
import Quest from '@/views/OdysseySurge/components/Quest/index';
import useDetail from '@/views/OdysseySurge/hooks/useDetail';
import { useGame } from '@/views/OdysseySurge/hooks/useGame';
import useQuests from '@/views/OdysseySurge/hooks/useQuests';
import {
  StyledOdysseyV2Container
} from '@/views/OdysseySurge/styles';
import Noti from '@/views/OdysseyV4/components/Noti';
import useAuthBind from '@/views/QuestProfile/hooks/useAuthBind';
import useClaim from '@/views/OdysseySurge/hooks/useClaim';

const OdysseySurge = () => {
  const router = useRouter();
  const { id } = router.query;

  const [exploredAmountLoading, setExploredAmountLoading] = useState(false);
  const [showNoti, setShowNoti] = useState(true);

  const { loading: questingLoading, quests,  setQuests, questsList } = useQuests();
  const { detail, loading, queryDetail, gameMatrixConfig } = useDetail(id, {
    quests,
    setQuests,
  });
  const { run: queryDetailThrottle } = useThrottleFn(queryDetail, { wait: 500 });
  const { userInfo, queryUserInfo } = useUserInfo();
  const { dappList, handleDapp, calcClaim, claimedDapps, claimedDappsLines, dappSplit } = useGame({
    gameMatrixConfig,
    questsList
  });
  const { loading: claimLoading, onClaim } = useClaim(id, queryDetailThrottle);

  useAuthBind({
    onSuccess: () => {
      queryUserInfo();
    },
    redirect_uri: `${window.location.origin}${window.location.pathname}?id=${id}`,
  });

  return (
    <StyledOdysseyV2Container>
      {showNoti ? <Noti onClose={() => setShowNoti(false)} /> : null}
      <Banner detail={detail} loading={loading}/>
      <Matrix
        dappList={dappList}
        handleDapp={handleDapp}
        calcClaim={calcClaim}
        claimedDapps={claimedDapps}
        claimedDappsLines={claimedDappsLines}
        dappSplit={dappSplit}
        unclaimed={detail.unclaimed_reward}
        onClaim={onClaim}
        loading={claimLoading}
        config={gameMatrixConfig}
      />
      <Explores
        onRefreshDetail={queryDetailThrottle}
        queryDetail={queryDetail}
        detail={detail}
        list={quests.social}
        userInfo={userInfo}
        detailLoading={exploredAmountLoading}
        setDetailLoading={setExploredAmountLoading}
        loading={questingLoading}
      />

      <Quest
        list={quests}
        detailLoading={exploredAmountLoading}
        setDetailLoading={setExploredAmountLoading}
        onRefreshDetail={queryDetail}
        loading={questingLoading}
      />

      <FootClaim
        unclaimed={detail.unclaimed_reward}
        totalReward={detail.total_reward}
        onClaim={onClaim}
        loading={claimLoading}
        lines={claimedDappsLines}
      />
    </StyledOdysseyV2Container>
  );
}


export default OdysseySurge;