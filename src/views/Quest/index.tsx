import { memo, useState } from 'react';

import Breadcrumb from '@/components/Breadcrumb';
import { useRewardStore } from '@/stores/reward';
import useQuestList from '@/views/bns/hooks/useQuestList';

import Campaign from './components/Campaign';
import QuestLists from './components/QuestLists';
import Yours from './components/Yours';
import useCampaignList from './hooks/useCampaignList';
import useCategoryList from './hooks/useCategoryList';
import { StyledContainer } from './styles';

const QuestView = () => {
  const [id, setId] = useState<string>();
  const { loading, campaigns } = useCampaignList();
  const rewardInfo = useRewardStore((store: any) => store.reward);
  const { loading: questingLoading, questList } = useQuestList(id);
  const { loading: categoryLoading, categories } = useCategoryList();

  return (
    <StyledContainer>
      <Breadcrumb navs={[{ name: 'Quests Campaign', path: '/quest' }]} />
      <Campaign
        onLoad={(campainId: string) => {
          setId(campainId);
        }}
        loading={loading}
        campaigns={campaigns}
        categoryLoading={categoryLoading}
        categories={categories}
      />
      <QuestLists id={id} loading={questingLoading} quests={questList} />
      <Yours info={rewardInfo} />
    </StyledContainer>
  );
};

export default memo(QuestView);
