import { useRouter } from 'next/router';
import { memo } from 'react';

import QuestItem from '@/views/Quest/components/QuestItem';

import { StyledAction, StyledContainer, StyledList,StyledTitle } from './styles';

const Quests = ({ quests }: any) => {
  const router = useRouter();
  return (
    <StyledContainer>
      <StyledTitle>
        <div>Related Quests</div>
        <StyledAction
          onClick={() => {
            router.push('/quest/leaderboard');
          }}
          data-bp="100121-010"
        >
          Explore Quests
        </StyledAction>
      </StyledTitle>
      <StyledList>
        {quests?.map((item: any, i: number) => (
          <QuestItem bp="100121-009" quest={item} key={item.id + Math.random()} />
        ))}
      </StyledList>
    </StyledContainer>
  );
};

export default memo(Quests);
