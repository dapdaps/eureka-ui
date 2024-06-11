import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';

import useUserInfo from '@/hooks/useUserInfo';
import useAuthBind from '@/views/QuestProfile/hooks/useAuthBind';
import useAuthConfig from '@/views/QuestProfile/hooks/useAuthConfig';
import Banner from './components/Banner';
import Bridge from './components/Bridge';
import Explores from './components/Explores';
import FootClaim from './components/FootClaim';
import Spins from './components/Spins';
import Lending from './components/Lending';
import Noti from './components/Noti';
import Pilcrow from './components/Pilcrow';
import Summary from './components/Summary';
import Trade from './components/Trade';
import Treasure from './components/Treasure';
import SlotMachine from './components/SlotMachine';
import useDetail from './hooks/useDetail';
import useQuests from './hooks/useQuests';
import useSpin from './hooks/useSpin';
import { StyledBg, StyledContainer, StyledContent } from './styles';

export default function OdysseyV4() {
  const router = useRouter();
  const { id } = router.query;

  const authConfig = useAuthConfig();
  const { detail, loading, queryDetail } = useDetail(id);
  const { loading: questingLoading, quests } = useQuests(id);
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
    });
  }, [isSpining]);

  const unclaimedReward = 0;

  const handlClaim = useCallback(() => {
    if (unclaimedReward <= 0 || isClaiming) {
      return;
    }
    startCliam().then(() => {
      queryDetail();
    });
  }, [unclaimedReward, isClaiming]);

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
        <StyledBg>
          <Banner />
          <Summary data={detail} loading={loading} />

          <Pilcrow
            title="Blast Treasure Strategies"
            desc="Explore Blast treasure strategies, maximize your Blast Gold earnings!"
          />
          <Treasure />
        </StyledBg>
        <Pilcrow
          title="Earn Extra Gold / Bonus Spins!"
          desc="Interact with popular dApps in Blast on DapDap, earn extra Gold and spin to win!"
        />
        <SlotMachine
          chainList={chainList}
          handleSpin={handleSpin}
          handleClaim={handlClaim}
          totalSpins={detail?.user?.total_spins}
          availableSpins={detail?.user?.available_spins}
          unclaimedReward={detail?.user?.unclaimed_reward}
          reward={reward}
          isSpining={isSpining}
          isClaiming={isClaiming}
        />
        <Spins list={quests.golds} data={detail} onRefreshDetail={queryDetail} loading={questingLoading} />
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
      </StyledContent>
    </StyledContainer>
  );
}
