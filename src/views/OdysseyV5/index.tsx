import { useDebounceFn, useThrottleFn } from 'ahooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import useUserInfo from '@/hooks/useUserInfo';
import Blitz from '@/views/OdysseyV5/components/Blitz';
import Claim from '@/views/OdysseyV5/components/Claim';
import FootClaim from '@/views/OdysseyV5/components/FootClaim';
import Mastery from '@/views/OdysseyV5/components/Mastery';
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

export default function OdysseyV5() {
  const router = useRouter();
  const { id } = router.query;

  const navigatorList = [
    {
      key: 1,
      title: 'DapDap X Mode',
      target: 'odysseySectionHome',
    },
    {
      key: 2,
      title: 'Airdrop Strategies',
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
      title: 'Explore Modular Mode',
      target: 'odysseySectionExploreModularMode'
    },
    {
      key: 6,
      title: 'Climb to Leaderboard',
      target: 'odysseySectionClimbToLeaderboard',
    },
  ];
  const [navigatorActive, setNavigatorActive] = useState(navigatorList[0].key);
  const [exploredAmount, setExploredAmount] = useState(0);
  const [exploredAmountLoading, setExploredAmountLoading] = useState(false);

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
      if (scrollTop >= target.offsetTop - 200) _navigatorActive = navigator.key;
    }
    if (scrollTop >= document.body.scrollHeight - window.innerHeight - 50) {
      _navigatorActive = navigatorList[navigatorList.length - 1].key;
    }
    setNavigatorActive(_navigatorActive);
  };
  const { run: handleScrollEventDebounce } = useDebounceFn(handleScrollEvent, { wait: 50 });

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEventDebounce);
    return () => {
      window.removeEventListener('scroll', handleScrollEventDebounce);
    };
  }, []);

  const authConfig = useAuthConfig();
  const { quests, loading: questsLoading, setQuests } = useQuests(id);
  const { detail, loading, queryDetail } = useDetail(id, {
    quests,
    setExploredAmount,
    setQuests,
  });
  const { run: queryDetailThrottle } = useThrottleFn(queryDetail, { wait: 500 });
  const { userInfo, queryUserInfo } = useUserInfo();
  useAuthBind({
    onSuccess: () => {
      queryUserInfo();
    },
    redirect_uri: `${window.location.origin}${window.location.pathname}?id=${id}`,
  });

  const [lendingList, setLendingList] = useState<any>([]);

  quests.swap.sort((a: any, b: any) => {
    return a.order - b.order;
  });

  useEffect(() => {
    // if (!quests.yield.length || !quests.liquidity.length || !quests.staking.length) return;
    // const orbit = quests.lending.find((item: any) => item.name === 'Orbit');
    // const pac = quests.lending.find((item: any) => item.name === 'Pac Finance');
    const _list = [...quests.yield, ...quests.liquidity, ...quests.staking, ...quests.lending];
    setLendingList(_list);
  }, [quests]);
  useEffect(() => {
    let _exploredAmount = 0;
    Object.values(quests).forEach((arr: any) => {
      arr.forEach((it: any) => {
        _exploredAmount += it.exploredAmount || 0;
      });
    });
    setExploredAmount(_exploredAmount);
  }, [quests]);

  return (
    <StyledContainer>
      <StyledContent>
        <Noti />
        <Banner
          detail={detail}
          loading={loading}
       />
        <Mastery />
        <Blitz
          onRefreshDetail={queryDetailThrottle}
          detailLoading={exploredAmountLoading}
          setDetailLoading={setExploredAmountLoading}
          list={quests.mode}
          loading={questsLoading}/>

        <Explores
          list={quests.social}
          userInfo={userInfo}
          authConfig={authConfig}
          onRefreshDetail={queryDetailThrottle}
          loading={questsLoading}
          detailLoading={exploredAmountLoading}
          setDetailLoading={setExploredAmountLoading}
        />
        <Bridge
          list={quests.bridge}
          onRefreshDetail={queryDetailThrottle}
          loading={questsLoading}
          detailLoading={exploredAmountLoading}
          setDetailLoading={setExploredAmountLoading}
        />
        <Trade
          list={quests.swap}
          onRefreshDetail={queryDetailThrottle}
          loading={questsLoading}
          detailLoading={exploredAmountLoading}
          setDetailLoading={setExploredAmountLoading}
        />
        <Lending
          list={lendingList}
          onRefreshDetail={queryDetailThrottle}
          loading={questsLoading}
          detailLoading={exploredAmountLoading}
          setDetailLoading={setExploredAmountLoading}
        />
        <Claim id={id} />
      </StyledContent>
      <FootClaim
        unclaimed={detail?.user?.unclaimed_reward}
        totalReward={detail?.user?.total_reward}
        explored={exploredAmount}
        onRefreshDetail={queryDetailThrottle}
        id={id} />
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
