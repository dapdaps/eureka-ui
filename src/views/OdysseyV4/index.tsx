import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import useUserInfo from '@/hooks/useUserInfo';
import useAuthBind from '@/views/QuestProfile/hooks/useAuthBind';
import useAuthConfig from '@/views/QuestProfile/hooks/useAuthConfig';

import Banner from './components/Banner';
import Bridge from './components/Bridge';
import Explores from './components/Explores';
import FootClaim from './components/FootClaim';
import Golds from './components/Golds';
import Lending from './components/Lending';
import Modal from './components/Modal';
import Noti from './components/Noti';
import Pilcrow from './components/Pilcrow';
import Summary from './components/Summary';
import Trade from './components/Trade';
import Treasure from './components/Treasure';
import useDetail from './hooks/useDetail';
import useQuests from './hooks/useQuests';
import { StyledBg, StyledContainer, StyledContent } from './styles';

export default function OdysseyV4() {
  const router = useRouter();
  const { id } = router.query;

  const authConfig = useAuthConfig();
  const { detail, loading, queryDetail } = useDetail(id);
  const { loading: questingLoading, quests } = useQuests(id);
  const { userInfo, queryUserInfo } = useUserInfo();

  const [showNoti, setShowNoti] = useState(true);
  useAuthBind({
    onSuccess: () => {
      queryUserInfo();
    },
    redirect_uri: `${window.location.origin}${window.location.pathname}?id=4`,
  });

  console.log('quests--', quests);
  console.log('detail--', detail);
  quests.swap.sort((a: any, b: any) => {
    return a.order - b.order;
  });
  const [lendingList, setLendingList] = useState<any>();
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
          title="Win Extra Gold With Partner DApps"
          desc="Interact with popular Blast dApps via DapDap, secure extra Gold"
        />

        <Golds list={quests.golds} data={detail} onRefreshDetail={queryDetail} loading={questingLoading} />
        <Explores />
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
