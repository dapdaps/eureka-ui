import { useRouter } from 'next/router';
import { memo, useMemo, useState } from 'react';

import Breadcrumb from '@/components/Breadcrumb';
import useUserInfo from '@/hooks/useUserInfo';
import useUserReward from '@/hooks/useUserReward';
import useQuestList from '@/views/bns/hooks/useQuestList';
import useCampaignList from '@/views/Quest/hooks/useCampaignList';
import useCategoryList from '@/views/Quest/hooks/useCategoryList';

import Yours from '../Quest/components/Yours';
import Quests from './components/Quests';
import { StyledContainer, StyledWrapper } from './styles';
import type { Tab } from './types';

const QuestLeaderboardView = (props: any) => {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('quests');
  const [id, setId] = useState<string>();
  const { userInfo } = useUserInfo();
  const { info: rewardInfo } = useUserReward();
  const { loading: campaignLoading, campaigns } = useCampaignList();
  const { loading: questingLoading, questList } = useQuestList(id);
  const { loading: categoryLoading, categories } = useCategoryList();

  const campaign = useMemo(
    () => campaigns.find((campaign) => campaign.name.replace(/\s/g, '') === router.query.campaignName),
    [campaigns, router],
  );

  const navs = useMemo(() => {
    const array: any = [{ name: 'Quests', path: '/quest/leaderboard' }];
    if (campaign) {
      array.push({ name: campaign.name, path: '/quest/leaderboard/' + campaign.name.replace(/\s/g, '') });
    }
    return array;
  }, [campaign]);
  return (
    <StyledWrapper>
      <StyledContainer style={{ paddingTop: 30, paddingBottom: 19 }}>
        <Breadcrumb navs={navs} />
      </StyledContainer>
      {tab === 'quests' && (
        <Quests
          id={id}
          {...{ campaignLoading, campaigns, questingLoading, quests: questList, categoryLoading, categories, userInfo }}
          onLoad={(id: string) => {
            setId(id);
          }}
        />
      )}
      <Yours info={rewardInfo} />
    </StyledWrapper>
  );
};

export default memo(QuestLeaderboardView);
