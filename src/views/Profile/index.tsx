import useUserInfo from '@/hooks/useUserInfo';
import useUserReward from '@/hooks/useUserReward';
import { useRouter } from 'next/router';
import { memo, useMemo, useState } from 'react';

import BouncingMedal from '@/components/bouncing-medal';
import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
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
import useAirdropList from './hooks/useAirdropList';
import useCompassList from './hooks/useCompassList';
import useInviteList from './hooks/useInviteList';
import useUserFavorites from "./hooks/useUserFavorites";
import useMedalList from './hooks/useUserMedalList';
import useUserRewardRecords from './hooks/useUserRewardRecords';
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
  padding: 40px 0 110px;
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
  const [tab, setTab] = useState<Tab>('InProgress');
  const { account } = useAccount();
  const { userInfo } = useUserInfo();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });
  const { handleReport } = useReport();
  const { loading: inviteLoading, inviteList } = useInviteList();
  const { loaded: compassLoaded, compassList, } = useCompassList(tab)
  const { loaded: airdropLoaded, airdropList } = useAirdropList(tab)
  const { loaded: medalLoaded, userMedalList } = useMedalList(tab)
  const { loaded: favoriteLoaded, userFavorites } = useUserFavorites(tab)
  const { loaded: rewardLoaded, userRewardRecords, queryUserRewardRecords, pager, setPager } = useUserRewardRecords(tab)


  const [openInviteFirendsModal, setOpenInviteFirendsModal] = useState(false);

  const { info: rewardInfo, queryUserReward } = useUserReward();

  const maxPage = useMemo(() => Math.ceil((userRewardRecords?.total ?? 0) / pager.page_size), [userRewardRecords?.total, pager])
  const tabsQuantity = useMemo(() => {
    const inProgressQuantity = compassList?.length + airdropList?.length + userMedalList?.length
    const favoriteAppsQuantity = userFavorites?.total ?? 0
    const rewardHistoryQuantity = userRewardRecords?.total ?? 0
    return [inProgressQuantity, favoriteAppsQuantity, rewardHistoryQuantity]
  }, [compassList, airdropList, userMedalList, userFavorites, userRewardRecords])

  const bouncingMedals = useMemo(() => {
    return userMedalList?.slice(0, 5)?.map((medal, index) => {
      return {
        key: index,
        icon: medal?.logo,
        x: index * 100,
        mass: (index === 0 || index === userMedalList.length - 1) ? 50 : 30
      }
    }) ?? []
  }, [userMedalList])
  const handleChange = function (_tab: Tab) {
    setTab(_tab);
  };
  const handlePageChange = function (page: number) {
    if (page < 1 || page > maxPage || page === pager.page) {
      return
    }
    const _pager = {
      ...pager,
      page
    }
    queryUserRewardRecords(_pager)
    setPager(_pager)
  }

  useEffect(() => {
    const target = router?.query?.target
    if (target) {
      if (target === "favorite") {
        setTab("FavoriteApps")
      } else {
        setOpenInviteFirendsModal(true)
      }
    }
  }, [router.query])

  return (
    <StyledContainer>

      <StyledInnerContainer>
        <StyledContainerTop>
          <UserInfo info={userInfo} rewardInfo={rewardInfo} />
          <Rewards
            medals={userInfo?.medals?.length ?? 0}
            gems={userInfo?.gem ?? 0}
            referrals={inviteList?.total ?? 0}
            onInviteCodeClick={() => {
              handleReport('invite');
              setOpenInviteFirendsModal(true);
            }}
          />
          <StyledBouncingMedalContainer>
            <BouncingMedal
              width={500}
              height={300}
              medals={bouncingMedals}
            />
          </StyledBouncingMedalContainer>
        </StyledContainerTop>
        <StyledContainerBottom>
          <Tabs current={tab} tabsQuantity={tabsQuantity} onChange={handleChange} />
          {tab === "InProgress" && (
            <InProgress
              {...{ compassLoaded, compassList, airdropLoaded, airdropList, medalLoaded, userMedalList }}
            />
          )}
          {tab === "FavoriteApps" && <FavoriteApps {...{ loaded: favoriteLoaded, userFavorites }} />}
          {tab === "RewardHistory" && <RewardHistory {...{ loaded: rewardLoaded, userRewardRecords, pager, maxPage, onPageChange: handlePageChange }} />}
        </StyledContainerBottom>
      </StyledInnerContainer>
      <InviteFirendsModal
        open={openInviteFirendsModal}
        loading={inviteLoading}
        inviteList={inviteList}
        onClose={() => {
          setOpenInviteFirendsModal(false);
        }}
      />
    </StyledContainer>
  );
});