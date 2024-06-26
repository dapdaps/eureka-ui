import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import useUserInfo from '@/hooks/useUserInfo';
import useAuthBind from '@/views/QuestProfile/hooks/useAuthBind';
import useAuthConfig from '@/views/QuestProfile/hooks/useAuthConfig';

import SlotMachine from './components/SlotMachine';
import Tabs from './components/Tabs';
import useDetail from './hooks/useDetail';
import useQuests from './hooks/useQuests';
import useRewards from './hooks/useRewards';
import useSpin from './hooks/useSpin';
import { StyledContainer, StyledContent } from './styles';

export default function ThrusterCampaign() {
  const router = useRouter();
  const { id } = router.query;

  const authConfig = useAuthConfig();
  const { rewards, loading: rewardLoading, query: queryRewards } = useRewards(id as string);
  const {
    detail,
    loading,
    parter,
    isGotSpins,
    showSpinsResultModal,
    setShowSpinsResultModal,
    queryDetail,
    hasRewrd,
    queryRewordCheck,
  } = useDetail(id, () => {
    queryRewards();
  });
  const { loading: questingLoading, quests, queryQuests } = useQuests(id);
  const { userInfo, queryUserInfo } = useUserInfo();

  const [showNoti, setShowNoti] = useState(true);
  const [reward, setReward] = useState(0);

  const { startSpin, chainList, startCliam, isSpining, isClaiming } = useSpin(id as string);

  useAuthBind({
    onSuccess: () => {
      queryUserInfo();
    },
    redirect_uri: `${window.location.origin}${window.location.pathname}?id=${id}`,
  });

  // console.log('quests--', quests);

  // quests.swap.sort((a: any, b: any) => {
  //   return a.order - b.order;
  // });

  const handleSpin = useCallback(() => {
    if (isSpining) {
      return;
    }
    startSpin().then((res) => {
      setReward(res);
      queryDetail();
      queryRewards(9000);
      queryRewordCheck();
    });
  }, [isSpining]);

  const handleClaim = useCallback(() => {
    if (isClaiming) {
      return;
    }
    startCliam().then(() => {
      queryDetail();
    });
  }, [isClaiming]);

  return (
    <StyledContainer>
      <StyledContent>
        <SlotMachine
          chainList={chainList}
          handleSpin={handleSpin}
          handleClaim={handleClaim}
          totalSpins={detail?.user?.total_spins}
          availableSpins={detail?.user?.available_spins}
          unclaimedReward={detail?.user?.unclaimed_reward}
          reward={reward}
          isSpining={isSpining}
          isClaiming={isClaiming}
          onRefresh={() => {
            queryDetail();
            queryQuests();
          }}
          hasRewrd={hasRewrd}
          detail={detail}
          loading={loading}
          rewards={rewards}
          queryRewards={queryRewards}
          rewardLoading={rewardLoading}
        />

        {/* <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 10, paddingBottom: 80 }}>
          <Timer endTime={detail.end_time}/>
        </div>   */}

        <div style={{ position: 'relative', zIndex: 10 }}>
          <Tabs
            quests={quests}
            queryDetail={queryDetail}
            userInfo={userInfo}
            authConfig={authConfig}
            onRefresh={() => {
              queryQuests();
            }}
          />
        </div>
      </StyledContent>
    </StyledContainer>
  );
}
