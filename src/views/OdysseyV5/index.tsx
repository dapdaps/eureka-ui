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
import { StyledContainer, StyledContent } from './styles';
import Claim from '@/views/OdysseyV5/components/Claim';

export default function OdysseyV5() {
  const router = useRouter();
  const { id } = router.query;

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

  console.log(quests.social);

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
    </StyledContainer>
  );
}
