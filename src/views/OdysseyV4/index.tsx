import { useRouter } from 'next/router';
import { useState } from 'react';

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
import { StyledContainer, StyledContent } from './styles';

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

  return (
    <StyledContainer>
      <StyledContent>
        {showNoti ? <Noti onClose={() => setShowNoti(false)} /> : null}

        <Banner />
        <Summary data={detail} loading={loading} />

        <Pilcrow
          title="Blast Treasure Strategy"
          desc="Explore Blast treasure strategy, maximize your Blast Gold earnings!"
        />
        <Treasure />
        <Pilcrow
          title="Mine Extra Gold by Hot Dapps"
          desc="Interact with popular dApps in Blast on DapDap, win extra Gold"
        />

        <Golds list={quests.golds} data={detail} onRefreshDetail={queryDetail} loading={questingLoading} />
        <Explores />
        <Bridge list={quests.bridge} onRefreshDetail={queryDetail} />
        <Trade list={quests.swap} onRefreshDetail={queryDetail} />
        <Lending
          list={[...quests.lending, ...quests.liquidity, ...quests.staking, ...quests.yield]}
          onRefreshDetail={queryDetail}
        />

        <FootClaim
          unclaimed={detail?.user?.unclaimed_reward}
          unlocked={quests.unlockedAmount}
          onRefreshDetail={queryDetail}
          id={id}
        />
      </StyledContent>
    </StyledContainer>
  );
}
