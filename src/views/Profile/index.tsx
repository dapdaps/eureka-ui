import useUserInfo from '@/hooks/useUserInfo';
import useUserReward from '@/hooks/useUserReward';
import { useRouter } from 'next/router';
import { memo, useState } from 'react';

import useAuthCheck from '@/hooks/useAuthCheck';
import BouncingMedal from '@/components/bouncing-medal';
import useAccount from '@/hooks/useAccount';
import useInviteList from '@/hooks/useInviteList';
import useReport from '@/views/Landing/hooks/useReport';
import { useEffect } from 'react';
import styled from 'styled-components';
import FavoriteApps from './components/FavoriteApps';
import InProgress from './components/InProgress';
import InviteFirendsModal from './components/InviteFirendsModal';
import RewardHistory from './components/RewardHistory';
import Rewards from './components/Rewards';
import Tabs from './components/Tabs';
import UserInfo from './components/UserInfo';
import { Tab } from './types';


const StyledContainer = styled.div`
  background-image: url(/images/profile/top_bg.png);
  background-repeat: no-repeat;
  background-size: 100% 313px;
  background-color: #000;
`
const StyledContainerTop = styled.div`
  position: relative;
  padding-top: 84px;
  height: 313px;
`
const StyledContainerBottom = styled.div`
  padding-top: 40px;
  background-color: #000;
`
const StyledInnerContainer = styled.div`
  width: 1244px;
  max-width: 100%;
  margin: 0 auto;
  z-index: 5;
`
const StyledBouncingMedalContainer = styled.div`
  position: absolute;
  right: -104px;
  bottom: 0;
`
export default memo(function ProfileView() {
  const router = useRouter();
  const { account } = useAccount();
  const { userInfo } = useUserInfo();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });
  const { handleReport } = useReport();
  const [tab, setTab] = useState<Tab>('InProgress');
  const [openCodes, setOpenCodes] = useState(false);
  const { inviteInfo, queryInviteList } = useInviteList();
  const { info: rewardInfo, queryUserReward } = useUserReward();

  const handleChange = function (_tab: Tab) {
    setTab(_tab);
  };

  useEffect(() => {
    account && check(() => {
      queryInviteList();
    });
  }, [account]);
  return (
    <StyledContainer>

      <StyledInnerContainer>


        <StyledContainerTop>
          <UserInfo info={userInfo} rewardInfo={rewardInfo} />
          <Rewards
            referrals={inviteInfo?.data?.length}
            onInviteCodeClick={() => {
              handleReport('invite');
              setOpenCodes(true);
            }}
          />
          <StyledBouncingMedalContainer>
            <BouncingMedal
              width={500}
              height={300}
              medals={[
                {
                  key: 1,
                  icon: '/images/medals/medal-trader.svg',
                  x: 200,
                  mass: 50,
                },
                {
                  key: 2,
                  icon: '/images/medals/medal-voyager.svg',
                  x: 300,
                  mass: 30,
                },
                {
                  key: 3,
                  icon: '/images/medals/medal-pioneer.svg',
                  x: 410,
                  mass: 30,
                },
                {
                  key: 4,
                  icon: '/images/medals/medal-pioneer.svg',
                  x: 505,
                  mass: 30,
                },
                {
                  key: 5,
                  icon: '/images/medals/medal-trader.svg',
                  x: 606,
                  mass: 50,
                },
              ]}
            />
          </StyledBouncingMedalContainer>
        </StyledContainerTop>
        <StyledContainerBottom>
          <Tabs current={tab} onChange={handleChange} />
          {tab === "InProgress" && <InProgress />}
          {tab === "FavoriteApps" && <FavoriteApps />}
          {tab === "RewardHistory" && <RewardHistory />}
        </StyledContainerBottom>
      </StyledInnerContainer>
      <InviteFirendsModal
        open={openCodes}
        list={inviteInfo?.data || []}
        totalRewards={inviteInfo?.reward}
        reward={inviteInfo?.invite_reward}
        onClose={() => {
          setOpenCodes(false);
        }}
      />
    </StyledContainer>
  );
});
