import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import useUserInfo from '@/hooks/useUserInfo';
import Blitz from "@/views/OdysseyV5/components/Blitz";
import Mastery from "@/views/OdysseyV5/components/Mastery";
import useAuthBind from '@/views/QuestProfile/hooks/useAuthBind';
import useAuthConfig from '@/views/QuestProfile/hooks/useAuthConfig';

import Banner from './components/Banner';
import Bridge from './components/Bridge';
import Explores from './components/Explores';
import Lending from './components/Lending';
import Noti from './components/Noti';
import Trade from './components/Trade';
import useDetail from './hooks/useDetail';
import useQuests from './hooks/useQuests';
import { StyledContainer, StyledContent, StyledNavigator } from './styles';
import { useDebounceFn } from "ahooks";
import Claim from '@/views/OdysseyV5/components/Claim';

export default function OdysseyV5() {
  const router = useRouter();
  const { id } = router.query;

  const navigatorList = [
    {
      key: 1,
      title: 'Home',
      target: 'odysseySectionHome',
    },
    {
      key: 2,
      title: 'Airdrop Mastery',
      target: 'odysseySectionAirdropMastery',
    },
    {
      key: 3,
      title: 'Mode DApp Blitz',
      target: 'odysseySectionModeDAppBlitz',
    },
    {
      key: 4,
      title: 'Dive into DApp Diversity',
      target: 'odysseySectionDiveIntoDAppDiversity',
    },
    {
      key: 5,
      title: 'Climb to Leaderboard',
      target: 'odysseySectionClimbToLeaderboard',
    },
  ];
  const [navigatorActive, setNavigatorActive] = useState(navigatorList[0].key);

  const handleNavigation = (nav: any) => {
    const target = document.getElementById(nav.target);
    if (!target) return;
    window.scrollTo({
      top: target.offsetTop,
      behavior: 'smooth',
    });
    setNavigatorActive(nav.key);
  };

  const handleScrollEvent = () => {
    let _navigatorActive = navigatorActive;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    for (const navigator of navigatorList) {
      const target = document.getElementById(navigator.target);
      if (!target) continue;
      if (scrollTop >= target.offsetTop) _navigatorActive = navigator.key;
    }
    setNavigatorActive(_navigatorActive);
  };
  const { run: handleScrollEventDebounce } = useDebounceFn(handleScrollEvent, { wait: 500 });

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEventDebounce);
    return () => {
      window.removeEventListener('scroll', handleScrollEventDebounce);
    };
  }, []);

  const authConfig = useAuthConfig();
  const { detail, loading, queryDetail } = useDetail(id);
  const { quests } = useQuests(id);
  const { userInfo, queryUserInfo } = useUserInfo();
  useAuthBind({
    onSuccess: () => {
      queryUserInfo();
    },
    redirect_uri: `${window.location.origin}${window.location.pathname}?id=${id}`,
  });

  const [lendingList, setLendingList] = useState<any>();

  quests.swap.sort((a: any, b: any) => {
    return a.order - b.order;
  });

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
        <Noti />
        <Banner detail={detail} loading={loading} />
        <Mastery />
        <Blitz />

        <Explores list={quests.social} userInfo={userInfo} authConfig={authConfig} onRefreshDetail={queryDetail} />
        <Bridge list={quests.bridge} onRefreshDetail={queryDetail} />
        <Trade list={quests.swap} onRefreshDetail={queryDetail} />
        <Lending list={lendingList} onRefreshDetail={queryDetail} />
        <Claim />
      </StyledContent>
      <StyledNavigator>
        {
          navigatorList.map((nav) => (
            <div
              className={`nav-item ${navigatorActive === nav.key ? 'active' : ''}`}
              key={nav.key}
              onClick={() => handleNavigation(nav)}
            >
              <div className="pointer"></div>
              <div className="title">{nav.title}</div>
            </div>
          ))
        }
      </StyledNavigator>
    </StyledContainer>
  );
}
