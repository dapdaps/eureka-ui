import { useRouter } from 'next/router';
import { useCallback,useEffect, useState } from 'react';

import useUserInfo from '@/hooks/useUserInfo';
import useAuthBind from '@/views/QuestProfile/hooks/useAuthBind';
import useAuthConfig from '@/views/QuestProfile/hooks/useAuthConfig';

import Banner from './components/Banner';
import Bridge from './components/Bridge';
import Explores from './components/Explores';
import FootClaim from './components/FootClaim';
import Lending from './components/Lending';
import Noti from './components/Noti';
import ParterModal from './components/ParterModal';
import SlotMachine from './components/SlotMachine';
import Summary from './components/Summary';
import Tabs from './components/Tabs';
import Trade from './components/Trade';
import useDetail from './hooks/useDetail';
import useQuests from './hooks/useQuests';
import useRewards from './hooks/useRewards';
import useSpin from './hooks/useSpin';
import { StyledContainer, StyledContent } from './styles';

export default function OdysseyV8() {
  const router = useRouter();
  const { id } = router.query;

  const authConfig = useAuthConfig();
  const { rewards, loading: rewardLoading, query: queryRewards } = useRewards(id as string);
  const { detail, loading, parter, isGotSpins, showSpinsResultModal, setShowSpinsResultModal, queryDetail } = useDetail(
    id,
    () => {
      queryRewards();
    },
  );
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

  quests.swap.sort((a: any, b: any) => {
    return a.order - b.order;
  });
  const [lendingList, setLendingList] = useState<any>();

  const handleSpin = useCallback(() => {
    if (isSpining) {
      return;
    }
    startSpin().then((res) => {
      setReward(res);
      queryDetail();
      queryRewards();
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

  useEffect(() => {
    if (!quests.yield.length || !quests.liquidity.length || !quests.staking.length) return;
    const orbit = quests.lending.find((item: any) => item.name === 'Orbit');
    const pac = quests.lending.find((item: any) => item.name === 'Pac Finance');
    const _list = [...quests.yield, orbit, ...quests.liquidity, pac, ...quests.staking];
    setLendingList(_list);
  }, [quests]);

  return (
    <StyledContainer>
      <StyledContent>
        {showNoti ? <Noti onClose={() => setShowNoti(false)} /> : null}
        <Banner />
        <Summary data={detail} loading={loading} />
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
          loading={loading}
          rewards={rewards}
          queryRewards={queryRewards}
          rewardLoading={rewardLoading}
        />

        <Tabs
          strategies={quests.strategies}
          spins={quests.spins}
          detail={detail}
          queryDetail={queryDetail}
          questingLoading={questingLoading}
          userInfo={userInfo}
          authConfig={authConfig}
        />

        <Explores list={quests.social} userInfo={userInfo} authConfig={authConfig} onRefreshDetail={queryDetail} />
        <Bridge list={quests.bridge} onRefreshDetail={queryDetail} />
        <Trade list={quests.swap} onRefreshDetail={queryDetail} />
        <Lending list={lendingList} onRefreshDetail={queryDetail} />

        <FootClaim
          unclaimed={detail?.user?.unclaimed_reward}
          totalReward={detail?.user?.total_reward}
          unlocked={quests.unlockedAmount}
          onRefreshDetail={queryDetail}
          id={id}
        />
        {showSpinsResultModal && (
          <ParterModal
            onClose={() => {
              setShowSpinsResultModal(false);
            }}
            success={isGotSpins}
            parter={parter}
          />
        )}
      </StyledContent>
    </StyledContainer>
  );
}
