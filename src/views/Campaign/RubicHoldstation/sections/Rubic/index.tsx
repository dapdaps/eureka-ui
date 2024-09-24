import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';

import { StyledFlex } from '@/styled/styles';
import type { Quest } from '@/views/Campaign/models';
import Task from '@/views/Campaign/RubicHoldstation/components/Task';
import RubicHoldstationContext from '@/views/Campaign/RubicHoldstation/context';
import RubicCard from '@/views/Campaign/RubicHoldstation/sections/Rubic/Card';

import {
  StyledContainer,
  StyledContent,
  StyledSectionTitle,
  StyledTitle,
  StyledTitleDesc,
  StyledTitleSub,
  StyledTitleSubDesc
} from './styles';

const Rubic = () => {
  const context = useContext(RubicHoldstationContext);
  const { data, loading } = context.quests;

  const twitterList: Quest[] = data.filter((it: Quest) => {
    return ['twitter_follow', 'twitter_retweet'].includes(it.category) && it.name.includes('@CryptoRubic');
  });
  const superBridge = data.find((it: Quest) => it.name === 'Super Bridge');
  const rubicApp = data.find((it: Quest) => it.name === 'Rubic');

  return (
    <StyledContainer>
      <StyledSectionTitle id="campaignRubicAndHoldstationGetTicketsNow">Get your tickets now!</StyledSectionTitle>
      <StyledTitle>「Rubic Super Exchange」</StyledTitle>
      <StyledTitleDesc>
        Asset bridging at Rubic or Super Bridge using Rubic paths <br />
        Requires at least $25 per transaction to earn 1 ticket.
      </StyledTitleDesc>
      <StyledTitleSub>1 transaction= (1 + n) scratch tickets</StyledTitleSub>
      <StyledTitleSubDesc>
        For every $25 increment in the transaction amount, you will earn an additional ticket.
      </StyledTitleSubDesc>
      <StyledContent>
        <StyledFlex justifyContent="space-between" alignItems="center" gap="24px">
          {loading ? (
            [...new Array(2).keys()].map((idx) => <Skeleton key={idx} width={487} height={371} borderRadius={20} />)
          ) : (
            <>
              <RubicCard
                key={1}
                title="Super Bridge"
                bg="/images/campaign/super-bridge-bg.png"
                bgWidth={415}
                bgHeight={230}
                btn="Super Bridge"
                quest={superBridge}
              />
              <RubicCard
                key={2}
                title="Integrated dApp"
                bg="/images/campaign/integreated-dapp-bg.png"
                bgWidth={215}
                bgHeight={236}
                btn="Rubic dApp"
                bgClassName="rubic-img"
                quest={rubicApp}
              />
            </>
          )}
        </StyledFlex>
        <StyledFlex flexDirection="column" alignItems="stretch" gap="16px" style={{ marginTop: 20 }}>
          {loading
            ? [...new Array(2).keys()].map((idx) => <Skeleton key={idx} width={1000} height={70} borderRadius={12} />)
            : twitterList.map((it) => (
                <Task key={it.id} quest={it}>
                  {it.name}
                </Task>
              ))}
        </StyledFlex>
      </StyledContent>
    </StyledContainer>
  );
};

export default Rubic;
