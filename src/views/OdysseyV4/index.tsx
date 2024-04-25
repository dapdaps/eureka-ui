import { useState } from 'react';

import useUserInfo from '@/hooks/useUserInfo';
import useAuthBind from '@/views/QuestProfile/hooks/useAuthBind';
import useAuthConfig from '@/views/QuestProfile/hooks/useAuthConfig';

import Banner from './components/Banner';
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

export default function OdysseyV2() {
  const authConfig = useAuthConfig();
  const { detail, loading, queryDetail } = useDetail();
  const { loading: questingLoading, quests } = useQuests();
  const { userInfo, queryUserInfo } = useUserInfo();

  const [showNoti, setShowNoti] = useState(true);
  useAuthBind({
    onSuccess: () => {
      queryUserInfo();
    },
    redirect_uri: `${window.location.origin}${window.location.pathname}?id=4`,
  });

  return (
    <StyledContainer>
      <StyledContent>
        {showNoti ? <Noti onClose={() => setShowNoti(false)} /> : null}

        <Banner />
        <Summary />
        <Pilcrow
          title="Blast Treasure Strategy"
          desc="Explore Blast treasure strategy, maximize your Blast Gold earnings!"
        />
        <Treasure />
        <Pilcrow
          title="Mine Extra Gold by Hot Dapps"
          desc="Interact with popular dApps in Blast on DapDap, win extra Gold"
        />

        <Golds />
        <Pilcrow
          title="explore more dApps on Blast"
          desc="Interact with popular dApps in Blast on DapDap, win 100 DapDap PTS for each."
        />
        <Trade list={quests.bridge} onRefreshDetail={queryDetail} />
        <Lending list={quests.lending} onRefreshDetail={queryDetail} />
        <FootClaim />
      </StyledContent>
    </StyledContainer>
  );
}
