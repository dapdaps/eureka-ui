import useUserInfo from '@/hooks/useUserInfo';
import useAuthBind from '@/views/QuestProfile/hooks/useAuthBind';
import useAuthConfig from '@/views/QuestProfile/hooks/useAuthConfig';

import Banner from './components/Banner';
import Bridge from './components/Bridge';
import Explore from './components/Explore';
import Game from './components/Game';
import Lending from './components/Lending';
import Swap from './components/Swap';
import useDetail from './hooks/useDetail';
import useQuests from './hooks/useQuests';
import { StyledContainer } from './styles';

export default function OdysseyV2() {
  const authConfig = useAuthConfig();
  const { detail, loading, queryDetail } = useDetail();
  const { loading: questingLoading, quests } = useQuests();
  const { userInfo, queryUserInfo } = useUserInfo();
  useAuthBind({
    onSuccess: () => {
      queryUserInfo();
    },
    redirect_uri: `${window.location.origin}${window.location.pathname}?id=3`,
  });
  return (
    <StyledContainer>
      <Banner />
      <Game detail={detail} onRefreshDetail={queryDetail} />
      <Explore list={quests.social} userInfo={userInfo} authConfig={authConfig} onRefreshDetail={queryDetail} />
      <Bridge list={quests.bridge} onRefreshDetail={queryDetail} />
      <Swap list={quests.swap} onRefreshDetail={queryDetail} />
      <Lending list={quests.lending} onRefreshDetail={queryDetail} />
    </StyledContainer>
  );
}
